import { NextRequest } from 'next/server';
import { SignJWT, jwtVerify } from 'jose';

export type AuthRole = 'admin' | 'business_owner';

type AuthPayload = {
  sub: string;
  email: string;
  role: AuthRole;
};

const AUTH_COOKIE = 'saadhyam_token';
const secret = process.env.AUTH_SECRET || 'dev-auth-secret-change-me';
const secretBytes = new TextEncoder().encode(secret);

export function getAuthCookieName() {
  return AUTH_COOKIE;
}

export async function signAuthToken(payload: AuthPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secretBytes);
}

export async function verifyAuthToken(token: string) {
  const { payload } = await jwtVerify(token, secretBytes);
  return payload as unknown as AuthPayload;
}

export async function getAuthUserFromRequest(req: NextRequest) {
  const token = req.cookies.get(AUTH_COOKIE)?.value;
  if (!token) return null;
  try {
    return await verifyAuthToken(token);
  } catch {
    return null;
  }
}

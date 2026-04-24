import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db, ensureDatabase } from '@/lib/db';
import { getAuthCookieName, signAuthToken } from '@/lib/auth';
import { UserRole } from '@/types';

export async function POST(req: NextRequest) {
  try {
    await ensureDatabase();
    const { name, email, password, businessName, role } = await req.json();
    const normalizedRole: UserRole = role === 'admin' ? 'admin' : 'business_owner';

    if (!name || !email || !password) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ success: false, error: 'Password must be at least 8 characters' }, { status: 400 });
    }

    const exists = await db.query('SELECT id FROM users WHERE email = $1', [email.toLowerCase()]);
    if (exists.rowCount) {
      return NextResponse.json({ success: false, error: 'Email already registered' }, { status: 409 });
    }

    const id = crypto.randomUUID();
    const passwordHash = await bcrypt.hash(password, 10);

    await db.query(
      `INSERT INTO users (id, name, email, password_hash, role, business_name)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [id, name, email.toLowerCase(), passwordHash, normalizedRole, businessName || null]
    );

    const token = await signAuthToken({ sub: id, email: email.toLowerCase(), role: normalizedRole });
    const response = NextResponse.json({
      success: true,
      user: { id, name, email: email.toLowerCase(), role: normalizedRole, businessName: businessName || null },
    });

    response.cookies.set(getAuthCookieName(), token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ success: false, error: 'Failed to register user' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db, ensureDatabase } from '@/lib/db';
import { getAuthCookieName, signAuthToken } from '@/lib/auth';
import { UserRole } from '@/types';

export async function POST(req: NextRequest) {
  try {
    await ensureDatabase();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, error: 'Email and password are required' }, { status: 400 });
    }

    const result = await db.query(
      'SELECT id, name, email, role, business_name, password_hash FROM users WHERE email = $1',
      [email.toLowerCase()]
    );

    if (!result.rowCount) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }

    const user = result.rows[0] as {
      id: string;
      name: string;
      email: string;
      role: UserRole;
      business_name: string | null;
      password_hash: string;
    };

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }

    const token = await signAuthToken({ sub: user.id, email: user.email, role: user.role });
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        businessName: user.business_name,
      },
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
    console.error('Login error:', error);
    return NextResponse.json({ success: false, error: 'Failed to login' }, { status: 500 });
  }
}

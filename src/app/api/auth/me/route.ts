import { NextRequest, NextResponse } from 'next/server';
import { db, ensureDatabase } from '@/lib/db';
import { getAuthUserFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    await ensureDatabase();
    const authUser = await getAuthUserFromRequest(req);
    if (!authUser) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const result = await db.query(
      'SELECT id, name, email, role, business_name FROM users WHERE id = $1',
      [authUser.sub]
    );

    if (!result.rowCount) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    const user = result.rows[0];
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        businessName: user.business_name,
      },
    });
  } catch (error) {
    console.error('Me route error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch user' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { ensureDatabase, db } from '@/lib/db';
import { getAuthUserFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    await ensureDatabase();
    const authUser = await getAuthUserFromRequest(req);
    if (!authUser) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const result = await db.query(
      `SELECT id, source_type, source_value, report, created_at
       FROM analysis_reports
       WHERE user_id = $1
       ORDER BY created_at DESC
       LIMIT 1`,
      [authUser.sub]
    );

    if (!result.rowCount) {
      return NextResponse.json({ success: true, report: null });
    }

    const row = result.rows[0];
    return NextResponse.json({
      success: true,
      report: row.report,
      meta: {
        id: row.id,
        sourceType: row.source_type,
        sourceValue: row.source_value,
        createdAt: row.created_at,
      },
    });
  } catch (error) {
    console.error('Intake latest error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch report' }, { status: 500 });
  }
}

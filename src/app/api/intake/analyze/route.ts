import { NextRequest, NextResponse } from 'next/server';
import { ensureDatabase, db } from '@/lib/db';
import { getAuthUserFromRequest } from '@/lib/auth';
import { runAutoIntakeAnalysis } from '@/lib/intake';
import { getDummyIntakeReport, USE_DUMMY_DATA } from '@/lib/mockData';

export async function POST(req: NextRequest) {
  try {
    await ensureDatabase();
    const authUser = await getAuthUserFromRequest(req);
    if (!authUser) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const contentType = req.headers.get('content-type') || '';
    let sourceType = '';
    let sourceValue = '';
    let businessText = '';
    let voiceText = '';
    let pdfFileBuffer: Buffer | undefined;

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      sourceType = String(formData.get('sourceType') || '');
      sourceValue = String(formData.get('sourceValue') || '');
      businessText = String(formData.get('businessText') || '');
      voiceText = String(formData.get('voiceText') || '');
      const file = formData.get('pdfFile');
      if (file instanceof File) {
        const buffer = await file.arrayBuffer();
        pdfFileBuffer = Buffer.from(buffer);
      }
    } else {
      const body = await req.json();
      sourceType = body.sourceType || '';
      sourceValue = body.sourceValue || '';
      businessText = body.businessText || '';
      voiceText = body.voiceText || '';
    }

    const normalizedSourceType =
      sourceType as 'website_url' | 'business_text' | 'pdf_document' | 'voice_note' | 'maps_link';

    let report;
    try {
      report = USE_DUMMY_DATA
        ? getDummyIntakeReport(sourceType, sourceValue)
        : await runAutoIntakeAnalysis({
            sourceType: normalizedSourceType,
            sourceValue,
            businessText,
            voiceText,
            pdfFileBuffer,
          });
    } catch {
      report = getDummyIntakeReport(sourceType, sourceValue);
    }

    const reportId = crypto.randomUUID();
    await db.query(
      `INSERT INTO analysis_reports (id, user_id, source_type, source_value, report)
       VALUES ($1, $2, $3, $4, $5::jsonb)`,
      [reportId, authUser.sub, sourceType, sourceValue || null, JSON.stringify(report)]
    );

    return NextResponse.json({ success: true, reportId, report });
  } catch (error) {
    console.error('Intake analyze error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed intake analysis' },
      { status: 500 }
    );
  }
}

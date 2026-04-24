import { NextRequest, NextResponse } from 'next/server';
import { BUSINESS_ANALYSIS_PROMPT } from '@/prompts';
import { generateJsonWithGrok } from '@/lib/ai';
import { getAuthUserFromRequest } from '@/lib/auth';
import { getDummyBusinessAnalysis, USE_DUMMY_DATA } from '@/lib/mockData';

export async function POST(req: NextRequest) {
  try {
    const authUser = await getAuthUserFromRequest(req);
    if (!authUser) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { businessName, category, description, challenges, targetAudience, language } =
      await req.json();

    if (!businessName || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Build prompt
    const prompt = BUSINESS_ANALYSIS_PROMPT.replace('{businessName}', businessName)
      .replace('{category}', category)
      .replace('{description}', description || '')
      .replace('{challenges}', challenges || '')
      .replace('{targetAudience}', targetAudience || '')
      .replace('{language}', language || 'English');

    let analysis;
    try {
      analysis = USE_DUMMY_DATA
        ? getDummyBusinessAnalysis(businessName, category)
        : await generateJsonWithGrok(prompt);
    } catch {
      analysis = getDummyBusinessAnalysis(businessName, category);
    }

    return NextResponse.json({
      success: true,
      data: {
        id: `analysis_${Date.now()}`,
        type: 'business_analysis',
        ...analysis,
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Business analysis error:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate business analysis',
        success: false,
      },
      { status: 500 }
    );
  }
}

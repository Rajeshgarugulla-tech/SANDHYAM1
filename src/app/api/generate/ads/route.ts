import { NextRequest, NextResponse } from 'next/server';
import { ADS_COPY_PROMPT } from '@/prompts';
import { generateJsonWithGrok } from '@/lib/ai';
import { getAuthUserFromRequest } from '@/lib/auth';
import { getDummyAds, USE_DUMMY_DATA } from '@/lib/mockData';

export async function POST(req: NextRequest) {
  try {
    const authUser = await getAuthUserFromRequest(req);
    if (!authUser) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { businessName, category, goal, audience, budget, language } = await req.json();

    if (!businessName || !goal) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const prompt = ADS_COPY_PROMPT.replace('{businessName}', businessName)
      .replace('{category}', category || '')
      .replace('{goal}', goal)
      .replace('{audience}', audience || 'Local customers')
      .replace('{budget}', budget || '₹1000-5000')
      .replace('{language}', language || 'English');

    let result;
    try {
      result = USE_DUMMY_DATA
        ? getDummyAds(goal, audience || '')
        : await generateJsonWithGrok(prompt);
    } catch {
      result = getDummyAds(goal, audience || '');
    }

    return NextResponse.json({
      success: true,
      data: {
        id: `ads_${Date.now()}`,
        type: 'ads',
        platform: 'facebook', // Can be made dynamic
        ...result,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Ads generation error:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate ads copy',
        success: false,
      },
      { status: 500 }
    );
  }
}

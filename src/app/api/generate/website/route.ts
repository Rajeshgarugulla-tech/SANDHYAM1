import { NextRequest, NextResponse } from 'next/server';
import { WEBSITE_ABOUT_PROMPT, WEBSITE_SERVICES_PROMPT } from '@/prompts';
import { generateJsonWithGrok } from '@/lib/ai';
import { getAuthUserFromRequest } from '@/lib/auth';
import { getDummyWebsite, USE_DUMMY_DATA } from '@/lib/mockData';

const PROMPTS = {
  about: WEBSITE_ABOUT_PROMPT,
  services: WEBSITE_SERVICES_PROMPT,
};

export async function POST(req: NextRequest) {
  try {
    const authUser = await getAuthUserFromRequest(req);
    if (!authUser) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { businessName, contentType, category, context, language } = await req.json();

    if (!businessName || !contentType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const promptTemplate = PROMPTS[contentType as keyof typeof PROMPTS];
    if (!promptTemplate) {
      return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
    }

    const prompt = promptTemplate
      .replace('{businessName}', businessName)
      .replace('{category}', category || '')
      .replace('{story}', context?.story || 'A passionate entrepreneur')
      .replace('{years}', context?.years || '1-5')
      .replace('{value}', context?.value || 'Quality and customer satisfaction')
      .replace('{services}', context?.services || '')
      .replace('{language}', language || 'English');

    let result;
    try {
      result = USE_DUMMY_DATA
        ? getDummyWebsite(contentType, businessName)
        : await generateJsonWithGrok(prompt);
    } catch {
      result = getDummyWebsite(contentType, businessName);
    }

    return NextResponse.json({
      success: true,
      data: {
        id: `website_${Date.now()}`,
        type: 'website',
        contentType,
        ...result,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Website content generation error:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate website content',
        success: false,
      },
      { status: 500 }
    );
  }
}

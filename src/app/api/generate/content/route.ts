import { NextRequest, NextResponse } from 'next/server';
import {
  INSTAGRAM_CAPTION_PROMPT,
  REELS_SCRIPT_PROMPT,
  FESTIVAL_POST_PROMPT,
} from '@/prompts';
import { generateJsonWithGrok } from '@/lib/ai';
import { getAuthUserFromRequest } from '@/lib/auth';
import { getDummyContent, USE_DUMMY_DATA } from '@/lib/mockData';

const PROMPTS = {
  instagram_caption: INSTAGRAM_CAPTION_PROMPT,
  reels_script: REELS_SCRIPT_PROMPT,
  festival_post: FESTIVAL_POST_PROMPT,
};

export async function POST(req: NextRequest) {
  try {
    const authUser = await getAuthUserFromRequest(req);
    if (!authUser) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { businessName, category, contentType, keyMessage, language, postType } =
      await req.json();

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
      .replace('{keyMessage}', keyMessage || '')
      .replace('{postType}', postType || '')
      .replace('{goal}', keyMessage || '')
      .replace('{festival}', postType || '')
      .replace('{offer}', '')
      .replace('{language}', language || 'English');

    let result;
    try {
      result = USE_DUMMY_DATA
        ? getDummyContent(contentType, keyMessage || '')
        : await generateJsonWithGrok(prompt);
    } catch {
      result = getDummyContent(contentType, keyMessage || '');
    }

    return NextResponse.json({
      success: true,
      data: {
        id: `content_${Date.now()}`,
        type: 'content',
        subType: contentType,
        ...result,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Content generation error:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate content',
        success: false,
      },
      { status: 500 }
    );
  }
}

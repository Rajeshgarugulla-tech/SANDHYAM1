import { NextRequest, NextResponse } from 'next/server';
import {
  WHATSAPP_FOLLOWUP_PROMPT,
  WHATSAPP_CLOSING_PROMPT,
  WHATSAPP_OFFER_PROMPT,
} from '@/prompts';
import { generateJsonWithGrok } from '@/lib/ai';
import { getAuthUserFromRequest } from '@/lib/auth';
import { getDummyWhatsapp, USE_DUMMY_DATA } from '@/lib/mockData';

const PROMPTS = {
  followup: WHATSAPP_FOLLOWUP_PROMPT,
  closing: WHATSAPP_CLOSING_PROMPT,
  offer: WHATSAPP_OFFER_PROMPT,
};

export async function POST(req: NextRequest) {
  try {
    const authUser = await getAuthUserFromRequest(req);
    if (!authUser) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { businessName, category, messageType, context, language } = await req.json();

    if (!businessName || !messageType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const promptTemplate = PROMPTS[messageType as keyof typeof PROMPTS];
    if (!promptTemplate) {
      return NextResponse.json({ error: 'Invalid message type' }, { status: 400 });
    }

    const prompt = promptTemplate
      .replace('{businessName}', businessName)
      .replace('{category}', category || '')
      .replace('{customerType}', context?.customerType || 'Potential customer')
      .replace('{interaction}', context?.interaction || '')
      .replace('{product}', context?.product || '')
      .replace('{price}', context?.price || '')
      .replace('{objections}', context?.objections || '')
      .replace('{offer}', context?.offer || '')
      .replace('{discount}', context?.discount || '')
      .replace('{validUntil}', context?.validUntil || '')
      .replace('{language}', language || 'English');

    let result;
    try {
      result = USE_DUMMY_DATA
        ? getDummyWhatsapp(messageType)
        : await generateJsonWithGrok(prompt);
    } catch {
      result = getDummyWhatsapp(messageType);
    }

    return NextResponse.json({
      success: true,
      data: {
        id: `whatsapp_${Date.now()}`,
        type: 'whatsapp',
        subType: messageType,
        ...result,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('WhatsApp generation error:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate WhatsApp messages',
        success: false,
      },
      { status: 500 }
    );
  }
}

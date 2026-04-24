import * as cheerio from 'cheerio';
import * as pdfParse from 'pdf-parse';
import { generateJsonWithGrok } from '@/lib/ai';

type SourceType = 'website_url' | 'business_text' | 'pdf_document' | 'voice_note' | 'maps_link';

function truncate(input: string, max = 12000) {
  return input.length > max ? `${input.slice(0, max)}...` : input;
}

function extractWebsiteData(url: string, html: string) {
  const $ = cheerio.load(html);
  const title = $('title').first().text().trim();
  const description = $('meta[name="description"]').attr('content') || '';
  const headings = $('h1, h2')
    .slice(0, 8)
    .map((_, el) => $(el).text().trim())
    .get()
    .filter(Boolean);

  const bodyText = $('body').text().replace(/\s+/g, ' ').trim();
  const emails = Array.from(new Set(bodyText.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) || [])).slice(0, 5);
  const phones = Array.from(new Set(bodyText.match(/(?:\+91[\s-]?)?[6-9]\d{9}/g) || [])).slice(0, 5);
  const links = $('a[href]')
    .map((_, el) => $(el).attr('href') || '')
    .get()
    .filter(Boolean);

  const social = links.filter((link) =>
    ['instagram.com', 'facebook.com', 'youtube.com', 'linkedin.com', 'x.com', 'twitter.com'].some((item) =>
      link.includes(item)
    )
  );

  return {
    url,
    title,
    description,
    headings,
    emails,
    phones,
    socialLinks: social.slice(0, 8),
    contentSnippet: truncate(bodyText, 8000),
  };
}

async function parsePdf(fileBuffer: Buffer) {
  const result = await pdfParse.default(fileBuffer);
  return truncate(result.text || '', 12000);
}

function buildAnalysisPrompt(sourceType: SourceType, extractedText: string, sourceValue?: string) {
  return `
You are Saadhyam AI Business Growth Engine for Indian SMBs.

Input source type: ${sourceType}
Input source value: ${sourceValue || 'N/A'}
Extracted raw business context:
${extractedText}

Your task:
1) Build complete business understanding.
2) Give summary and growth diagnosis.
3) Generate numeric scores.
4) Generate practical actions and ready content.
5) Provide competitor intelligence assumptions based on available data.

Return ONLY valid JSON with this exact schema:
{
  "businessProfile": {
    "businessName": "string",
    "businessCategory": "string",
    "services": ["string"],
    "products": ["string"],
    "pricing": ["string"],
    "location": "string",
    "targetAudience": "string",
    "contactDetails": ["string"],
    "socialMediaPresence": ["string"],
    "googleMapsPresence": "string",
    "reviewsSummary": "string",
    "currentWeaknesses": ["string"],
    "missingGrowthOpportunities": ["string"]
  },
  "autoSummary": {
    "oneLiner": "string",
    "biggestGrowthProblem": "string",
    "biggestOpportunity": "string",
    "competitorAdvantage": "string",
    "quickWin30Day": "string"
  },
  "scores": {
    "businessHealthScore": 0,
    "aiVisibilityScore": 0,
    "leadConversionScore": 0,
    "contentConsistencyScore": 0
  },
  "todayActions": ["string", "string", "string", "string", "string"],
  "contentEngine": {
    "adCopy": "string",
    "reelsScript": "string",
    "whatsappMessage": "string",
    "offerPosterText": "string",
    "seoPageDraft": "string",
    "faqDraft": "string",
    "googleBusinessPost": "string"
  },
  "competitorEngine": {
    "whoRanksAbove": ["string"],
    "whyTheyRank": ["string"],
    "whatTheyDoBetter": ["string"],
    "theirWeakPoints": ["string"],
    "howToBeatThem": ["string"]
  },
  "roadmap30Days": ["string"]
}

Rules:
- If some data is missing, infer realistic assumptions and clearly state that in output wording.
- Keep all scores between 0 and 100.
- Keep tasks practical for a business owner.
- Use Indian SMB context.
`;
}

export async function runAutoIntakeAnalysis(params: {
  sourceType: SourceType;
  sourceValue?: string;
  businessText?: string;
  voiceText?: string;
  pdfFileBuffer?: Buffer;
}) {
  const { sourceType, sourceValue, businessText, voiceText, pdfFileBuffer } = params;
  let extractedContext = '';

  if (sourceType === 'website_url' || sourceType === 'maps_link') {
    if (!sourceValue) throw new Error('URL is required');
    const response = await fetch(sourceValue);
    const html = await response.text();
    extractedContext = JSON.stringify(extractWebsiteData(sourceValue, html));
  } else if (sourceType === 'business_text') {
    extractedContext = truncate(businessText || '', 12000);
  } else if (sourceType === 'voice_note') {
    extractedContext = truncate(voiceText || '', 12000);
  } else if (sourceType === 'pdf_document') {
    if (!pdfFileBuffer) throw new Error('PDF file is required');
    extractedContext = await parsePdf(pdfFileBuffer);
  }

  if (!extractedContext.trim()) {
    throw new Error('Insufficient input for analysis');
  }

  const prompt = buildAnalysisPrompt(sourceType, extractedContext, sourceValue);
  const report = await generateJsonWithGrok(prompt);
  return report;
}

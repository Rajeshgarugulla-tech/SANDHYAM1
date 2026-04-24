const XAI_URL = process.env.XAI_BASE_URL || 'https://api.x.ai/v1/chat/completions';
const XAI_MODEL = process.env.XAI_MODEL || 'grok-3-mini';

function extractJsonObject(content: string) {
  const start = content.indexOf('{');
  const end = content.lastIndexOf('}');
  if (start === -1 || end === -1 || end <= start) {
    throw new Error('AI response did not contain JSON object');
  }
  return content.slice(start, end + 1);
}

export async function generateJsonWithGrok(prompt: string) {
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) {
    throw new Error('XAI_API_KEY is not set');
  }

  const response = await fetch(XAI_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: XAI_MODEL,
      messages: [
        { role: 'system', content: 'Return only valid JSON.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`xAI API error: ${response.status} ${body}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;
  if (typeof content !== 'string') {
    throw new Error('xAI response format invalid');
  }

  return JSON.parse(extractJsonObject(content));
}

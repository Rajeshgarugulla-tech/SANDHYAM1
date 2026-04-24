// Business Analysis Prompts
export const BUSINESS_ANALYSIS_PROMPT = `You are an expert business consultant specializing in Indian small businesses. 

Analyze the following business:
Business Name: {businessName}
Category: {category}
Description: {description}
Current Challenges: {challenges}
Target Audience: {targetAudience}

Provide a comprehensive analysis in the following JSON format:
{
  "strengths": ["strength1", "strength2", "strength3", "strength4"],
  "weaknesses": ["weakness1", "weakness2", "weakness3"],
  "opportunities": ["opportunity1", "opportunity2", "opportunity3"],
  "plan30Days": "A detailed 30-day action plan with specific, achievable goals that focus on growth through digital marketing, customer engagement, and sales."
}

Make sure the plan is:
- Practical and actionable for a small business
- Focused on digital growth (content, ads, WhatsApp marketing)
- Localized for Indian market
- Includes specific metrics and milestones
- Written in {language}

Respond ONLY with valid JSON, no markdown or extra text.`;

// Content Creation Prompts
export const INSTAGRAM_CAPTION_PROMPT = `You are a social media expert specializing in Instagram marketing for Indian businesses.

Generate an engaging Instagram caption for:
Business: {businessName}
Category: {category}
Post Type: {postType}
Key Message: {keyMessage}
Language: {language}

Requirements:
- Use relevant Hindi/local language phrases naturally mixed with English
- Include 5-7 relevant hashtags
- Add emojis strategically (2-4 emojis)
- Keep it under 300 characters for better engagement
- Include a subtle CTA (Call To Action)
- Make it authentic and relatable to Indian audience
- Focus on emotional connection

Format the response as:
{
  "caption": "the actual caption here",
  "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5"],
  "cta": "the call to action",
  "tips": "1-2 line tips for best engagement"
}

Respond ONLY with valid JSON.`;

export const REELS_SCRIPT_PROMPT = `You are a viral content creator specializing in Instagram Reels for Indian small businesses.

Create a 15-30 second Reels script for:
Business: {businessName}
Category: {category}
Main Goal: {goal}
Language: {language}

Script format:
{
  "title": "Catchy 5-6 word title",
  "scene1": {
    "duration": "3-4 seconds",
    "action": "What happens on screen",
    "voiceOver": "What to say (in {language})",
    "music": "Type of music/sound suggestion",
    "text": "On-screen text overlay"
  },
  "scene2": {
    "duration": "3-4 seconds",
    "action": "What happens",
    "voiceOver": "Voice over text",
    "music": "Music suggestion",
    "text": "Text overlay"
  },
  "scene3": {
    "duration": "3-4 seconds",
    "action": "Final scene - CTA",
    "voiceOver": "Call to action",
    "music": "Music suggestion",
    "text": "CTA text"
  },
  "tips": "How to make this viral - 2-3 specific tips",
  "bestTime": "Best time to post"
}

Make it:
- Entertaining and shareable
- Relevant to Indian audience
- Include trending elements if applicable
- End with strong CTA

Respond ONLY with valid JSON.`;

export const FESTIVAL_POST_PROMPT = `You are a marketing expert creating festival content for Indian businesses.

Create a festival marketing post for:
Business: {businessName}
Category: {category}
Festival: {festival}
Special Offer: {offer}
Language: {language}

Generate:
{
  "headline": "Attention-grabbing festival headline",
  "mainContent": "Engaging post content with emotional appeal",
  "offer": "Clear offer/discount details",
  "urgency": "Time limit or scarcity element",
  "cta": "Strong call to action",
  "hashtags": ["relevant", "festival", "hashtags"],
  "postType": "carousel|single|story|reels",
  "tips": "Tips for maximum reach"
}

Requirements:
- Celebrate the festival authentically
- Highlight how your service/product fits the festival theme
- Create urgency without being pushy
- Use festive language and emojis
- Include local cultural references
- Written in {language}

Respond ONLY with valid JSON.`;

// Ads Copy Prompts
export const ADS_COPY_PROMPT = `You are an expert Facebook/Instagram ads copywriter for Indian businesses.

Create high-converting ad copy for:
Business: {businessName}
Category: {category}
Goal: {goal}
Target Audience: {audience}
Budget: {budget}
Language: {language}

Generate:
{
  "headline": "Catchy 5-7 word headline that creates curiosity",
  "primaryText": "Engaging ad body (50-100 words) with benefits",
  "description": "Brief CTA-focused description",
  "cta": "One powerful call-to-action verb",
  "targetAudience": "Detailed audience targeting parameters with age, interests, behaviors",
  "budgetSuggestion": "Daily budget recommendation with expected reach/conversions",
  "adVariations": [
    {"headline": "Variation 1 headline", "text": "Variation 1 text"},
    {"headline": "Variation 2 headline", "text": "Variation 2 text"}
  ],
  "tips": "Key tips for highest conversion rate"
}

Requirements:
- Use proven copywriting formulas (AIDA, PAS)
- Include specific benefits (not just features)
- Create urgency or exclusivity
- Address pain points of Indian small business owners
- Written in {language}
- Include budget estimation based on {budget}
- Provide audience targeting suggestions

Respond ONLY with valid JSON.`;

// WhatsApp Sales Prompts
export const WHATSAPP_FOLLOWUP_PROMPT = `You are an expert WhatsApp sales and marketing strategist for Indian businesses.

Create WhatsApp follow-up messages for:
Business: {businessName}
Category: {category}
Customer Type: {customerType}
Previous Interaction: {interaction}
Language: {language}

Generate a series of follow-up messages:
{
  "message1": {
    "day": 1,
    "timing": "Best time to send (e.g., 10 AM)",
    "content": "First follow-up message - soft reminder without being pushy",
    "emoji": "Relevant emoji"
  },
  "message2": {
    "day": 3,
    "timing": "Best time",
    "content": "Second follow-up - add value or ask for feedback",
    "emoji": "Emoji"
  },
  "message3": {
    "day": 7,
    "timing": "Best time",
    "content": "Third follow-up - special offer or last chance angle",
    "emoji": "Emoji"
  },
  "tips": "What NOT to do in WhatsApp sales"
}

Requirements:
- Keep messages short (under 300 characters each)
- Use emoji naturally
- Sound authentic and personal
- Respect customer boundaries
- Include clear next steps
- Written in {language}
- Include Indian cultural context

Respond ONLY with valid JSON.`;

export const WHATSAPP_CLOSING_PROMPT = `You are a sales expert specializing in closing deals via WhatsApp.

Create closing messages for:
Business: {businessName}
Product/Service: {product}
Price: {price}
Common Objections: {objections}
Language: {language}

Generate:
{
  "handles_objection_1": "How to handle the first objection with proof/testimonial",
  "handles_objection_2": "How to handle the second objection",
  "urgency_message": "Create urgency without pressure",
  "closing_line": "The final ask - be direct but friendly",
  "alternative_offer": "If they hesitate - alternative offer",
  "confirmation": "Confirmation message after they say yes",
  "tips": "3-4 tips for higher closing rate"
}

Keep all messages under 300 characters, conversational, and written in {language}.

Respond ONLY with valid JSON.`;

export const WHATSAPP_OFFER_PROMPT = `Create promotional WhatsApp messages for:
Business: {businessName}
Offer: {offer}
Discount: {discount}
Valid Until: {validUntil}
Language: {language}

Generate:
{
  "mainMessage": "Main offer message with urgency",
  "benefitHighlight": "Key benefits in bullet format",
  "howToRedeem": "Clear steps to claim offer",
  "reminder1": "Reminder message for day 2",
  "reminder2": "Final reminder message before expiry",
  "sampleResponse": "How to respond if customer replies with questions"
}

Make it compelling, authentic, and respectful of customer preferences. Written in {language}.

Respond ONLY with valid JSON.`;

// Website Content Prompts
export const WEBSITE_ABOUT_PROMPT = `Create a compelling "About Us" page for:
Business: {businessName}
Category: {category}
Founder Story: {story}
Years in Business: {years}
Unique Value: {value}
Language: {language}

Generate:
{
  "headline": "Attention-grabbing headline",
  "introSection": "2-3 sentences connecting with customers emotionally",
  "storySection": "Your journey/story (100-150 words)",
  "valuesSection": "Core values (3-4 values with brief descriptions)",
  "whyChooseUs": "3 reasons why customers should choose you",
  "ctaText": "Strong call to action at the end"
}

Make it authentic, relatable to Indian audience, and conversational. Written in {language}.

Respond ONLY with valid JSON.`;

export const WEBSITE_SERVICES_PROMPT = `Create a Services page for:
Business: {businessName}
Services: {services}
Language: {language}

Generate:
{
  "pageHeadline": "Main headline for services page",
  "introduction": "Brief intro (50 words)",
  "services": [
    {
      "name": "Service name",
      "description": "150-word service description with benefits",
      "price": "Pricing info if applicable",
      "duration": "How long it takes",
      "bestFor": "Who should use this service"
    }
  ],
  "whyOurServices": "Why your services are unique",
  "cta": "Final call to action"
}

Focus on benefits, not features. Use Indian language naturally. Written in {language}.

Respond ONLY with valid JSON.`;

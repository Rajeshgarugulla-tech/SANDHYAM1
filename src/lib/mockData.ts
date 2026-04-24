export const USE_DUMMY_DATA = process.env.USE_DUMMY_DATA === 'true';

export function getDummyBusinessAnalysis(businessName: string, category: string) {
  return {
    strengths: [
      `${businessName} has strong local brand recall`,
      'Existing customer trust and word-of-mouth referrals',
      'Good service quality and repeat buyer potential',
      'Opportunity to scale with digital channels quickly',
    ],
    weaknesses: [
      'Low discoverability in Google and Maps',
      'Inconsistent posting across social channels',
      'No clear follow-up pipeline for leads',
    ],
    opportunities: [
      'Weekly offer-based content and reels strategy',
      'Review collection campaign for Maps growth',
      'WhatsApp-based lead conversion automation',
    ],
    plan30Days: `30-day growth plan for ${businessName} (${category}): Week 1 setup profiles and offer pages, Week 2 run content and review drive, Week 3 launch ads + WhatsApp followups, Week 4 optimize based on leads and conversions.`,
  };
}

export function getDummyContent(contentType: string, keyMessage: string) {
  return {
    caption: `Your brand deserves visibility. ${keyMessage || 'Book now and experience premium service today.'} #LocalBusiness #GrowWithSaadhyam #TrustedService`,
    hashtags: ['#LocalBusiness', '#BusinessGrowth', '#CustomerLove', '#DigitalMarketing', '#Hyderabad'],
    cta: 'DM us now to get this week offer.',
    tips: `Use this ${contentType} format with a customer testimonial image for higher engagement.`,
  };
}

export function getDummyAds(goal: string, audience: string) {
  return {
    headline: `Get More ${goal || 'Bookings'} This Week`,
    primaryText:
      'Trusted by local customers. Premium service, limited-time offer, and easy WhatsApp booking in one click.',
    description: 'Book your slot now. Limited daily slots available.',
    cta: 'Book Now',
    targetAudience: audience || 'Local customers aged 22-45 with service intent',
    budgetSuggestion: 'Start with INR 500/day for 7 days and scale based on conversion quality.',
    adVariations: [
      { headline: 'Limited Offer Ends Soon', text: 'Best value service for your needs. Book now.' },
      { headline: 'Top Rated Local Choice', text: 'Join 1,000+ happy customers in your city.' },
    ],
    tips: 'Run location targeting within 7km radius and retarget profile visitors after day 3.',
  };
}

export function getDummyWhatsapp(messageType: string) {
  if (messageType === 'closing') {
    return {
      handles_objection_1: 'I understand. We can start with our starter plan so you can try risk-free.',
      handles_objection_2: 'Many customers felt the same initially, and saw clear value in 7 days.',
      urgency_message: 'Today we have limited slots at offer pricing.',
      closing_line: 'Should I confirm your slot for today evening?',
      alternative_offer: 'I can lock a smaller starter package for you now.',
      confirmation: 'Done! Your booking is confirmed. Sharing next steps now.',
      tips: 'Keep messages short, friendly, and action-oriented.',
    };
  }
  if (messageType === 'offer') {
    return {
      mainMessage: 'Special offer live now. Book today and get bonus value on your first service.',
      benefitHighlight: 'Save cost, faster turnaround, premium support, trusted quality.',
      howToRedeem: 'Reply YES and our team will confirm your slot instantly.',
      reminder1: 'Friendly reminder: your offer is still active for today.',
      reminder2: 'Last chance today. Offer closes tonight.',
      sampleResponse: 'Great choice! Please share your preferred time.',
    };
  }
  return {
    message1: { day: 1, timing: '10:00 AM', content: 'Hi! Just checking if you want to proceed with booking today?', emoji: '🙂' },
    message2: { day: 3, timing: '6:00 PM', content: 'Quick reminder: We have a valuable offer for new customers this week.', emoji: '🔥' },
    message3: { day: 7, timing: '11:00 AM', content: 'Final follow-up. Want me to reserve your slot now?', emoji: '✅' },
    tips: 'Avoid spammy frequency and always give a clear single CTA.',
  };
}

export function getDummyWebsite(contentType: string, businessName: string) {
  if (contentType === 'services') {
    return {
      pageHeadline: `${businessName} Services`,
      introduction: 'We deliver trusted quality and clear outcomes for every customer.',
      services: [
        { name: 'Core Service', description: 'Our signature service with complete support.', price: 'INR 999', duration: '45 mins', bestFor: 'New customers' },
        { name: 'Premium Package', description: 'Advanced package for higher-value outcomes.', price: 'INR 1999', duration: '90 mins', bestFor: 'Regular customers' },
      ],
      whyOurServices: 'Transparent pricing, trained staff, and reliable results.',
      cta: 'Call now to book your slot.',
    };
  }
  return {
    headline: `About ${businessName}`,
    introSection: `${businessName} helps local customers with trusted and modern service standards.`,
    storySection: 'Started with a vision to offer better value and consistent customer satisfaction.',
    valuesSection: 'Quality, trust, speed, and customer-first support.',
    whyChooseUs: 'Proven outcomes, clear communication, and reliable follow-up.',
    ctaText: 'Talk to us today and grow with confidence.',
  };
}

export function getDummyIntakeReport(sourceType: string, sourceValue?: string) {
  return {
    businessProfile: {
      businessName: 'SmileCare Dental Clinic',
      businessCategory: 'clinic',
      services: ['Dental Cleaning', 'Root Canal', 'Teeth Whitening'],
      products: ['Dental care kits'],
      pricing: ['Cleaning INR 1200', 'Consultation INR 500'],
      location: 'Hyderabad',
      targetAudience: 'Families and working professionals near clinic area',
      contactDetails: ['+91 9876543210', 'smilecare@example.com'],
      socialMediaPresence: ['instagram.com/smilecare', 'facebook.com/smilecare'],
      googleMapsPresence: sourceType === 'maps_link' ? 'Available and active' : 'Present but under-optimized',
      reviewsSummary: 'Mostly positive reviews with complaints about wait time.',
      currentWeaknesses: ['Low review volume', 'Missing FAQ content', 'Inconsistent social posting'],
      missingGrowthOpportunities: ['Local SEO pages', 'WhatsApp reminders', 'Offer-based campaigns'],
    },
    autoSummary: {
      oneLiner: 'You are a dental clinic in Hyderabad with strong service quality but low digital visibility.',
      biggestGrowthProblem: 'Low Google Maps visibility and insufficient recent reviews.',
      biggestOpportunity: 'Local SEO pages + WhatsApp lead conversion.',
      competitorAdvantage: 'Competitors have better review frequency and stronger service FAQs.',
      quickWin30Day: 'Run review collection and publish service FAQ pages.',
    },
    scores: {
      businessHealthScore: 78,
      aiVisibilityScore: 42,
      leadConversionScore: 61,
      contentConsistencyScore: 35,
    },
    todayActions: [
      'Post one educational reel about common dental concerns.',
      'Ask 5 recent customers for Google reviews.',
      'Run a limited-time cleaning offer campaign.',
      'Send WhatsApp follow-up to consultation leads.',
      'Add FAQ section on appointment and pricing.',
    ],
    contentEngine: {
      adCopy: 'Healthy smile starts today. Book your dental checkup now with special offer.',
      reelsScript: 'Hook: Is your smile silently losing shine? Body: 3 quick dental care tips. CTA: Book now.',
      whatsappMessage: 'Hi! This week we have a dental checkup offer. Reply YES to book your slot.',
      offerPosterText: 'Dental Care Week - Special Checkup Offer. Limited Slots.',
      seoPageDraft: 'Best dental clinic in Hyderabad offering preventive and cosmetic care.',
      faqDraft: 'Q: Consultation fee? A: INR 500. Q: Appointment timing? A: 9AM to 8PM.',
      googleBusinessPost: 'Now offering preventive dental packages with weekend appointments.',
    },
    competitorEngine: {
      whoRanksAbove: ['BrightSmile Dental', 'CityCare Dental'],
      whyTheyRank: ['Higher review count', 'Better local keywords on pages'],
      whatTheyDoBetter: ['Consistent social content', 'Detailed service pages'],
      theirWeakPoints: ['Higher pricing', 'Slow response to inquiries'],
      howToBeatThem: ['Improve review velocity', 'Publish FAQ + service pages', 'Faster WhatsApp response'],
    },
    roadmap30Days: [
      'Week 1: Fix profile + collect reviews',
      'Week 2: Publish SEO service pages',
      'Week 3: Run offer ads + WhatsApp flows',
      'Week 4: Analyze leads and optimize campaigns',
    ],
    sourceEcho: sourceValue || '',
  };
}

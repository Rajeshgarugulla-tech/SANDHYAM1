'use client';

import React from 'react';
import { FeatureCard } from './Card';
import { useLanguageStore } from '@/lib/useLanguage';
import { t } from '@/lib/i18n';

export const FeaturesSection: React.FC = () => {
  const { language } = useLanguageStore();

  const features = [
    {
      icon: '📊',
      titleKey: 'features.analysis',
      descKey: 'features.analysis_desc',
    },
    {
      icon: '✍️',
      titleKey: 'features.content',
      descKey: 'features.content_desc',
    },
    {
      icon: '📢',
      titleKey: 'features.ads',
      descKey: 'features.ads_desc',
    },
    {
      icon: '💬',
      titleKey: 'features.whatsapp',
      descKey: 'features.whatsapp_desc',
    },
    {
      icon: '🌐',
      titleKey: 'features.website',
      descKey: 'features.website_desc',
    },
    {
      icon: '📈',
      titleKey: 'features.analytics',
      descKey: 'features.analytics_desc',
    },
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('features.title', language)}
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to grow your business online
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <FeatureCard
              key={idx}
              icon={feature.icon}
              title={t(feature.titleKey, language)}
              description={t(feature.descKey, language)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

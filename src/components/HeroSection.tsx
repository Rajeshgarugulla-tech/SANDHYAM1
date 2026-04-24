'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from './Button';
import { useLanguageStore } from '@/lib/useLanguage';
import { t } from '@/lib/i18n';

export const HeroSection: React.FC = () => {
  const { language } = useLanguageStore();

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-6 inline-block">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
            ✨ AI-Powered Growth for Indian Businesses
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          {t('hero.title', language)}
        </h1>

        <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
          {t('hero.subtitle', language)}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/auth/signup">
            <Button size="lg">{t('hero.cta', language)}</Button>
          </Link>
          <Button variant="outline" size="lg">
            {t('hero.demo', language)}
          </Button>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 pt-8 border-t border-gray-200">
          <div>
            <div className="font-bold text-lg text-gray-900">50K+</div>
            <p>Businesses using GrowLocal</p>
          </div>
          <div>
            <div className="font-bold text-lg text-gray-900">2M+</div>
            <p>Content pieces generated</p>
          </div>
          <div>
            <div className="font-bold text-lg text-gray-900">10x</div>
            <p>Average growth in 90 days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

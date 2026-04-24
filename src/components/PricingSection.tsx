'use client';

import React from 'react';
import { Button } from './Button';
import { useLanguageStore } from '@/lib/useLanguage';
import { t } from '@/lib/i18n';

export const PricingSection: React.FC = () => {
  const { language } = useLanguageStore();

  const plans = [
    {
      name: t('pricing.free', language),
      price: t('pricing.free_price', language),
      features: [
        '10 generations/month',
        'Basic analytics',
        'Email support',
        'Hindi & English only',
      ],
      cta: 'Start Free',
      highlighted: false,
    },
    {
      name: t('pricing.pro', language),
      price: t('pricing.pro_price', language),
      features: [
        'Unlimited generations',
        'Advanced analytics',
        'Priority support',
        'All 5 languages',
        'CRM features',
        'Team members (up to 5)',
      ],
      cta: 'Get Pro Now',
      highlighted: true,
    },
  ];

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('pricing.title', language)}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-8 transition-all ${
                plan.highlighted
                  ? 'bg-blue-600 text-white shadow-2xl scale-105'
                  : 'bg-white border border-gray-200'
              }`}
            >
              {plan.highlighted && (
                <div className="mb-4 inline-block px-4 py-1.5 bg-yellow-300 text-gray-900 rounded-full text-sm font-bold">
                  Most Popular
                </div>
              )}

              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-6">
                <div className="text-4xl font-bold mb-2">{plan.price}</div>
                {plan.highlighted && plan.price !== 'Free' && (
                  <p className={plan.highlighted ? 'text-blue-100' : 'text-gray-600'}>
                    Save ₹2,500/year with annual billing
                  </p>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3">
                    <span className="text-xl">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.highlighted ? 'secondary' : 'primary'}
                className="w-full"
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

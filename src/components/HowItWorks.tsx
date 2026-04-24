'use client';

import React from 'react';
import { Card } from './Card';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Set Up Your Business',
      description:
        'Tell us about your business - category, target audience, and current challenges. Takes 2 minutes.',
      icon: '🏢',
    },
    {
      number: '02',
      title: 'Choose What to Create',
      description:
        'Pick from Instagram content, ads copy, WhatsApp scripts, or business analysis. AI does the heavy lifting.',
      icon: '🎯',
    },
    {
      number: '03',
      title: 'Generate & Launch',
      description:
        'Get AI-powered content in Hindi, English, Telugu, or any regional language. Copy, customize, and post instantly.',
      icon: '🚀',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600">
            Growing your business has never been easier
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <Card key={idx} className="relative">
              <div className="text-5xl font-bold text-gray-100 mb-4">{step.number}</div>
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>

              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 text-2xl text-gray-300">
                  →
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

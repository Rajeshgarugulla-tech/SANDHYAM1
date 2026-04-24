'use client';

import React from 'react';
import { Card } from './Card';

export const UseCasesSection: React.FC = () => {
  const useCases = [
    {
      icon: '💅',
      title: 'Salons & Spas',
      examples: ['Book appointment reminders', 'Festival offers', 'Before-after content'],
    },
    {
      icon: '💪',
      title: 'Gyms & Fitness',
      examples: ['Transformation stories', 'Workout tips', 'Membership campaigns'],
    },
    {
      icon: '🛍️',
      title: 'Retail Shops',
      examples: ['Product promotions', 'Stock updates', 'Customer testimonials'],
    },
    {
      icon: '💼',
      title: 'Freelancers',
      examples: ['Portfolio content', 'Client testimonials', 'Service offerings'],
    },
    {
      icon: '🍽️',
      title: 'Restaurants',
      examples: ['Menu updates', 'Food photography', 'Delivery promos'],
    },
    {
      icon: '⚕️',
      title: 'Clinics',
      examples: ['Health tips', 'Appointment reminders', 'Patient testimonials'],
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Perfect For Any Local Business
          </h2>
          <p className="text-xl text-gray-600">
            Used by salons, gyms, shops, and more across India
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, idx) => (
            <Card key={idx}>
              <div className="text-4xl mb-3">{useCase.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{useCase.title}</h3>
              <ul className="space-y-2">
                {useCase.examples.map((example, eIdx) => (
                  <li key={eIdx} className="text-gray-600 flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>{example}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;

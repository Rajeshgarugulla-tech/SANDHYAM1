'use client';

import React from 'react';
import { Card } from './Card';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Salon Owner, Delhi',
      content:
        'GrowLocal helped me triple my bookings in 3 months! The WhatsApp scripts are gold. 🌟',
      avatar: '👩‍🦰',
      rating: 5,
    },
    {
      name: 'Rajesh Kumar',
      role: 'Gym Owner, Bangalore',
      content:
        'The Instagram content generator saves me 5 hours a week. My engagement is up 250%.',
      avatar: '💪',
      rating: 5,
    },
    {
      name: 'Meera Patel',
      role: 'Freelancer, Mumbai',
      content:
        'Best investment for my business. The business analysis revealed untapped opportunities.',
      avatar: '👩‍💼',
      rating: 5,
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Loved by Business Owners
          </h2>
          <p className="text-xl text-gray-600">
            See what real users are saying about GrowLocal
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <Card key={idx}>
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl">{testimonial.avatar}</div>
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <div className="mb-4 flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
              <p className="text-gray-600 italic">"{testimonial.content}"</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from './Button';

export const CTASection: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Grow Your Local Business?
        </h2>
        <p className="text-xl mb-10 opacity-90">
          Join 50,000+ small business owners who are already using GrowLocal to grow faster.
          Start free today, no credit card required.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/signup">
            <Button
              size="lg"
              variant="secondary"
              className="text-blue-600 hover:text-blue-700"
            >
              Start Your Free Trial
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
            Schedule Demo
          </Button>
        </div>

        <p className="text-sm opacity-75 mt-8">
          ✓ No credit card required • ✓ Cancel anytime • ✓ 24/7 support
        </p>
      </div>
    </section>
  );
};

export default CTASection;

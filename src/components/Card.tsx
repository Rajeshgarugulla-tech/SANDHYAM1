'use client';

import React from 'react';
import clsx from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className, hover = true }) => {
  return (
    <div
      className={clsx(
        'bg-white rounded-xl border border-gray-100 p-6',
        hover && 'hover:shadow-lg hover:border-gray-200 transition-all duration-300',
        className
      )}
    >
      {children}
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, className }) => {
  return (
    <Card hover className={className}>
      <div className="flex items-start gap-4">
        <div className="text-3xl flex-shrink-0">{icon}</div>
        <div>
          <h3 className="font-bold text-lg mb-2 text-gray-900">{title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </Card>
  );
};

export default Card;

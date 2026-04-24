'use client';

import React from 'react';
import { Card } from './Card';
import { AIToolStats } from '@/types';
import { aiTools } from '@/lib/aiTools';
import Link from 'next/link';

interface AIToolStatsCardProps {
  toolId: string;
  stats: AIToolStats;
}

export const AIToolStatsCard: React.FC<AIToolStatsCardProps> = ({ toolId, stats }) => {
  const tool = aiTools.find((t) => t.id === toolId);

  if (!tool) return null;

  const IconComponent = tool.icon;
  const colors = {
    'business-analysis': 'from-blue-100 to-blue-50',
    'content-creator': 'from-pink-100 to-pink-50',
    'ad-copy': 'from-purple-100 to-purple-50',
    'image-prompt': 'from-orange-100 to-orange-50',
    'whatsapp-sales': 'from-green-100 to-green-50',
    'website-ai': 'from-cyan-100 to-cyan-50',
    'daily-tasks': 'from-yellow-100 to-yellow-50',
    'competitor-analysis': 'from-red-100 to-red-50',
    'pricing-suggestion': 'from-emerald-100 to-emerald-50',
    'review-reply': 'from-violet-100 to-violet-50',
    'seo-maps': 'from-indigo-100 to-indigo-50',
  };

  const badgeColors = {
    'business-analysis': 'bg-blue-600',
    'content-creator': 'bg-pink-600',
    'ad-copy': 'bg-purple-600',
    'image-prompt': 'bg-orange-600',
    'whatsapp-sales': 'bg-green-600',
    'website-ai': 'bg-cyan-600',
    'daily-tasks': 'bg-yellow-600',
    'competitor-analysis': 'bg-red-600',
    'pricing-suggestion': 'bg-emerald-600',
    'review-reply': 'bg-violet-600',
    'seo-maps': 'bg-indigo-600',
  };

  const bgGradient = (colors as Record<string, string>)[toolId] || 'from-gray-100 to-gray-50';
  const badgeBg = (badgeColors as Record<string, string>)[toolId] || 'bg-gray-600';

  const getTrendColor = (rate: number) => {
    if (rate >= 80) return 'text-green-600';
    if (rate >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Link href={tool.href}>
      <Card className={`bg-gradient-to-br ${bgGradient} cursor-pointer hover:shadow-lg transition-shadow h-full`}>
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 ${badgeBg} text-white rounded-lg`}>
            <IconComponent size={24} />
          </div>
          <span className="text-xs font-semibold text-gray-500 bg-white px-2 py-1 rounded-full">
            This Month
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-1">{tool.title}</h3>
        <p className="text-xs text-gray-600 mb-4">{tool.description}</p>

        <div className="space-y-3">
          {/* Generations */}
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3">
            <div className="flex justify-between items-end">
              <span className="text-xs font-medium text-gray-600">Generations</span>
              <span className="text-2xl font-bold text-gray-900">
                {stats.generationsThisMonth}
              </span>
            </div>
          </div>

          {/* Success Rate */}
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3">
            <div className="flex justify-between items-end">
              <span className="text-xs font-medium text-gray-600">Success Rate</span>
              <div className="flex items-baseline gap-1">
                <span className={`text-xl font-bold ${getTrendColor(stats.successRate)}`}>
                  {stats.successRate}%
                </span>
              </div>
            </div>
            {/* Progress bar */}
            <div className="mt-2 w-full bg-gray-300 rounded-full h-1.5">
              <div
                className={`h-1.5 rounded-full ${getTrendColor(stats.successRate).replace('text-', 'bg-')}`}
                style={{ width: `${stats.successRate}%` }}
              />
            </div>
          </div>

          {/* Cost */}
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3">
            <div className="flex justify-between items-end">
              <span className="text-xs font-medium text-gray-600">Cost</span>
              <span className="text-xl font-bold text-gray-900">
                ${stats.costThisMonth.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-300/50">
          <p className="text-xs text-gray-600">
            Last used: <span className="font-semibold text-gray-700">{stats.lastUsed}</span>
          </p>
        </div>
      </Card>
    </Link>
  );
};

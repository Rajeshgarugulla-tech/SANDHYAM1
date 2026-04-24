'use client';

import React, { useState } from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { AccessRestricted } from '@/components/RoleGuard';
import { useCurrentUserRole } from '@/hooks/useCurrentUserRole';
import { hasToolAccess } from '@/lib/dashboardData';
import { BarChart3, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';

type GrowthPhase = {
  phase: string;
  tasks: string[];
};

type BusinessAnalysisResult = {
  businessType: string;
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  growthPlan: GrowthPhase[];
};

export default function BusinessAnalysisPage() {
  const { userRole } = useCurrentUserRole();
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [analysis, setAnalysis] = useState<BusinessAnalysisResult | null>(null);

  if (!hasToolAccess(userRole, 'business-analysis')) {
    return <AccessRestricted userRole={userRole} toolId="business-analysis" />;
  }

  const handleAnalyze = async () => {
    if (!input.trim()) return;

    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setAnalysis({
        businessType: 'Salon',
        strengths: [
          'Strong local presence',
          'Skilled staff',
          'Good customer retention',
          'Premium services offered',
        ],
        weaknesses: [
          'Limited online visibility',
          'Outdated booking system',
          'Low social media engagement',
          'Limited service portfolio',
        ],
        opportunities: [
          'Online booking platform',
          'Social media marketing',
          'Service expansion',
          'Corporate partnerships',
          'Staff training programs',
        ],
        threats: [
          'New competitors opening nearby',
          'Changing customer preferences',
          'Economic downturn',
          'Rising rent costs',
        ],
        growthPlan: [
          { phase: 'Month 1-2', tasks: ['Launch Instagram', 'Create booking system', 'Update pricing'] },
          {
            phase: 'Month 3-4',
            tasks: ['Run ads campaign', 'Host referral program', 'Train staff on sales'],
          },
          {
            phase: 'Month 5-6',
            tasks: ['Launch loyalty program', 'Expand services', 'Partner with influencers'],
          },
        ],
      });
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-600 text-white rounded-lg">
            <BarChart3 size={28} />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Business Analysis AI</h1>
            <p className="text-gray-600">Deep dive analysis of your business with SWOT & growth plan</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Describe Your Business</h3>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tell me about your business, type, current challenges, target audience, goals..."
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
            />
            <div className="mt-4 space-y-2">
              <Button
                onClick={handleAnalyze}
                disabled={!input.trim() || isGenerating}
                variant="primary"
                className="w-full"
              >
                {isGenerating ? '⚡ Analyzing...' : '🎯 Analyze Business'}
              </Button>
              <p className="text-xs text-gray-500">
                Be specific for better analysis. Include industry, size, current state, challenges, and goals.
              </p>
            </div>
          </Card>

          {/* Example Prompts */}
          <Card>
            <h4 className="font-semibold text-gray-900 mb-3 text-sm">Quick Examples</h4>
            <div className="space-y-2">
              {[
                'I run a salon in Bangalore with 5 staff',
                'Gym business with 100+ members',
                'Freelance web designer startup',
              ].map((example, i) => (
                <button
                  key={i}
                  onClick={() => setInput(example)}
                  className="text-xs p-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 w-full text-left transition-colors"
                >
                  {example}
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2">
          {analysis ? (
            <div className="space-y-6">
              {/* SWOT Analysis */}
              <div className="grid grid-cols-2 gap-4">
                {/* Strengths */}
                <Card className="border-l-4 border-green-500 bg-green-50">
                  <h4 className="font-bold text-green-900 mb-3 flex items-center gap-2">
                    <CheckCircle2 size={18} />
                    Strengths
                  </h4>
                  <ul className="space-y-2">
                    {analysis.strengths.map((item: string, i: number) => (
                      <li key={i} className="text-sm text-gray-700 flex gap-2">
                        <span className="text-green-600 font-bold">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* Weaknesses */}
                <Card className="border-l-4 border-red-500 bg-red-50">
                  <h4 className="font-bold text-red-900 mb-3 flex items-center gap-2">
                    <AlertCircle size={18} />
                    Weaknesses
                  </h4>
                  <ul className="space-y-2">
                    {analysis.weaknesses.map((item: string, i: number) => (
                      <li key={i} className="text-sm text-gray-700 flex gap-2">
                        <span className="text-red-600 font-bold">✕</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* Opportunities */}
                <Card className="border-l-4 border-blue-500 bg-blue-50">
                  <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                    <TrendingUp size={18} />
                    Opportunities
                  </h4>
                  <ul className="space-y-2">
                    {analysis.opportunities.map((item: string, i: number) => (
                      <li key={i} className="text-sm text-gray-700 flex gap-2">
                        <span className="text-blue-600 font-bold">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* Threats */}
                <Card className="border-l-4 border-orange-500 bg-orange-50">
                  <h4 className="font-bold text-orange-900 mb-3 flex items-center gap-2">
                    <AlertCircle size={18} />
                    Threats
                  </h4>
                  <ul className="space-y-2">
                    {analysis.threats.map((item: string, i: number) => (
                      <li key={i} className="text-sm text-gray-700 flex gap-2">
                        <span className="text-orange-600 font-bold">⚠</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>

              {/* 30-Day Growth Plan */}
              <Card>
                <h3 className="text-xl font-bold text-gray-900 mb-4">📈 30-Day Growth Plan</h3>
                <div className="space-y-4">
                  {analysis.growthPlan.map((phase: GrowthPhase, i: number) => (
                    <div key={i} className="border-l-4 border-blue-500 pl-4 pb-4">
                      <h4 className="font-bold text-gray-900 text-sm mb-2">{phase.phase}</h4>
                      <ul className="space-y-1">
                        {phase.tasks.map((task: string, j: number) => (
                          <li key={j} className="text-sm text-gray-700 flex gap-2">
                            <input type="checkbox" className="w-4 h-4 text-blue-600" />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button variant="primary">📥 Download Report</Button>
                <Button variant="outline">🔄 New Analysis</Button>
                <Button variant="outline">💾 Save Analysis</Button>
              </div>
            </div>
          ) : (
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-dashed border-blue-300">
              <div className="text-center py-12">
                <BarChart3 size={48} className="mx-auto text-blue-400 mb-4 opacity-50" />
                <p className="text-gray-600 font-semibold">Enter your business details to get analysis</p>
                <p className="text-gray-500 text-sm mt-2">
                  We&apos;ll analyze your business, identify strengths/weaknesses, and create a growth plan
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

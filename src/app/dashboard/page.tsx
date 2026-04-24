'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/Card';
import { aiTools } from '@/lib/aiTools';
import { TOOL_STATS, hasToolAccess } from '@/lib/dashboardData';
import { useCurrentUserRole } from '@/hooks/useCurrentUserRole';
import { DollarSign, Lock, ShieldCheck, Sparkles } from 'lucide-react';

type IntakeReport = {
  autoSummary?: {
    oneLiner?: string;
    biggestGrowthProblem?: string;
    biggestOpportunity?: string;
    competitorAdvantage?: string;
    quickWin30Day?: string;
  };
  scores?: {
    businessHealthScore?: number;
    aiVisibilityScore?: number;
    leadConversionScore?: number;
    contentConsistencyScore?: number;
  };
  todayActions?: string[];
};

export default function Dashboard() {
  const { userRole } = useCurrentUserRole();
  const [report, setReport] = useState<IntakeReport | null>(null);

  const totalGenerations = aiTools.reduce(
    (sum, tool) => sum + (TOOL_STATS[tool.id]?.generationsThisMonth ?? 0),
    0
  );
  const totalCost = aiTools.reduce((sum, tool) => sum + (TOOL_STATS[tool.id]?.costThisMonth ?? 0), 0);
  const avgSuccessRate =
    aiTools.reduce((sum, tool) => sum + (TOOL_STATS[tool.id]?.successRate ?? 0), 0) / aiTools.length;
  const accessibleCount = aiTools.filter((tool) => hasToolAccess(userRole, tool.id)).length;

  useEffect(() => {
    fetch('/api/intake/latest')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.report) {
          setReport(data.report as IntakeReport);
        }
      })
      .catch(() => {
        // Best effort only
      });
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Command Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Role-based overview for every AI page. Current role: <span className="font-semibold">{userRole}</span>
          </p>
        </div>
      </div>

      <Card className="border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Main Core Flow</h2>
            <p className="text-slate-600 text-sm mt-1">
              Paste website/text/PDF/voice/maps once. Saadhyam AI auto-builds your summary, scores, tasks, and content.
            </p>
          </div>
          <Link href="/dashboard/intake" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold">
            Start Auto Intake
          </Link>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
          <p className="text-sm text-cyan-100">Generations This Month</p>
          <p className="text-3xl font-bold mt-2">{totalGenerations}</p>
          <p className="text-xs text-cyan-100 mt-2">Across all AI features</p>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-500 to-green-600 text-white">
          <p className="text-sm text-emerald-100">Average Success Rate</p>
          <p className="text-3xl font-bold mt-2">{avgSuccessRate.toFixed(0)}%</p>
          <p className="text-xs text-emerald-100 mt-2">Quality benchmark</p>
        </Card>
        <Card className="bg-gradient-to-br from-violet-500 to-purple-600 text-white">
          <p className="text-sm text-violet-100">Cost This Month</p>
          <p className="text-3xl font-bold mt-2">${totalCost.toFixed(2)}</p>
          <p className="text-xs text-violet-100 mt-2">Usage spend tracking</p>
        </Card>
        <Card className="bg-gradient-to-br from-orange-500 to-amber-600 text-white">
          <p className="text-sm text-orange-100">Accessible Features</p>
          <p className="text-3xl font-bold mt-2">
            {accessibleCount}/{aiTools.length}
          </p>
          <p className="text-xs text-orange-100 mt-2">By selected role</p>
        </Card>
      </div>

      {report ? (
        <>
          <Card className="bg-white border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">Your Business Summary</h3>
            <p className="text-slate-700 text-sm">{report.autoSummary?.oneLiner || 'Summary available in latest report.'}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 text-sm">
              <p><span className="font-semibold">Biggest Problem:</span> {report.autoSummary?.biggestGrowthProblem || '-'}</p>
              <p><span className="font-semibold">Biggest Opportunity:</span> {report.autoSummary?.biggestOpportunity || '-'}</p>
              <p><span className="font-semibold">Competitor Advantage:</span> {report.autoSummary?.competitorAdvantage || '-'}</p>
              <p><span className="font-semibold">30-day Quick Win:</span> {report.autoSummary?.quickWin30Day || '-'}</p>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <Card>
              <p className="text-sm text-gray-500">Business Health Score</p>
              <p className="text-3xl font-bold text-slate-900">{report.scores?.businessHealthScore ?? '-'}/100</p>
            </Card>
            <Card>
              <p className="text-sm text-gray-500">AI Visibility Score</p>
              <p className="text-3xl font-bold text-slate-900">{report.scores?.aiVisibilityScore ?? '-'}/100</p>
            </Card>
            <Card>
              <p className="text-sm text-gray-500">Lead Conversion Score</p>
              <p className="text-3xl font-bold text-slate-900">{report.scores?.leadConversionScore ?? '-'}/100</p>
            </Card>
            <Card>
              <p className="text-sm text-gray-500">Content Consistency Score</p>
              <p className="text-3xl font-bold text-slate-900">{report.scores?.contentConsistencyScore ?? '-'}/100</p>
            </Card>
          </div>

          <Card>
            <h3 className="font-bold text-slate-900 mb-3">Do This Today</h3>
            <ul className="space-y-2 text-sm text-slate-700">
              {(report.todayActions || []).slice(0, 5).map((task) => (
                <li key={task}>- {task}</li>
              ))}
            </ul>
          </Card>
        </>
      ) : null}

      <Card className="bg-slate-900 text-white">
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck size={18} />
          <p className="font-semibold">Role Control Logic</p>
        </div>
        <p className="text-slate-300 text-sm">
          Temporary access mode is active: Admin and Business Owner can both use all AI pages for workflow testing.
          Role restrictions can be re-enabled later.
        </p>
      </Card>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={18} className="text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">All AI Features</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {aiTools.map((tool) => {
            const stats = TOOL_STATS[tool.id];
            const hasAccess = hasToolAccess(userRole, tool.id);
            const Icon = tool.icon;

            return (
              <Link key={tool.id} href={tool.href}>
                <Card className="h-full border border-slate-200">
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${tool.color} text-white`}>
                      <Icon size={20} />
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-semibold ${
                        hasAccess ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                      }`}
                    >
                      {hasAccess ? 'Unlocked' : 'Locked'}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 mt-4">{tool.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{tool.description}</p>

                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Generations</span>
                      <span className="font-semibold text-gray-900">{stats.generationsThisMonth}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Success</span>
                      <span className="font-semibold text-gray-900">{stats.successRate}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 flex items-center gap-1">
                        <DollarSign size={14} /> Cost
                      </span>
                      <span className="font-semibold text-gray-900">${stats.costThisMonth.toFixed(2)}</span>
                    </div>
                  </div>

                  {!hasAccess && (
                    <div className="mt-4 text-xs text-rose-600 flex items-center gap-1">
                      <Lock size={14} />
                      Restricted for this role
                    </div>
                  )}
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

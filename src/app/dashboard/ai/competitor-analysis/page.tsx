'use client';

import { useState } from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { AccessRestricted } from '@/components/RoleGuard';
import { useCurrentUserRole } from '@/hooks/useCurrentUserRole';
import { hasToolAccess } from '@/lib/dashboardData';
import { TrendingUp } from 'lucide-react';

export default function CompetitorAnalysisPage() {
  const { userRole } = useCurrentUserRole();
  const [competitor, setCompetitor] = useState('');
  const [insight, setInsight] = useState('');

  if (!hasToolAccess(userRole, 'competitor-analysis')) {
    return <AccessRestricted userRole={userRole} toolId="competitor-analysis" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-red-600 text-white">
          <TrendingUp size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Competitor Analysis AI</h1>
          <p className="text-slate-600">Compare offers and identify positioning opportunities.</p>
        </div>
      </div>
      <Card>
        <input
          value={competitor}
          onChange={(e) => setCompetitor(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm"
          placeholder="Competitor name or URL"
        />
        <Button
          className="mt-3"
          onClick={() =>
            setInsight('Competitor uses discounts heavily. Differentiate with premium service proof and testimonials.')
          }
        >
          Run Analysis
        </Button>
      </Card>
      <Card className="bg-rose-50 border-rose-200 text-sm">{insight || 'No analysis yet.'}</Card>
    </div>
  );
}

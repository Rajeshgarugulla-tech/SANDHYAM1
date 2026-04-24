'use client';

import { useState } from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { AccessRestricted } from '@/components/RoleGuard';
import { useCurrentUserRole } from '@/hooks/useCurrentUserRole';
import { hasToolAccess } from '@/lib/dashboardData';
import { DollarSign } from 'lucide-react';

export default function PricingSuggestionPage() {
  const { userRole } = useCurrentUserRole();
  const [base, setBase] = useState('500');
  const [price, setPrice] = useState('');

  if (!hasToolAccess(userRole, 'pricing-suggestion')) {
    return <AccessRestricted userRole={userRole} toolId="pricing-suggestion" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-emerald-600 text-white">
          <DollarSign size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Pricing Suggestion AI</h1>
          <p className="text-slate-600">Generate recommended pricing bands for your market.</p>
        </div>
      </div>
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input value={base} onChange={(e) => setBase(e.target.value)} className="border rounded-lg px-3 py-2 text-sm" />
          <input className="border rounded-lg px-3 py-2 text-sm" placeholder="City / target segment" />
          <Button onClick={() => setPrice(`Recommended range: ${Math.round(Number(base) * 1.1)} - ${Math.round(Number(base) * 1.3)}`)}>
            Suggest Price
          </Button>
        </div>
      </Card>
      <Card className="bg-emerald-50 border-emerald-200">{price || 'Run suggestion to view price range.'}</Card>
    </div>
  );
}

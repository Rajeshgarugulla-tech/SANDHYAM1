'use client';

import { useState } from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { AccessRestricted } from '@/components/RoleGuard';
import { useCurrentUserRole } from '@/hooks/useCurrentUserRole';
import { hasToolAccess } from '@/lib/dashboardData';
import { Target } from 'lucide-react';

export default function AdCopyPage() {
  const { userRole } = useCurrentUserRole();
  const [product, setProduct] = useState('');
  const [headline, setHeadline] = useState('');

  if (!hasToolAccess(userRole, 'ad-copy')) {
    return <AccessRestricted userRole={userRole} toolId="ad-copy" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-purple-600 text-white">
          <Target size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Ad Copy AI</h1>
          <p className="text-slate-600">Plan campaign message, audience and CTA in one flow.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <Card className="xl:col-span-1">
          <p className="font-semibold mb-2">Campaign Input</p>
          <textarea
            className="w-full border rounded-lg p-3 text-sm"
            rows={5}
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            placeholder="Offer details, target audience and objective"
          />
          <Button className="w-full mt-3" onClick={() => setHeadline('Limited Offer: Book Today, Glow Tomorrow')}>
            Generate Ad Set
          </Button>
        </Card>
        <Card className="xl:col-span-2 bg-gradient-to-br from-purple-50 to-fuchsia-50">
          <p className="font-semibold text-slate-900 mb-3">Generated Ad Preview</p>
          <div className="bg-white rounded-lg border p-4 space-y-2">
            <p className="text-xs text-slate-500">Headline</p>
            <p className="font-bold">{headline || 'No headline generated yet'}</p>
            <p className="text-xs text-slate-500 mt-2">Primary Text</p>
            <p className="text-sm text-slate-700">
              {headline
                ? 'Premium service, trusted team and result-focused experience. Book in one tap today.'
                : 'Run a generation to see ad copy, CTA and budget suggestions.'}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

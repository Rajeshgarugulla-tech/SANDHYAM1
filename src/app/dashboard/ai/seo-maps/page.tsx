'use client';

import { useState } from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { AccessRestricted } from '@/components/RoleGuard';
import { useCurrentUserRole } from '@/hooks/useCurrentUserRole';
import { hasToolAccess } from '@/lib/dashboardData';
import { MapPin } from 'lucide-react';

export default function SeoMapsPage() {
  const { userRole } = useCurrentUserRole();
  const [location, setLocation] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);

  if (!hasToolAccess(userRole, 'seo-maps')) {
    return <AccessRestricted userRole={userRole} toolId="seo-maps" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-indigo-600 text-white">
          <MapPin size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">SEO / Maps AI</h1>
          <p className="text-slate-600">Find local keywords and rank-improvement actions.</p>
        </div>
      </div>
      <Card>
        <div className="flex gap-3">
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="flex-1 border rounded-lg px-3 py-2 text-sm"
            placeholder="Business and location"
          />
          <Button onClick={() => setKeywords(['best salon in indiranagar', 'bridal makeup near me', 'hair spa bangalore'])}>
            Find Keywords
          </Button>
        </div>
      </Card>
      <Card className="bg-indigo-50 border-indigo-200">
        <div className="flex flex-wrap gap-2">
          {keywords.length
            ? keywords.map((k) => (
                <span key={k} className="text-xs bg-white border rounded-full px-3 py-1">
                  {k}
                </span>
              ))
            : 'No keywords generated.'}
        </div>
      </Card>
    </div>
  );
}

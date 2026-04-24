'use client';

import { useState } from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { AccessRestricted } from '@/components/RoleGuard';
import { useCurrentUserRole } from '@/hooks/useCurrentUserRole';
import { hasToolAccess } from '@/lib/dashboardData';
import { Globe } from 'lucide-react';

export default function WebsiteAiPage() {
  const { userRole } = useCurrentUserRole();
  const [section, setSection] = useState('About Us');
  const [result, setResult] = useState('');

  if (!hasToolAccess(userRole, 'website-ai')) {
    return <AccessRestricted userRole={userRole} toolId="website-ai" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-cyan-600 text-white">
          <Globe size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Website AI</h1>
          <p className="text-slate-600">Build website copy section-by-section.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card>
          {['About Us', 'Services', 'FAQ', 'CTA'].map((item) => (
            <button
              key={item}
              onClick={() => setSection(item)}
              className={`block w-full text-left p-2 rounded mb-2 ${section === item ? 'bg-cyan-600 text-white' : 'bg-slate-100'}`}
            >
              {item}
            </button>
          ))}
          <Button
            className="w-full mt-2"
            onClick={() =>
              setResult(`Generated ${section} copy with trust markers and conversion-focused language.`)
            }
          >
            Generate Section
          </Button>
        </Card>
        <Card className="lg:col-span-2 bg-cyan-50 border-cyan-200">
          <p className="font-semibold mb-2">{section} Output</p>
          <div className="bg-white border rounded-lg p-4 min-h-40 text-sm text-slate-700">
            {result || 'Select a section and generate content.'}
          </div>
        </Card>
      </div>
    </div>
  );
}

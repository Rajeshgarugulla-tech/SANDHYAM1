'use client';

import { useState } from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { AccessRestricted } from '@/components/RoleGuard';
import { useCurrentUserRole } from '@/hooks/useCurrentUserRole';
import { hasToolAccess } from '@/lib/dashboardData';
import { ImageIcon } from 'lucide-react';

export default function ImagePromptPage() {
  const { userRole } = useCurrentUserRole();
  const [brief, setBrief] = useState('');
  const [prompt, setPrompt] = useState('');

  if (!hasToolAccess(userRole, 'image-prompt')) {
    return <AccessRestricted userRole={userRole} toolId="image-prompt" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-orange-600 text-white">
          <ImageIcon size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Image Prompt AI</h1>
          <p className="text-slate-600">Generate visual prompts for posters and product creatives.</p>
        </div>
      </div>
      <Card>
        <textarea
          className="w-full border rounded-lg p-3 text-sm"
          rows={5}
          value={brief}
          onChange={(e) => setBrief(e.target.value)}
          placeholder="Style, product, mood, colors and format"
        />
        <Button
          className="mt-3"
          onClick={() =>
            setPrompt('Studio poster, premium lighting, modern minimal layout, high detail, 4k output.')
          }
        >
          Generate Prompt
        </Button>
      </Card>
      <Card className="bg-orange-50 border-orange-200 text-sm text-slate-700">
        {prompt || 'No prompt generated yet.'}
      </Card>
    </div>
  );
}

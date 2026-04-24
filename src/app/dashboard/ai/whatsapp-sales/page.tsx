'use client';

import { useState } from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { AccessRestricted } from '@/components/RoleGuard';
import { useCurrentUserRole } from '@/hooks/useCurrentUserRole';
import { hasToolAccess } from '@/lib/dashboardData';
import { MessageCircle } from 'lucide-react';

export default function WhatsappSalesPage() {
  const { userRole } = useCurrentUserRole();
  const [messageGoal, setMessageGoal] = useState('');
  const [reply, setReply] = useState('');

  if (!hasToolAccess(userRole, 'whatsapp-sales')) {
    return <AccessRestricted userRole={userRole} toolId="whatsapp-sales" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-emerald-600 text-white">
          <MessageCircle size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">WhatsApp Sales AI</h1>
          <p className="text-slate-600">Build follow-up and closing scripts for chat-based selling.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <p className="font-semibold mb-2">Conversation Context</p>
          <textarea
            className="w-full border rounded-lg p-3 text-sm"
            rows={7}
            value={messageGoal}
            onChange={(e) => setMessageGoal(e.target.value)}
            placeholder="Customer profile, product, and desired action"
          />
          <Button className="w-full mt-3" onClick={() => setReply('Hi Priya! We saved your preferred slot for tomorrow at 5 PM. Shall I confirm it now?')}>
            Draft Reply
          </Button>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-50 to-teal-50">
          <p className="font-semibold mb-2">Sales Script</p>
          <div className="rounded-lg bg-white border p-4 min-h-40 text-sm">
            {reply || 'Generated message appears here with CTA and objection handling.'}
          </div>
        </Card>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';

export default function PaymentsPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Record<string, unknown> | null>(null);

  const createBasicOrder = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: 'starter', amount: 499 }),
      });
      const data = await response.json();
      setResult(data.payment || null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <h1 className="text-2xl font-bold text-slate-900">Payments (Basic Integration)</h1>
        <p className="text-sm text-slate-600 mt-2">
          This is a starter payment flow stub. It creates a basic order response and is ready to replace with live Razorpay checkout.
        </p>
        <Button className="mt-4" onClick={createBasicOrder} loading={loading}>
          Create Starter Order (₹499)
        </Button>
      </Card>
      {result ? (
        <Card className="bg-emerald-50 border-emerald-200">
          <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
        </Card>
      ) : null}
    </div>
  );
}

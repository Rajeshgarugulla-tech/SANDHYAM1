'use client';

import { useState } from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { AccessRestricted } from '@/components/RoleGuard';
import { useCurrentUserRole } from '@/hooks/useCurrentUserRole';
import { hasToolAccess } from '@/lib/dashboardData';
import { MessageSquare } from 'lucide-react';

export default function ReviewReplyPage() {
  const { userRole } = useCurrentUserRole();
  const [review, setReview] = useState('');
  const [reply, setReply] = useState('');

  if (!hasToolAccess(userRole, 'review-reply')) {
    return <AccessRestricted userRole={userRole} toolId="review-reply" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-violet-600 text-white">
          <MessageSquare size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Review Reply AI</h1>
          <p className="text-slate-600">Generate professional responses to customer reviews.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <textarea
            rows={6}
            className="w-full border rounded-lg p-3 text-sm"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Paste customer review"
          />
          <Button
            className="mt-3"
            onClick={() =>
              setReply(
                'Thank you for sharing your experience. We appreciate your feedback and are improving service speed right away.'
              )
            }
          >
            Generate Reply
          </Button>
        </Card>
        <Card className="bg-violet-50 border-violet-200 text-sm">{reply || 'Reply will appear here.'}</Card>
      </div>
    </div>
  );
}

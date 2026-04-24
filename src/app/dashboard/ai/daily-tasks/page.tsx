'use client';

import { useState } from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { AccessRestricted } from '@/components/RoleGuard';
import { useCurrentUserRole } from '@/hooks/useCurrentUserRole';
import { hasToolAccess } from '@/lib/dashboardData';
import { CheckSquare } from 'lucide-react';

export default function DailyTasksPage() {
  const { userRole } = useCurrentUserRole();
  const [focus, setFocus] = useState('lead generation');
  const [tasks, setTasks] = useState<string[]>([]);

  if (!hasToolAccess(userRole, 'daily-tasks')) {
    return <AccessRestricted userRole={userRole} toolId="daily-tasks" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-amber-600 text-white">
          <CheckSquare size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Daily Tasks AI</h1>
          <p className="text-slate-600">Turn a goal into practical daily execution tasks.</p>
        </div>
      </div>
      <Card>
        <div className="flex gap-3">
          <input
            value={focus}
            onChange={(e) => setFocus(e.target.value)}
            className="flex-1 border rounded-lg px-3 py-2 text-sm"
            placeholder="Growth focus"
          />
          <Button onClick={() => setTasks(['Post one customer result story', 'Call 5 warm leads', 'Publish one offer'])}>
            Build Today Plan
          </Button>
        </div>
      </Card>
      <Card className="bg-amber-50 border-amber-200">
        <ul className="space-y-2 text-sm">
          {tasks.length
            ? tasks.map((task) => (
                <li key={task}>
                  <input type="checkbox" className="mr-2" />
                  {task}
                </li>
              ))
            : 'No tasks yet.'}
        </ul>
      </Card>
    </div>
  );
}

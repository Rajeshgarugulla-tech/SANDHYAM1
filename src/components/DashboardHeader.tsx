'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button';

export default function DashboardHeader() {
  const router = useRouter();
  const [role] = useState(() => {
    if (typeof window === 'undefined') return 'business_owner';
    return localStorage.getItem('saadhyam_user_role') || 'business_owner';
  });

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    localStorage.removeItem('saadhyam_user_role');
    router.push('/auth/login');
  };

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
      <h1 className="text-2xl font-bold text-slate-900">Saadhyam</h1>
      <div className="flex items-center gap-3">
        <span className="text-sm rounded-lg px-3 py-2 border border-slate-200 bg-slate-50 text-slate-700">
          Role: {role}
        </span>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </header>
  );
}

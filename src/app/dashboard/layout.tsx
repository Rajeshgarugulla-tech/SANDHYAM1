'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        const data = await response.json();
        if (!response.ok || !data.success) {
          router.replace('/auth/login');
          return;
        }
        localStorage.setItem('saadhyam_user_role', data.user.role);
      } catch {
        router.replace('/auth/login');
        return;
      }
      setCheckingAuth(false);
    };
    checkAuth();
  }, [router]);

  if (checkingAuth) {
    return <div className="h-screen flex items-center justify-center text-slate-600">Checking account...</div>;
  }

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 overflow-auto flex flex-col">
        <DashboardHeader />

        <main className="p-6 overflow-y-auto flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { UserRole } from '@/types';
import { DEFAULT_USER_ROLE } from '@/lib/dashboardData';

const STORAGE_KEY = 'saadhyam_user_role';

export function useCurrentUserRole() {
  const [userRole, setUserRole] = useState<UserRole>(() => {
    if (typeof window === 'undefined') {
      return DEFAULT_USER_ROLE;
    }
    const rawRole = localStorage.getItem(STORAGE_KEY);
    return rawRole === 'admin' || rawRole === 'business_owner' ? rawRole : DEFAULT_USER_ROLE;
  });
  const updateRole = (nextRole: UserRole) => {
    setUserRole(nextRole);
    localStorage.setItem(STORAGE_KEY, nextRole);
  };

  return { userRole, updateRole };
}

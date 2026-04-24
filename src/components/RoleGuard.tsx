'use client';

import React from 'react';
import { UserRole, ROLE_PERMISSIONS } from '@/types';

interface RoleGuardProps {
  userRole: UserRole;
  requiredPermissions: string[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({
  userRole,
  requiredPermissions,
  children,
  fallback,
}) => {
  const userPermissions = ROLE_PERMISSIONS[userRole];
  const hasPermission = requiredPermissions.every((permission) =>
    userPermissions.includes(permission)
  );

  if (!hasPermission) {
    return fallback ? <>{fallback}</> : null;
  }

  return <>{children}</>;
};

interface AccessRestrictedProps {
  userRole: UserRole;
  toolId: string;
}

export const AccessRestricted: React.FC<AccessRestrictedProps> = ({ userRole, toolId }) => {
  const userPermissions = ROLE_PERMISSIONS[userRole];
  const hasAccess = userPermissions.includes(toolId);

  if (hasAccess) return null;

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-4xl">🔒</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Restricted</h2>
        <p className="text-gray-600 mb-6">
          This feature is not available for your role. Please contact your administrator.
        </p>
        <a
          href="/dashboard"
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Dashboard
        </a>
      </div>
    </div>
  );
};

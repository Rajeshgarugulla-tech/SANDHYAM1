'use client';

import React, { useState } from 'react';
import { ChevronLeft, CreditCard, LayoutDashboard, SearchCheck } from 'lucide-react';
import SidebarItem from './SidebarItem';
import { aiTools } from '@/lib/aiTools';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`${
        isCollapsed ? 'w-20' : 'w-72'
      } bg-gradient-to-b from-slate-900 to-slate-800 text-white transition-all duration-300 ease-in-out overflow-y-auto hidden md:flex flex-col border-r border-slate-700`}
    >
      {/* Header with Branding */}
      <div className="p-6 border-b border-slate-700 sticky top-0 bg-slate-900/80 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg">
              🚀
            </div>
            {!isCollapsed && (
              <div className="flex-1">
                <h1 className="font-bold text-lg tracking-tight">Saadhyam</h1>
                <p className="text-xs text-slate-400">AI for Business Growth</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 hover:bg-slate-700 rounded-lg transition-colors text-slate-300 hover:text-white"
            title={isCollapsed ? 'Expand' : 'Collapse'}
          >
            <ChevronLeft
              size={20}
              className={`transform transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <SidebarItem
          tool={{
            id: 'dashboard',
            title: 'Dashboard',
            description: 'See complete AI feature overview',
            icon: LayoutDashboard,
            href: '/dashboard',
            color: 'from-cyan-600 to-blue-600',
          }}
          isCollapsed={isCollapsed}
        />
        <SidebarItem
          tool={{
            id: 'intake',
            title: 'Auto Intake',
            description: 'Paste URL, PDF, voice or maps',
            icon: SearchCheck,
            href: '/dashboard/intake',
            color: 'from-indigo-600 to-violet-600',
          }}
          isCollapsed={isCollapsed}
        />
        <SidebarItem
          tool={{
            id: 'payments',
            title: 'Payments',
            description: 'Starter billing integration',
            icon: CreditCard,
            href: '/dashboard/payments',
            color: 'from-emerald-600 to-teal-600',
          }}
          isCollapsed={isCollapsed}
        />
        {aiTools.map((tool) => (
          <SidebarItem key={tool.id} tool={tool} isCollapsed={isCollapsed} />
        ))}
      </nav>

      {/* Footer Section */}
      <div className="p-4 border-t border-slate-700 bg-slate-900/50">
        {!isCollapsed && (
          <div className="text-xs text-slate-400 space-y-2">
            <p className="font-semibold text-slate-300">💡 Pro Tip</p>
            <p>
              Use AI Tools to save time and grow faster. Start with Business Analysis.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}

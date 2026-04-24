'use client';

import React from 'react';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface AITool {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  color: string;
}

interface SidebarItemProps {
  tool: AITool;
  isCollapsed: boolean;
}

export default function SidebarItem({ tool, isCollapsed }: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(tool.href);
  const Icon = tool.icon;

  return (
    <Link href={tool.href}>
      <div
        className={`
          relative px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer
          ${
            isActive
              ? `bg-gradient-to-r ${tool.color} shadow-lg shadow-blue-500/20`
              : 'hover:bg-slate-700/50 text-slate-300 hover:text-white'
          }
          ${isCollapsed ? 'flex justify-center' : 'flex items-start gap-3'}
          group
        `}
        title={isCollapsed ? tool.title : ''}
      >
        {/* Icon */}
        <div
          className={`flex-shrink-0 flex items-center justify-center ${
            isActive
              ? 'text-white'
              : 'text-slate-400 group-hover:text-white group-hover:scale-110'
          } transition-transform`}
        >
          <Icon size={20} />
        </div>

        {/* Text Content - Hidden when collapsed */}
        {!isCollapsed && (
          <div className="flex-1 min-w-0">
            <p
              className={`text-sm font-semibold truncate ${
                isActive ? 'text-white' : 'text-slate-300'
              }`}
            >
              {tool.title}
            </p>
            <p className="text-xs text-slate-400 line-clamp-1 group-hover:text-slate-300 transition-colors">
              {tool.description}
            </p>
          </div>
        )}

        {/* Hover Indicator */}
        {isActive && !isCollapsed && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full" />
        )}
      </div>
    </Link>
  );
}

import { AIToolStats, ROLE_PERMISSIONS, UserRole } from '@/types';

export const DEFAULT_USER_ROLE: UserRole = 'business_owner';

export const TOOL_STATS: Record<string, AIToolStats> = {
  'business-analysis': {
    toolId: 'business-analysis',
    generationsThisMonth: 12,
    successRate: 95,
    costThisMonth: 24,
    lastUsed: 'Today',
    totalGenerations: 45,
  },
  'content-creator': {
    toolId: 'content-creator',
    generationsThisMonth: 34,
    successRate: 88,
    costThisMonth: 68,
    lastUsed: 'Today',
    totalGenerations: 156,
  },
  'ad-copy': {
    toolId: 'ad-copy',
    generationsThisMonth: 28,
    successRate: 92,
    costThisMonth: 56,
    lastUsed: 'Yesterday',
    totalGenerations: 128,
  },
  'image-prompt': {
    toolId: 'image-prompt',
    generationsThisMonth: 15,
    successRate: 85,
    costThisMonth: 30,
    lastUsed: '2 days ago',
    totalGenerations: 67,
  },
  'whatsapp-sales': {
    toolId: 'whatsapp-sales',
    generationsThisMonth: 42,
    successRate: 91,
    costThisMonth: 84,
    lastUsed: 'Today',
    totalGenerations: 234,
  },
  'website-ai': {
    toolId: 'website-ai',
    generationsThisMonth: 8,
    successRate: 100,
    costThisMonth: 16,
    lastUsed: '3 days ago',
    totalGenerations: 32,
  },
  'daily-tasks': {
    toolId: 'daily-tasks',
    generationsThisMonth: 30,
    successRate: 90,
    costThisMonth: 60,
    lastUsed: 'Today',
    totalGenerations: 210,
  },
  'competitor-analysis': {
    toolId: 'competitor-analysis',
    generationsThisMonth: 6,
    successRate: 83,
    costThisMonth: 12,
    lastUsed: '1 week ago',
    totalGenerations: 24,
  },
  'pricing-suggestion': {
    toolId: 'pricing-suggestion',
    generationsThisMonth: 5,
    successRate: 88,
    costThisMonth: 10,
    lastUsed: '2 weeks ago',
    totalGenerations: 18,
  },
  'review-reply': {
    toolId: 'review-reply',
    generationsThisMonth: 22,
    successRate: 94,
    costThisMonth: 44,
    lastUsed: 'Today',
    totalGenerations: 98,
  },
  'seo-maps': {
    toolId: 'seo-maps',
    generationsThisMonth: 4,
    successRate: 79,
    costThisMonth: 8,
    lastUsed: '3 weeks ago',
    totalGenerations: 14,
  },
};

export const hasToolAccess = (role: UserRole, toolId: string) =>
  ROLE_PERMISSIONS[role].includes(toolId);

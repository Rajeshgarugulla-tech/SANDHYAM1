// User and Business Types
export type UserRole = 'admin' | 'business_owner';
export type Language = 'en' | 'hi' | 'te' | 'ta' | 'kn' | 'mr';
export type BusinessCategory = 'salon' | 'gym' | 'shop' | 'freelancer' | 'restaurant' | 'clinic' | 'coaching' | 'other';

// Role-based permissions
export type RolePermissions = {
  [key in UserRole]: string[];
};

export const ROLE_PERMISSIONS: RolePermissions = {
  admin: [
    'business-analysis',
    'content-creator',
    'ad-copy',
    'image-prompt',
    'whatsapp-sales',
    'website-ai',
    'daily-tasks',
    'competitor-analysis',
    'pricing-suggestion',
    'review-reply',
    'seo-maps',
  ],
  business_owner: [
    'business-analysis',
    'content-creator',
    'ad-copy',
    'image-prompt',
    'whatsapp-sales',
    'website-ai',
    'daily-tasks',
    'competitor-analysis',
    'pricing-suggestion',
    'review-reply',
    'seo-maps',
  ],
};

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  language: Language;
  role: UserRole;
  plan: 'free' | 'pro';
  createdAt: string;
  lastLogin: string;
}

export interface AIToolStats {
  toolId: string;
  generationsThisMonth: number;
  successRate: number; // 0-100
  costThisMonth: number;
  lastUsed: string;
  totalGenerations: number;
}

export interface BusinessProfile {
  id: string;
  userId: string;
  businessName: string;
  category: BusinessCategory;
  description: string;
  phone: string;
  address: string;
  city: string;
  targetAudience: string;
  monthlyBudget?: number;
  currentChallenges: string;
  createdAt: string;
  updatedAt: string;
}

export interface AIGeneration {
  id: string;
  userId: string;
  businessId: string;
  type: 'business_analysis' | 'content' | 'ads' | 'whatsapp' | 'website';
  content: string;
  language: Language;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface ContentGeneration extends AIGeneration {
  type: 'content';
  subType: 'instagram_caption' | 'reels_script' | 'festival_post';
}

export interface AdsGeneration extends AIGeneration {
  type: 'ads';
  platform: 'facebook' | 'instagram' | 'google';
  headline: string;
  primaryText: string;
  cta: string;
  targetAudience: string;
  budgetSuggestion: number;
}

export interface WhatsappGeneration extends AIGeneration {
  type: 'whatsapp';
  subType: 'followup' | 'closing' | 'offer';
  content: string;
}

export interface BusinessAnalysis {
  id: string;
  userId: string;
  businessId: string;
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  plan30Days: string;
  generatedAt: string;
  language: Language;
}

// API Response Types
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

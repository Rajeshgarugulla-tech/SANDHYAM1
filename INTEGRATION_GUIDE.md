# 🚀 Saadhyam Dashboard - Integration Guide

## Overview

Your **Saadhyam** dashboard has been completely transformed with a premium, modern AI tools sidebar featuring **11 powerful AI modules**. This guide explains the architecture, how to customize, and how to integrate real APIs.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── dashboard/
│   │   ├── layout.tsx           # Main dashboard layout (uses Sidebar)
│   │   ├── page.tsx             # Dashboard home
│   │   └── ai/                  # AI Tools Pages
│   │       ├── business-analysis/page.tsx
│   │       ├── content-creator/page.tsx
│   │       ├── ad-copy/page.tsx
│   │       ├── image-prompt/page.tsx
│   │       ├── whatsapp-sales/page.tsx
│   │       ├── website-ai/page.tsx
│   │       ├── daily-tasks/page.tsx
│   │       ├── competitor-analysis/page.tsx
│   │       ├── pricing-suggestion/page.tsx
│   │       ├── review-reply/page.tsx
│   │       └── seo-maps/page.tsx
│
├── components/
│   ├── Sidebar.tsx              # Main sidebar component (collapsible)
│   ├── SidebarItem.tsx          # Reusable sidebar item
│   ├── AIToolPage.tsx           # Reusable AI tool page template
│   └── ... (other components)
│
└── lib/
    ├── aiTools.ts              # AI tools data & configuration
    ├── iconRegistry.ts         # Icon mapping for client components
    └── ... (other utilities)
```

---

## 🧩 Core Components

### 1. **Sidebar.tsx**
Main sidebar component with collapsible functionality.

**Features:**
- Collapsible (icons-only mode when collapsed)
- Modern gradient design (Notion/Stripe style)
- Sticky header with Saadhyam branding
- Footer with pro tip
- Smooth animations

**Usage:**
```tsx
import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}
```

### 2. **SidebarItem.tsx**
Reusable component for each AI tool in the sidebar.

**Features:**
- Active state highlighting with gradient
- Icon + Title + Description (responsive)
- Hover effects
- Smooth transitions

**Auto-generates from `aiTools` data:**
```tsx
// Each item automatically shows:
// - Icon (lucide-react)
// - Title
// - Description
// - Active highlight on current route
```

### 3. **AIToolPage.tsx**
Reusable template for all AI tool pages.

**Features:**
- Header with icon, title, description
- Input textarea for user requests
- Generate button with loading state
- Example requests (clickable)
- Result display with copy/save/regenerate
- Info tips

**Usage:**
```tsx
import AIToolPage from '@/components/AIToolPage';

export default function MyAIToolPage() {
  return (
    <AIToolPage
      iconName="business-analysis"
      title="Business Analysis AI"
      description="Analyze your business strengths, weaknesses & growth plan"
      inputPlaceholder="Describe your business..."
      examples={[
        'Example request 1',
        'Example request 2',
      ]}
    />
  );
}
```

---

## 🎨 AI Tools Configuration

### **aiTools.ts**
Central configuration file for all 11 AI tools.

```tsx
export const aiTools = [
  {
    id: 'business-analysis',
    title: 'Business Analysis AI',
    description: 'Analyze strengths, weaknesses & growth plan',
    icon: BarChart3,
    href: '/dashboard/ai/business-analysis',
    color: 'from-blue-600 to-blue-500',
  },
  // ... 10 more tools
];
```

**To add a new AI tool:**
1. Add it to `aiTools.ts` array
2. Add corresponding icon to `iconRegistry.ts`
3. Create `/dashboard/ai/[tool-id]/page.tsx`
4. Use `AIToolPage` component

---

## 🔧 How to Integrate APIs

### Step 1: Update AIToolPage to Accept Form Data

```tsx
// In your AI tool page (e.g., business-analysis/page.tsx)
interface FormData {
  businessName: string;
  category: string;
  description: string;
  // ... other fields
}

// Pass formFields to AIToolPage
<AIToolPage
  formFields={[
    { name: 'businessName', label: 'Business Name', type: 'text' },
    { name: 'category', label: 'Category', type: 'select', options: [...] },
  ]}
/>
```

### Step 2: Add API Call in AIToolPage

```tsx
const handleGenerate = async () => {
  setIsGenerating(true);
  try {
    const response = await fetch('/api/generate/business-analysis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        businessName: input,
        language: 'en',
        // ... other data
      }),
    });
    
    const data = await response.json();
    setResult(data.result);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    setIsGenerating(false);
  }
};
```

### Step 3: Connect to OpenAI/Your AI Service

Your existing API routes already have the structure:
- `/api/generate/analysis`
- `/api/generate/content`
- `/api/generate/ads`
- `/api/generate/whatsapp`
- `/api/generate/website`

**Example API route (`/api/generate/analysis`):**
```tsx
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { businessName, language } = await req.json();

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Analyze this business: ${businessName}. Provide in ${language}.`,
        },
      ],
    });

    return NextResponse.json({
      success: true,
      result: completion.choices[0].message.content,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to generate' },
      { status: 500 }
    );
  }
}
```

---

## 🎯 Customization Guide

### Change Colors

Update gradient colors in `aiTools.ts`:
```tsx
{
  id: 'business-analysis',
  // Old: color: 'from-blue-600 to-blue-500',
  // New:
  color: 'from-red-600 to-red-500',
}
```

### Add New AI Tool

1. **Add to aiTools.ts:**
```tsx
{
  id: 'new-tool',
  title: 'New AI Tool',
  description: 'Description here',
  icon: NewIcon,
  href: '/dashboard/ai/new-tool',
  color: 'from-color-600 to-color-500',
}
```

2. **Add icon to iconRegistry.ts:**
```tsx
export const iconRegistry = {
  // ...existing
  'new-tool': NewIcon,
};
```

3. **Create page:**
```tsx
// /dashboard/ai/new-tool/page.tsx
import AIToolPage from '@/components/AIToolPage';

export default function NewToolPage() {
  return (
    <AIToolPage
      iconName="new-tool"
      title="New AI Tool"
      description="..."
      inputPlaceholder="..."
      examples={[...]}
    />
  );
}
```

### Modify Sidebar Styling

Edit `Sidebar.tsx`:
```tsx
// Header background
className="bg-gradient-to-b from-slate-900 to-slate-800"

// Active item highlight
{isActive ? `bg-gradient-to-r ${tool.color} shadow-lg` : ...}

// Sidebar width when expanded/collapsed
isCollapsed ? 'w-20' : 'w-72'
```

---

## 📱 Responsive Design

The sidebar and all AI tool pages are fully responsive:

**Desktop (md and above):**
- Full sidebar visible (72px width or 280px expanded)
- All text visible
- Hover effects active

**Mobile (below md):**
- Sidebar hidden by default
- Can be toggled via menu button
- Full-width content area
- Optimized touch targets

---

## 🎯 Usage Examples

### Navigate to an AI Tool
```tsx
// Click any sidebar item → automatically navigates to tool page
// URL: /dashboard/ai/business-analysis
// Active state highlighted in sidebar
```

### Collapse Sidebar
```tsx
// Click the chevron button in sidebar header
// Sidebar becomes icons-only (w-20)
// Hover shows full description in tooltip
```

### Generate Content
```tsx
1. User enters request in textarea
2. Clicks "Generate" button
3. Simulates API call (1.5s delay)
4. Shows result in green box
5. Can copy, save, or regenerate
```

---

## 🔐 Environment Setup

Make sure your `.env.local` has:

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# OpenAI
OPENAI_API_KEY=your_openai_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 🧪 Testing Locally

```bash
# Start dev server
npm run dev

# Visit http://localhost:3000/dashboard
# Login (will be protected once Firebase auth is enabled)
# Click any AI tool in sidebar
# Test the generate functionality
```

---

## 📊 File Statistics

**New Components:** 3
- `Sidebar.tsx`
- `SidebarItem.tsx`
- `AIToolPage.tsx`

**New Pages:** 11
- One for each AI tool

**New Data Files:** 2
- `aiTools.ts`
- `iconRegistry.ts`

**Updated Files:** 4
- `dashboard/layout.tsx` (uses new Sidebar)
- `Navigation.tsx` (updated branding)
- `page.tsx` (footer branding)
- `.env.local` (template)

**Total New Lines:** ~800+ production-ready code

---

## 🚀 Next Steps

1. **API Integration**
   - Connect each AI tool to your API endpoints
   - Update `handleGenerate` in `AIToolPage.tsx`

2. **Database**
   - Store generated results in Firestore
   - Add history/saved results feature

3. **User Authentication**
   - Protect dashboard with Firebase Auth
   - Link results to user account

4. **Analytics**
   - Track which AI tools are most used
   - Monitor API costs per tool

5. **Premium Features**
   - Add usage limits for Free plan
   - Implement download/export features
   - Add team collaboration

---

## 📞 Support

For questions about:
- **Component structure:** Check individual component files
- **Styling:** See Tailwind classes in components
- **API integration:** Reference `/api/generate/*` routes
- **Icons:** Check `lucide-react` documentation

---

**Built with ❤️ for Saadhyam - AI for Business Growth**

Last Updated: April 24, 2026

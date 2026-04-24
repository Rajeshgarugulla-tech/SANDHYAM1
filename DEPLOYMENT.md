# DEPLOYMENT GUIDE

## 🚀 Deploy GrowLocal to Vercel (5 minutes)

### Step 1: Prepare Your Repository

```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial GrowLocal MVP commit"

# Create a new GitHub repository
# Then push:
git remote add origin https://github.com/yourusername/growlocal.git
git branch -M main
git push -u origin main
```

### Step 2: Sign Up / Login to Vercel

1. Go to https://vercel.com
2. Click "Sign Up" or "Log In"
3. Choose GitHub as your provider
4. Authorize Vercel to access your GitHub

### Step 3: Import Project

1. Click "New Project"
2. Select your GitHub repository
3. Vercel auto-detects Next.js configuration
4. Click "Import"

### Step 4: Configure Environment Variables

1. In Vercel dashboard, go to "Settings" → "Environment Variables"
2. Add all variables from `.env.local`:

```
NEXT_PUBLIC_FIREBASE_API_KEY = your_value
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = your_value
NEXT_PUBLIC_FIREBASE_PROJECT_ID = your_value
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = your_value
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = your_value
NEXT_PUBLIC_FIREBASE_APP_ID = your_value
OPENAI_API_KEY = your_value
NEXT_PUBLIC_APP_URL = https://your-domain.vercel.app
```

### Step 5: Deploy

1. Click "Deploy"
2. Wait for build to complete (2-3 minutes)
3. Your site is live! 🎉

---

## 🌐 Add Custom Domain

### If you have a domain (e.g., growlocal.in):

1. In Vercel dashboard → "Settings" → "Domains"
2. Click "Add"
3. Enter your domain
4. Vercel will show DNS records to update
5. Update DNS at your domain registrar:
   - For Godaddy/Namecheap: Point A record to Vercel IPs
   - Wait for DNS propagation (24-48 hours)

### Quick DNS Setup for .in domains:

```
Name: @
Type: A
Value: 76.75.126.134

Name: www
Type: CNAME
Value: cname.vercel-dns.com
```

---

## 🔧 Environment Variables Explained

**NEXT_PUBLIC_** variables are exposed to browser (safe for public info only)

```javascript
// ✅ Safe to expose
NEXT_PUBLIC_FIREBASE_API_KEY=xxx
NEXT_PUBLIC_APP_URL=https://app.com

// ❌ NEVER expose
OPENAI_API_KEY=xxx (keep server-side only)
```

---

## 📊 Monitoring After Deploy

### Vercel Analytics
- Go to "Analytics" tab
- Monitor: Response time, requests/sec, errors
- Auto-alerts for issues

### Next.js Monitoring
```bash
# Speed insights
npm install @vercel/speed-insights

# In app/layout.tsx:
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout() {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
```

---

## 🔐 Security Checklist

- [ ] OpenAI API key is server-side only
- [ ] Firebase rules are configured in console
- [ ] CORS headers set in Next.js (if needed)
- [ ] Rate limiting enabled for API routes
- [ ] Environment variables secured in Vercel

```typescript
// Example: Rate limiting
import { Ratelimit } from '@upstash/ratelimit';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 h'),
});

export async function POST(req: Request) {
  const { success } = await ratelimit.limit('user-id');
  if (!success) return new Response('Too many requests', { status: 429 });
  // Process request
}
```

---

## 🔄 CI/CD: Auto-Deploy on Git Push

By default, Vercel auto-deploys on every push to main:

1. Push code to GitHub
2. Vercel detects changes
3. Builds and deploys automatically
4. Get notification when done

To skip auto-deploy:
- Add `[skip]` to commit message: `git commit -m "Update [skip]"`

---

## 📈 Scale to Production

### As traffic grows:

```
Week 1: 100 users/day → No issues
Week 2: 1K users/day → Monitor database
Week 3: 10K users/day → Consider Vercel Pro
Week 4: 50K+ users/day → Scale database, add caching
```

**Upgrade recommendations:**
- Vercel Pro ($20/month) - Priority support, more builds
- Firebase Blaze Plan - Pay-as-you-go (recommended for growth)
- Redis caching - Speed up API responses
- CDN - Faster global delivery

---

## 🐛 Troubleshooting

### Build fails
```bash
# Local test
npm run build

# Check errors in terminal
# Usually: missing env vars or npm package issues
```

### Site is slow
```
# Check:
1. Vercel Analytics
2. Database query optimization
3. Enable image optimization
4. Add caching headers
```

### Deployment hangs
- Check Vercel logs
- Ensure all env vars are set
- Try manual redeploy: Settings → Deployments → Redeploy

---

## 📱 Mobile Testing

After deploy, test on real devices:
- iOS Safari
- Android Chrome
- Check responsive design
- Test sign-up flow

```bash
# Get your Vercel URL
https://growlocal-xxx.vercel.app

# Share with beta testers
# Use Vercel shareable preview link
```

---

## 🎯 Next Deployment Steps

1. **Week 1:** Launch on Vercel with basic features
2. **Week 2:** Enable Firebase authentication
3. **Week 3:** Connect OpenAI API
4. **Week 4:** Payment integration (Razorpay)
5. **Week 5+:** Scale infrastructure

---

**Happy Deploying! 🚀**

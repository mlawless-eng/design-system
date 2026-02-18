# Treasury App - Deployment Guide

## Quick Start (Local Development)

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
# http://localhost:5173
```

## Deploy to Replit

### Method 1: Import from Git

1. Go to [Replit](https://replit.com)
2. Click "Create Repl"
3. Select "Import from GitHub"
4. Paste repository URL or upload files
5. Replit will auto-detect Node.js project
6. Click "Run" - app will start automatically

### Method 2: Upload Files

1. Go to [Replit](https://replit.com)
2. Click "Create Repl"
3. Select "Node.js" template
4. Upload all project files
5. Click "Run"

### Environment Variables (Replit)

Add these in Replit Secrets tab:

```
VITE_WALLETCONNECT_PROJECT_ID=your-project-id-here
```

To get a WalletConnect Project ID:
1. Go to https://cloud.walletconnect.com
2. Sign up/login
3. Create new project
4. Copy Project ID

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts
```

Or connect GitHub repo directly on [Vercel](https://vercel.com)

## Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod

# Follow prompts
```

Or drag-and-drop `dist/` folder on [Netlify](https://netlify.com)

## Build for Production

```bash
# Build static files
npm run build

# Preview production build
npm run preview

# Output in dist/ directory
```

## Testing the App

1. Open app in browser
2. Click "Continue with Google" or "Connect Wallet"
3. Complete onboarding form
4. Access dashboard with mock data

## Features Implemented

- Login with Google/Microsoft SSO (mock)
- Login with Web3 wallet (MetaMask, WalletConnect)
- Protected routes with auth guard
- Onboarding flow for new users
- Dashboard with account overview
- Transaction history display
- Responsive design
- Ripple Custody inspired UI

## Tech Stack

- Vite 7
- React 19
- TypeScript 5
- React Router v6
- wagmi + Web3Modal
- shadcn/ui components
- Tailwind CSS
- Lucide icons

## Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── auth/            # LoginScreen
│   ├── onboarding/      # AccountSetup
│   ├── dashboard/       # Header, Sidebar, AccountOverview
│   └── layout/          # AppLayout, ProtectedRoute
├── lib/                 # auth.tsx, wallet.tsx, utils.ts
├── pages/               # Page components (routing)
├── types/               # TypeScript interfaces
└── main.tsx             # App entry point
```

## Next Steps

1. Replace mock auth with real OAuth providers
2. Connect to backend API
3. Implement real wallet signing
4. Add more dashboard features
5. Deploy to production

## Support

For issues or questions, check:
- Implementation plan: `/docs/plans/2026-02-18-treasury-app-implementation.md`
- README: `/README.md`

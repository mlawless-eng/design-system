# Treasury App - Login & Onboarding Design

**Date:** 2026-02-18
**Status:** Approved
**Author:** Claude Sonnet 4.5

## Overview

Build a new treasury application with modern authentication (SSO + Wallet Connect), onboarding flow for account setup, and professional dashboard matching Ripple Custody design system.

## Requirements

### Core Features
- **Login Screen**: SSO (Google, Microsoft) + Web3 Wallet Connect
- **Onboarding Flow**: Account/wallet creation for first-time users
- **Dashboard**: Account overview with balances, transactions, Ripple Custody styling

### Technical Requirements
- **Tech Stack**: Vite + React + TypeScript
- **UI Library**: shadcn/ui (matches existing payment.tsx)
- **Auth**: OAuth for SSO + wagmi for wallet connections
- **Design**: Ripple Custody design system (light theme, professional)
- **Deployment**: Replit-ready configuration

## Architecture

### Tech Stack Selection

**Chosen Approach**: Vite + React + shadcn/ui

**Rationale:**
- Matches existing payment.tsx stack for consistency
- shadcn/ui provides professional components out of the box
- Fast dev experience with Vite HMR
- Excellent Web3/wallet ecosystem support (wagmi, web3modal)
- Clean separation of concerns (UI app + backend API)
- Proven stack from existing payment app

### Project Structure

```
treasury-app/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── ...
│   │   │
│   │   ├── auth/
│   │   │   ├── LoginScreen.tsx       # Main login component
│   │   │   ├── WalletConnect.tsx     # Wallet connection UI
│   │   │   └── SSOButtons.tsx        # Google/Microsoft buttons
│   │   │
│   │   ├── onboarding/
│   │   │   ├── OnboardingFlow.tsx    # Multi-step container
│   │   │   └── AccountSetup.tsx      # Account/wallet setup
│   │   │
│   │   ├── dashboard/
│   │   │   ├── Dashboard.tsx         # Main dashboard
│   │   │   ├── Sidebar.tsx           # Navigation sidebar
│   │   │   ├── Header.tsx            # Top header
│   │   │   └── AccountOverview.tsx   # Balances/transactions
│   │   │
│   │   └── layout/
│   │       └── AppLayout.tsx         # Root layout wrapper
│   │
│   ├── lib/
│   │   ├── auth.ts           # Auth context & provider
│   │   ├── wallet.ts         # Wallet connection (wagmi)
│   │   ├── api.ts            # API client
│   │   └── utils.ts          # Helpers
│   │
│   ├── hooks/
│   │   ├── useAuth.ts        # Authentication hook
│   │   ├── useWallet.ts      # Wallet hook
│   │   └── useOnboarding.ts  # Onboarding state
│   │
│   ├── pages/
│   │   ├── LoginPage.tsx     # /login route
│   │   ├── OnboardingPage.tsx # /onboarding route
│   │   └── DashboardPage.tsx  # /dashboard route
│   │
│   ├── types/
│   │   └── index.ts          # TypeScript types
│   │
│   ├── App.tsx               # Root with routing
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles
│
├── public/                   # Static assets
├── components.json           # shadcn/ui config
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript config
├── tailwind.config.js       # Tailwind config
├── package.json             # Dependencies
└── README.md                # Documentation
```

## Authentication System

### Login Screen Design

**Layout:**
- Centered card on light background
- Ripple logo at top
- Two authentication sections:

**1. SSO Authentication:**
```
┌─────────────────────────────────┐
│   [G] Continue with Google      │
└─────────────────────────────────┘
┌─────────────────────────────────┐
│   [M] Continue with Microsoft   │
└─────────────────────────────────┘
```

**2. Wallet Connect:**
```
       ── OR ──
┌─────────────────────────────────┐
│   [🔐] Connect Wallet           │
└─────────────────────────────────┘
```

### Authentication Flow

**SSO Flow (Google/Microsoft):**
1. User clicks "Continue with Google/Microsoft"
2. OAuth redirect to provider
3. Provider callback with auth code
4. Exchange code for JWT token
5. Store token in localStorage + React Context
6. Check if first-time user:
   - Yes → Redirect to `/onboarding`
   - No → Redirect to `/dashboard`

**Wallet Connect Flow:**
1. User clicks "Connect Wallet"
2. Web3Modal opens with wallet options:
   - MetaMask
   - WalletConnect
   - Coinbase Wallet
   - Rainbow Wallet
3. User connects wallet
4. Request signature for verification
5. Backend verifies signature, issues JWT token
6. Store token + wallet address
7. Check if first-time user:
   - Yes → Redirect to `/onboarding`
   - No → Redirect to `/dashboard`

### Auth State Management

**React Context Pattern:**
```typescript
interface AuthContext {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (method: 'google' | 'microsoft' | 'wallet') => Promise<void>;
  logout: () => void;
}
```

**Token Storage:**
- JWT stored in localStorage
- Refresh tokens handled by API client
- Auto-refresh before expiration
- Clear on logout

**Protected Routes:**
- `/login` - Public
- `/onboarding` - Requires auth + first-time flag
- `/dashboard` - Requires auth + completed onboarding

## Onboarding Flow

### Account Setup Screen

**Step 1: Account/Wallet Creation**

**If SSO User:**
- Display: "Let's set up your treasury account"
- Form fields:
  - Account name (text input)
  - Account type (dropdown: Personal, Business)
  - Connect wallet (optional): Button to link crypto wallet
  - Email notification preferences (checkbox)
- Button: "Complete Setup"

**If Wallet-Only User:**
- Display: "Complete your account setup"
- Form fields:
  - Account name (text input)
  - Email for notifications (required)
  - Display name (text input)
- Wallet already connected, show address
- Button: "Complete Setup"

**Validation:**
- Account name: Required, 3-50 characters
- Email: Valid email format if provided
- All fields validated before submission

**Completion:**
- Save account data to backend
- Mark onboarding as complete
- Redirect to `/dashboard`

## Dashboard Design

### Layout Structure

**Ripple Custody Style (from Figma):**

```
┌─────────────────────────────────────────────────────┐
│ [Logo] <Domain> > Dashboard    [?] [🔔] [⚙] [👤]   │
├─────────┬───────────────────────────────────────────┤
│ Home    │                                           │
│ Accounts│   Account Overview                        │
│ Transact│   ┌─────────────┐ ┌─────────────┐        │
│ Settings│   │ USD Account │ │ EUR Account │        │
│         │   │ $10,000.00  │ │ €8,500.00   │        │
│         │   └─────────────┘ └─────────────┘        │
│         │                                           │
│         │   Recent Transactions                     │
│         │   [Transaction table]                     │
└─────────┴───────────────────────────────────────────┘
```

### Header Component

**Elements:**
- **Left**: Ripple logo + "treasury" text
- **Center**: Domain dropdown + breadcrumb navigation
- **Right**:
  - Help icon (?)
  - Notifications bell (🔔) with badge
  - Settings icon (⚙)
  - User avatar/menu (👤)

**Styling:**
- Height: 64px
- Background: White
- Border bottom: 1px solid #E5E7EB
- Padding: 16px 24px

### Sidebar Component

**Navigation Items:**
- Home (🏠)
- Accounts (💳)
- Transactions (↔️)
- Settings (⚙️)

**Active State:**
- Blue background (#EFF6FF)
- Blue text (#0052CC)
- Left border accent

**Styling:**
- Width: 240px
- Background: #F9FAFB
- Border right: 1px solid #E5E7EB

### Account Overview Component

**Balance Cards:**
- Grid layout (2-3 per row)
- Card design:
  - Account name
  - Balance (large, bold)
  - Currency symbol
  - Last updated timestamp
  - View details link

**Recent Transactions Table:**
- Columns:
  - Date
  - Description
  - Amount
  - Status (badge)
  - Action (view details)
- Pagination: 10 items per page
- Sortable columns

## Design System

### Colors (Ripple Custody Theme)

```css
:root {
  /* Primary */
  --primary: #0052CC;
  --primary-hover: #0747A6;

  /* Backgrounds */
  --bg-primary: #FFFFFF;
  --bg-secondary: #F9FAFB;
  --bg-tertiary: #F3F4F6;

  /* Text */
  --text-primary: #111827;
  --text-secondary: #6B7280;
  --text-tertiary: #9CA3AF;

  /* Borders */
  --border-primary: #E5E7EB;
  --border-secondary: #D1D5DB;

  /* Status Colors */
  --success: #10B981;
  --warning: #F59E0B;
  --error: #EF4444;
  --info: #3B82F6;
}
```

### Typography

**Font Family:** Inter, system-ui, sans-serif

**Scales:**
- H1: 32px, bold (page titles)
- H2: 24px, semibold (section headers)
- H3: 20px, semibold (card titles)
- Body: 16px, regular
- Small: 14px, regular
- Caption: 12px, regular

### Component Styling

**Cards:**
- Border radius: 8px
- Border: 1px solid var(--border-primary)
- Padding: 24px
- Shadow: 0 1px 3px rgba(0, 0, 0, 0.1)

**Buttons:**
- Primary: Blue background, white text
- Secondary: White background, border, blue text
- Height: 40px
- Border radius: 6px
- Font weight: 500

**Inputs:**
- Height: 40px
- Border: 1px solid var(--border-primary)
- Border radius: 6px
- Padding: 8px 12px
- Focus: Blue border + ring

## Tech Stack Details

### Dependencies

**Core:**
- `react` ^18.3.0
- `react-dom` ^18.3.0
- `typescript` ^5.5.0
- `vite` ^5.4.0

**Routing:**
- `react-router-dom` ^6.26.0

**UI:**
- `@radix-ui/react-*` (via shadcn/ui)
- `tailwindcss` ^3.4.0
- `lucide-react` (icons)

**Auth:**
- `@tanstack/react-query` ^5.51.0 (API state)
- `wagmi` ^2.12.0 (wallet connections)
- `@web3modal/wagmi` ^5.1.0 (wallet modal)
- `viem` ^2.20.0 (Ethereum interactions)

**OAuth:**
- `@react-oauth/google` ^0.12.0
- Custom Microsoft OAuth implementation

**Form Handling:**
- `react-hook-form` ^7.53.0
- `zod` ^3.23.0 (validation)
- `@hookform/resolvers` ^3.9.0

**Utils:**
- `clsx` (className utility)
- `tailwind-merge` (Tailwind merging)

### Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    host: '0.0.0.0',
  },
})
```

### Environment Variables

```env
# OAuth
VITE_GOOGLE_CLIENT_ID=
VITE_MICROSOFT_CLIENT_ID=

# Wallet Connect
VITE_WALLETCONNECT_PROJECT_ID=

# API
VITE_API_URL=http://localhost:3000
```

## Routing Structure

```typescript
// App.tsx routes
<Routes>
  <Route path="/" element={<Navigate to="/login" />} />
  <Route path="/login" element={<LoginPage />} />

  {/* Protected routes */}
  <Route element={<ProtectedRoute />}>
    <Route path="/onboarding" element={<OnboardingPage />} />
    <Route path="/dashboard" element={<DashboardPage />} />
  </Route>

  {/* Fallback */}
  <Route path="*" element={<Navigate to="/login" />} />
</Routes>
```

**Route Guards:**
- `ProtectedRoute`: Requires authentication
- Onboarding check: Redirect to onboarding if not completed
- Auth check: Redirect to login if not authenticated

## Backend API Requirements

**Endpoints Needed:**

**Authentication:**
- `POST /auth/google` - Exchange Google OAuth code for JWT
- `POST /auth/microsoft` - Exchange Microsoft OAuth code for JWT
- `POST /auth/wallet` - Verify wallet signature, issue JWT
- `POST /auth/refresh` - Refresh JWT token
- `POST /auth/logout` - Invalidate token

**User:**
- `GET /user/me` - Get current user info
- `PATCH /user/profile` - Update user profile
- `GET /user/onboarding-status` - Check if onboarding complete

**Onboarding:**
- `POST /onboarding/account` - Create treasury account
- `POST /onboarding/complete` - Mark onboarding complete

**Accounts:**
- `GET /accounts` - List user's accounts
- `GET /accounts/:id` - Get account details
- `GET /accounts/:id/transactions` - Get transactions

**Future:**
- Transaction creation, approval workflows
- Multi-currency support
- Team/permissions management

## Development Workflow

### Setup Steps

1. **Initialize Project:**
   ```bash
   npm create vite@latest treasury-app -- --template react-ts
   cd treasury-app
   npm install
   ```

2. **Install shadcn/ui:**
   ```bash
   npx shadcn-ui@latest init
   ```

3. **Install Dependencies:**
   ```bash
   npm install react-router-dom wagmi viem @web3modal/wagmi
   npm install @tanstack/react-query react-hook-form zod
   npm install @react-oauth/google
   ```

4. **Setup Tailwind:**
   Already configured by shadcn/ui

5. **Add shadcn Components:**
   ```bash
   npx shadcn-ui@latest add button card input dialog
   npx shadcn-ui@latest add form dropdown-menu avatar badge
   ```

### Development Server

```bash
npm run dev
```

Runs on `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Output in `dist/` directory

## Deployment

### Replit Configuration

**.replit:**
```toml
run = "npm install && npm run dev"
entrypoint = "src/main.tsx"

[nix]
channel = "stable-23_11"

[deployment]
run = ["sh", "-c", "npm install && npm run build && npx serve dist"]
```

**replit.nix:**
```nix
{ pkgs }: {
  deps = [
    pkgs.nodejs-18_x
    pkgs.nodePackages.typescript-language-server
  ];
}
```

### Alternative Deployments

- **Vercel**: Connect GitHub repo, auto-deploy on push
- **Netlify**: Same as Vercel, drag-and-drop or Git integration
- **Cloudflare Pages**: Fast edge deployment

## Testing Strategy

### Manual Testing Checklist

**Login Screen:**
- [ ] SSO buttons render correctly
- [ ] Wallet connect button works
- [ ] OAuth redirects work
- [ ] Wallet modal opens
- [ ] Error states display properly

**Onboarding:**
- [ ] Form validation works
- [ ] Account creation succeeds
- [ ] Wallet linking works (SSO users)
- [ ] Email collection works (wallet users)
- [ ] Redirects to dashboard on completion

**Dashboard:**
- [ ] Layout matches Figma design
- [ ] Sidebar navigation works
- [ ] Account cards display correctly
- [ ] Transactions table loads
- [ ] User menu works
- [ ] Logout works

### Future: Automated Testing

- Unit tests for hooks and utilities
- Component tests with Testing Library
- E2E tests with Playwright
- Wallet connection mocking

## Security Considerations

### Auth Security

- **Token Storage**: HttpOnly cookies (ideal) or secure localStorage
- **CSRF Protection**: Required for OAuth callbacks
- **Signature Verification**: Verify wallet signatures server-side
- **Token Expiration**: 1 hour access tokens, 7 day refresh tokens
- **Logout**: Clear all tokens and localStorage

### Wallet Security

- **Never store private keys**
- **Verify signatures on backend**
- **Use nonces to prevent replay attacks**
- **Display wallet address clearly**
- **Warn users about transaction signing**

### Input Validation

- Validate all form inputs client-side (Zod schemas)
- Re-validate on backend
- Sanitize user input before display
- Use TypeScript for type safety

## Success Criteria

✅ **Authentication:**
- Users can log in with Google
- Users can log in with Microsoft
- Users can connect crypto wallets
- JWT tokens issued and stored correctly
- Protected routes enforce authentication

✅ **Onboarding:**
- First-time users see onboarding flow
- Account creation works
- Wallet linking works (optional for SSO)
- Email collection works (for wallet users)
- Onboarding completion persisted

✅ **Dashboard:**
- Layout matches Ripple Custody design
- Sidebar navigation works
- Account overview displays
- Clean, professional UI
- Responsive design

✅ **Code Quality:**
- TypeScript with strict mode
- Component-based architecture
- Reusable hooks
- Clean separation of concerns
- Follows React best practices

## Next Steps

1. **Write Implementation Plan**: Use writing-plans skill to break down into tasks
2. **Setup Project**: Initialize Vite + React + TypeScript
3. **Install Dependencies**: shadcn/ui, wagmi, react-router
4. **Build Auth System**: Login screen + OAuth + Wallet Connect
5. **Build Onboarding**: Account setup flow
6. **Build Dashboard**: Layout + Account overview
7. **Testing**: Manual testing checklist
8. **Deployment**: Deploy to Replit or Vercel

---

**Design Approved:** 2026-02-18
**Ready for Implementation:** Yes

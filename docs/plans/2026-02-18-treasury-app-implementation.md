# Treasury App Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build treasury application with SSO/Wallet login, onboarding flow, and dashboard matching Ripple Custody design.

**Architecture:** Vite + React + TypeScript with shadcn/ui components, wagmi for wallet connections, OAuth for SSO, React Router for navigation, protected routes with auth context.

**Tech Stack:** Vite, React 18, TypeScript 5, shadcn/ui, wagmi, react-router-dom, tailwindcss

---

## Task 1: Initialize Vite Project

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/App.tsx`

**Step 1: Create Vite project**

```bash
cd /Users/michael/AI-Projects/treasury-app
npm create vite@latest . -- --template react-ts
```

Expected: Vite project initialized with React + TypeScript template

**Step 2: Install dependencies**

```bash
npm install
```

Expected: Dependencies installed successfully

**Step 3: Test dev server**

```bash
npm run dev
```

Expected: Dev server starts on http://localhost:5173

**Step 4: Commit**

```bash
git add .
git commit -m "feat: initialize Vite project with React + TypeScript"
```

---

## Task 2: Install shadcn/ui

**Files:**
- Create: `components.json`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Modify: `tsconfig.json`
- Create: `src/lib/utils.ts`

**Step 1: Initialize shadcn/ui**

```bash
npx shadcn-ui@latest init
```

When prompted:
- Style: Default
- Base color: Slate
- CSS variables: Yes
- TypeScript: Yes
- Path aliases: @/*

Expected: shadcn/ui configured with Tailwind

**Step 2: Verify configuration**

Check that `components.json` exists and `tailwind.config.js` has shadcn theme.

**Step 3: Install core UI components**

```bash
npx shadcn-ui@latest add button card input label form dropdown-menu avatar badge dialog
```

Expected: Components installed in `src/components/ui/`

**Step 4: Commit**

```bash
git add .
git commit -m "feat: setup shadcn/ui with Tailwind CSS"
```

---

## Task 3: Install Additional Dependencies

**Files:**
- Modify: `package.json`

**Step 1: Install routing and state**

```bash
npm install react-router-dom @tanstack/react-query
```

**Step 2: Install wallet libraries**

```bash
npm install wagmi viem @web3modal/wagmi
```

**Step 3: Install OAuth libraries**

```bash
npm install @react-oauth/google
```

**Step 4: Install form handling**

```bash
npm install react-hook-form zod @hookform/resolvers
```

**Step 5: Install icons**

```bash
npm install lucide-react
```

**Step 6: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: install dependencies (routing, wallet, OAuth, forms)"
```

---

## Task 4: Configure Vite with Path Aliases

**Files:**
- Modify: `vite.config.ts`

**Step 1: Update vite.config.ts**

```typescript
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

**Step 2: Verify server starts**

```bash
npm run dev
```

Expected: Dev server starts successfully

**Step 3: Commit**

```bash
git add vite.config.ts
git commit -m "feat: configure Vite with path aliases and server settings"
```

---

## Task 5: Setup Project Structure

**Files:**
- Create: `src/components/auth/.gitkeep`
- Create: `src/components/onboarding/.gitkeep`
- Create: `src/components/dashboard/.gitkeep`
- Create: `src/components/layout/.gitkeep`
- Create: `src/lib/auth.ts` (stub)
- Create: `src/lib/wallet.ts` (stub)
- Create: `src/lib/api.ts` (stub)
- Create: `src/hooks/.gitkeep`
- Create: `src/pages/.gitkeep`
- Create: `src/types/index.ts` (stub)

**Step 1: Create directory structure**

```bash
mkdir -p src/components/auth src/components/onboarding src/components/dashboard src/components/layout src/lib src/hooks src/pages src/types
touch src/components/auth/.gitkeep src/components/onboarding/.gitkeep src/components/dashboard/.gitkeep src/components/layout/.gitkeep src/hooks/.gitkeep src/pages/.gitkeep
```

**Step 2: Create type definitions file**

```typescript
// src/types/index.ts
export interface User {
  id: string;
  email?: string;
  walletAddress?: string;
  displayName?: string;
  isOnboarded: boolean;
}

export type AuthMethod = 'google' | 'microsoft' | 'wallet';
```

**Step 3: Commit**

```bash
git add src/
git commit -m "feat: setup project directory structure and base types"
```

---

## Task 6: Create Auth Context

**Files:**
- Create: `src/lib/auth.tsx`

**Step 1: Create AuthContext**

```typescript
// src/lib/auth.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthMethod } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (method: AuthMethod) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored token on mount
    const token = localStorage.getItem('auth_token');
    if (token) {
      // TODO: Verify token and fetch user
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (method: AuthMethod) => {
    // TODO: Implement actual login
    console.log('Login with:', method);
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
```

**Step 2: Commit**

```bash
git add src/lib/auth.tsx
git commit -m "feat: create auth context and provider"
```

---

## Task 7: Setup React Router

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/main.tsx`
- Create: `src/pages/LoginPage.tsx`
- Create: `src/pages/OnboardingPage.tsx`
- Create: `src/pages/DashboardPage.tsx`

**Step 1: Create placeholder pages**

```typescript
// src/pages/LoginPage.tsx
export default function LoginPage() {
  return <div className="min-h-screen flex items-center justify-center">Login Page</div>;
}
```

```typescript
// src/pages/OnboardingPage.tsx
export default function OnboardingPage() {
  return <div className="min-h-screen flex items-center justify-center">Onboarding Page</div>;
}
```

```typescript
// src/pages/DashboardPage.tsx
export default function DashboardPage() {
  return <div className="min-h-screen flex items-center justify-center">Dashboard Page</div>;
}
```

**Step 2: Setup routing in App.tsx**

```typescript
// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '@/pages/LoginPage';
import OnboardingPage from '@/pages/OnboardingPage';
import DashboardPage from '@/pages/DashboardPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

**Step 3: Wrap with AuthProvider in main.tsx**

```typescript
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { AuthProvider } from '@/lib/auth';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
);
```

**Step 4: Test navigation**

```bash
npm run dev
```

Navigate to http://localhost:5173/login, /onboarding, /dashboard and verify all pages load.

**Step 5: Commit**

```bash
git add src/App.tsx src/main.tsx src/pages/
git commit -m "feat: setup React Router with placeholder pages"
```

---

## Task 8: Create Login Screen UI

**Files:**
- Create: `src/components/auth/LoginScreen.tsx`
- Modify: `src/pages/LoginPage.tsx`

**Step 1: Create LoginScreen component**

```typescript
// src/components/auth/LoginScreen.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';

export default function LoginScreen() {
  const { login } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="text-2xl font-bold text-blue-600">ripple treasury</div>
          </div>
          <CardTitle className="text-2xl">Sign in to your account</CardTitle>
          <CardDescription>
            Choose your preferred authentication method
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* SSO Buttons */}
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => login('google')}
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => login('microsoft')}
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path fill="#f35325" d="M1 1h10v10H1z" />
                <path fill="#81bc06" d="M13 1h10v10H13z" />
                <path fill="#05a6f0" d="M1 13h10v10H1z" />
                <path fill="#ffba08" d="M13 13h10v10H13z" />
              </svg>
              Continue with Microsoft
            </Button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          {/* Wallet Connect */}
          <Button
            className="w-full"
            onClick={() => login('wallet')}
          >
            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Connect Wallet
          </Button>

          {/* Footer */}
          <div className="text-center text-xs text-muted-foreground">
            <p>By continuing, you agree to our Terms of Service and Privacy Policy.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
```

**Step 2: Use LoginScreen in LoginPage**

```typescript
// src/pages/LoginPage.tsx
import LoginScreen from '@/components/auth/LoginScreen';

export default function LoginPage() {
  return <LoginScreen />;
}
```

**Step 3: Test login screen UI**

```bash
npm run dev
```

Navigate to http://localhost:5173/login and verify the UI looks correct.

**Step 4: Commit**

```bash
git add src/components/auth/LoginScreen.tsx src/pages/LoginPage.tsx
git commit -m "feat: create login screen UI with SSO and wallet options"
```

---

## Task 9: Setup Wallet Connect (wagmi)

**Files:**
- Create: `src/lib/wallet.tsx`
- Modify: `src/main.tsx`

**Step 1: Create wallet configuration**

```typescript
// src/lib/wallet.tsx
import { createConfig, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { createWeb3Modal } from '@web3modal/wagmi/react';

// Get WalletConnect project ID from environment
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'demo-project-id';

// Configure wagmi
export const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
});

// Create Web3Modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: false,
});
```

**Step 2: Wrap app with WagmiProvider**

```typescript
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { WagmiProvider } from 'wagmi';
import App from './App.tsx';
import { AuthProvider } from '@/lib/auth';
import { config } from '@/lib/wallet';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </WagmiProvider>
  </React.StrictMode>,
);
```

**Step 3: Create environment file**

```bash
cat > .env <<EOF
VITE_WALLETCONNECT_PROJECT_ID=demo-project-id
EOF
```

**Step 4: Add .env to .gitignore**

```bash
echo ".env" >> .gitignore
```

**Step 5: Commit**

```bash
git add src/lib/wallet.tsx src/main.tsx .gitignore
git commit -m "feat: setup wagmi and Web3Modal for wallet connections"
```

---

## Task 10: Implement Wallet Connect Button

**Files:**
- Modify: `src/components/auth/LoginScreen.tsx`

**Step 1: Add Web3Modal button**

```typescript
// src/components/auth/LoginScreen.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount } from 'wagmi';
import { useEffect } from 'react';

export default function LoginScreen() {
  const { login } = useAuth();
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();

  // Auto-login when wallet is connected
  useEffect(() => {
    if (isConnected && address) {
      login('wallet');
    }
  }, [isConnected, address, login]);

  const handleWalletConnect = () => {
    open();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="text-2xl font-bold text-blue-600">ripple treasury</div>
          </div>
          <CardTitle className="text-2xl">Sign in to your account</CardTitle>
          <CardDescription>
            Choose your preferred authentication method
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* SSO Buttons */}
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => login('google')}
            >
              {/* Google icon */}
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => login('microsoft')}
            >
              {/* Microsoft icon */}
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path fill="#f35325" d="M1 1h10v10H1z" />
                <path fill="#81bc06" d="M13 1h10v10H13z" />
                <path fill="#05a6f0" d="M1 13h10v10H1z" />
                <path fill="#ffba08" d="M13 13h10v10H13z" />
              </svg>
              Continue with Microsoft
            </Button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          {/* Wallet Connect */}
          <Button
            className="w-full"
            onClick={handleWalletConnect}
          >
            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            {isConnected ? `Connected: ${address?.slice(0, 6)}...${address?.slice(-4)}` : 'Connect Wallet'}
          </Button>

          {/* Footer */}
          <div className="text-center text-xs text-muted-foreground">
            <p>By continuing, you agree to our Terms of Service and Privacy Policy.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
```

**Step 2: Test wallet connection**

```bash
npm run dev
```

Click "Connect Wallet" button and verify Web3Modal opens.

**Step 3: Commit**

```bash
git add src/components/auth/LoginScreen.tsx
git commit -m "feat: integrate Web3Modal wallet connect button"
```

---

## Task 11: Create Protected Route Component

**Files:**
- Create: `src/components/layout/ProtectedRoute.tsx`
- Modify: `src/App.tsx`

**Step 1: Create ProtectedRoute component**

```typescript
// src/components/layout/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/lib/auth';

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
```

**Step 2: Use ProtectedRoute in App.tsx**

```typescript
// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '@/pages/LoginPage';
import OnboardingPage from '@/pages/OnboardingPage';
import DashboardPage from '@/pages/DashboardPage';
import ProtectedRoute from '@/components/layout/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

**Step 3: Test protected routes**

Navigate to `/dashboard` when not logged in - should redirect to `/login`.

**Step 4: Commit**

```bash
git add src/components/layout/ProtectedRoute.tsx src/App.tsx
git commit -m "feat: add protected route component with auth guard"
```

---

## Task 12: Implement Mock Login Flow

**Files:**
- Modify: `src/lib/auth.tsx`

**Step 1: Update login function with mock implementation**

```typescript
// src/lib/auth.tsx (update login function only)
const login = async (method: AuthMethod) => {
  setIsLoading(true);

  try {
    // Mock authentication - replace with real API calls
    const mockUser: User = {
      id: 'user-123',
      email: method === 'wallet' ? undefined : `user@${method}.com`,
      walletAddress: method === 'wallet' ? '0x1234...5678' : undefined,
      displayName: `${method} User`,
      isOnboarded: false, // Always false for new users
    };

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Store mock token
    localStorage.setItem('auth_token', 'mock-jwt-token');

    // Set user
    setUser(mockUser);

    // Redirect based on onboarding status
    // This will be handled by the calling component
  } catch (error) {
    console.error('Login failed:', error);
  } finally {
    setIsLoading(false);
  }
};
```

**Step 2: Add navigation after login**

```typescript
// src/components/auth/LoginScreen.tsx (update useEffect)
import { useNavigate } from 'react-router-dom';

export default function LoginScreen() {
  const { login, isAuthenticated, user } = useAuth();
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const navigate = useNavigate();

  // Redirect when authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      if (!user.isOnboarded) {
        navigate('/onboarding');
      } else {
        navigate('/dashboard');
      }
    }
  }, [isAuthenticated, user, navigate]);

  // Rest of component...
}
```

**Step 3: Test mock login**

Click any login button - should show loading, then redirect to onboarding.

**Step 4: Commit**

```bash
git add src/lib/auth.tsx src/components/auth/LoginScreen.tsx
git commit -m "feat: implement mock login flow with navigation"
```

---

## Task 13: Create Onboarding Screen

**Files:**
- Create: `src/components/onboarding/AccountSetup.tsx`
- Modify: `src/pages/OnboardingPage.tsx`

**Step 1: Create AccountSetup component**

```typescript
// src/components/onboarding/AccountSetup.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AccountSetup() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [accountName, setAccountName] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // TODO: Call API to create account and mark onboarding complete
      console.log('Account created:', { accountName, email });

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Onboarding failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Set up your treasury account</CardTitle>
          <CardDescription>
            Complete your account setup to start managing your treasury
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="accountName">Account Name</Label>
              <Input
                id="accountName"
                placeholder="My Treasury Account"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                required
                minLength={3}
              />
            </div>

            {user?.walletAddress && !user?.email && (
              <div className="space-y-2">
                <Label htmlFor="email">Email for Notifications</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            )}

            {user?.walletAddress && (
              <div className="rounded-lg border p-3 bg-blue-50">
                <div className="text-sm font-medium">Connected Wallet</div>
                <div className="text-xs text-muted-foreground font-mono mt-1">
                  {user.walletAddress}
                </div>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Setting up...' : 'Complete Setup'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
```

**Step 2: Use AccountSetup in OnboardingPage**

```typescript
// src/pages/OnboardingPage.tsx
import AccountSetup from '@/components/onboarding/AccountSetup';

export default function OnboardingPage() {
  return <AccountSetup />;
}
```

**Step 3: Test onboarding flow**

Login → should redirect to onboarding → fill form → submit → should redirect to dashboard

**Step 4: Commit**

```bash
git add src/components/onboarding/AccountSetup.tsx src/pages/OnboardingPage.tsx
git commit -m "feat: create onboarding account setup screen"
```

---

## Task 14: Create Dashboard Layout Components

**Files:**
- Create: `src/components/dashboard/Header.tsx`
- Create: `src/components/dashboard/Sidebar.tsx`
- Create: `src/components/layout/AppLayout.tsx`

**Step 1: Create Header component**

```typescript
// src/components/dashboard/Header.tsx
import { Bell, HelpCircle, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/lib/auth';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div className="text-xl font-bold text-blue-600">ripple treasury</div>
        <div className="text-sm text-muted-foreground">
          <span className="text-foreground">Dashboard</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <HelpCircle className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem disabled>
              {user?.displayName || 'User'}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
```

**Step 2: Create Sidebar component**

```typescript
// src/components/dashboard/Sidebar.tsx
import { Home, CreditCard, ArrowLeftRight, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Home', href: '/dashboard' },
  { icon: CreditCard, label: 'Accounts', href: '/dashboard/accounts' },
  { icon: ArrowLeftRight, label: 'Transactions', href: '/dashboard/transactions' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

export default function Sidebar() {
  const currentPath = window.location.pathname;

  return (
    <aside className="w-60 border-r bg-gray-50 p-4">
      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.href;

          return (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-100'
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
```

**Step 3: Create AppLayout wrapper**

```typescript
// src/components/layout/AppLayout.tsx
import { ReactNode } from 'react';
import Header from '@/components/dashboard/Header';
import Sidebar from '@/components/dashboard/Sidebar';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-white">
          {children}
        </main>
      </div>
    </div>
  );
}
```

**Step 4: Commit**

```bash
git add src/components/dashboard/ src/components/layout/AppLayout.tsx
git commit -m "feat: create dashboard layout with header and sidebar"
```

---

## Task 15: Create Dashboard Content

**Files:**
- Create: `src/components/dashboard/AccountOverview.tsx`
- Modify: `src/pages/DashboardPage.tsx`

**Step 1: Create AccountOverview component**

```typescript
// src/components/dashboard/AccountOverview.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const mockAccounts = [
  { id: '1', name: 'USD Account', balance: 10000, currency: 'USD' },
  { id: '2', name: 'EUR Account', balance: 8500, currency: 'EUR' },
];

const mockTransactions = [
  { id: '1', date: '2026-02-18', description: 'Payment received', amount: 5000, status: 'completed' },
  { id: '2', date: '2026-02-17', description: 'Wire transfer', amount: -2500, status: 'completed' },
  { id: '3', date: '2026-02-16', description: 'Payment sent', amount: -1500, status: 'pending' },
];

export default function AccountOverview() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Account Overview</h1>
        <p className="text-sm text-muted-foreground">Manage your treasury accounts and transactions</p>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockAccounts.map((account) => (
          <Card key={account.id}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {account.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: account.currency,
                }).format(account.balance)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Last updated: Today, 10:30 AM
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockTransactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="space-y-1">
                  <div className="font-medium">{tx.description}</div>
                  <div className="text-xs text-muted-foreground">{tx.date}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className={tx.amount > 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                    {tx.amount > 0 ? '+' : ''}{new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(tx.amount)}
                  </div>
                  <Badge variant={tx.status === 'completed' ? 'default' : 'secondary'}>
                    {tx.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
```

**Step 2: Use AppLayout and AccountOverview in DashboardPage**

```typescript
// src/pages/DashboardPage.tsx
import AppLayout from '@/components/layout/AppLayout';
import AccountOverview from '@/components/dashboard/AccountOverview';

export default function DashboardPage() {
  return (
    <AppLayout>
      <AccountOverview />
    </AppLayout>
  );
}
```

**Step 3: Test dashboard**

Login → complete onboarding → should see dashboard with accounts and transactions

**Step 4: Commit**

```bash
git add src/components/dashboard/AccountOverview.tsx src/pages/DashboardPage.tsx
git commit -m "feat: create dashboard account overview with mock data"
```

---

## Task 16: Setup Replit Configuration

**Files:**
- Create: `.replit`
- Create: `replit.nix`
- Modify: `.gitignore`

**Step 1: Create .replit file**

```toml
run = "npm install && npm run dev"
entrypoint = "src/main.tsx"
hidden = [".config", "package-lock.json", "node_modules"]

[nix]
channel = "stable-23_11"

[env]
PATH = "/home/runner/$REPL_SLUG/.config/npm/node_global/bin:/home/runner/$REPL_SLUG/node_modules/.bin"

[packager]
language = "nodejs"

[packager.features]
packageSearch = true
guessImports = true

[deployment]
run = ["sh", "-c", "npm install && npm run build && npx serve dist"]
deploymentTarget = "cloudrun"
```

**Step 2: Create replit.nix**

```nix
{ pkgs }: {
  deps = [
    pkgs.nodejs-18_x
    pkgs.nodePackages.typescript-language-server
  ];
}
```

**Step 3: Update .gitignore**

```bash
cat >> .gitignore <<EOF

# Replit
.replit
replit.nix
EOF
```

**Step 4: Commit**

```bash
git add .replit replit.nix .gitignore
git commit -m "feat: add Replit configuration for deployment"
```

---

## Task 17: Update README

**Files:**
- Create: `README.md`

**Step 1: Create comprehensive README**

```markdown
# Treasury App

A modern treasury management application with Web3 wallet and SSO authentication.

## Features

- 🔐 **Multiple Auth Methods**: Google, Microsoft SSO + Web3 Wallet Connect
- 🚀 **Modern Stack**: Vite + React + TypeScript + shadcn/ui
- 💼 **Treasury Management**: Account overview, transaction tracking
- 🎨 **Ripple Custody Design**: Professional, clean UI
- 📱 **Responsive**: Works on all devices

## Tech Stack

- **Framework**: Vite + React 18
- **Language**: TypeScript 5
- **UI Library**: shadcn/ui (Radix UI + Tailwind CSS)
- **Wallet**: wagmi + Web3Modal
- **Routing**: React Router v6
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

\`\`\`bash
npm install
\`\`\`

### Development

\`\`\`bash
npm run dev
\`\`\`

Open http://localhost:5173

### Build

\`\`\`bash
npm run build
\`\`\`

Output in \`dist/\` directory

## Project Structure

\`\`\`
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── auth/            # Authentication components
│   ├── onboarding/      # Onboarding flow
│   ├── dashboard/       # Dashboard components
│   └── layout/          # Layout wrappers
├── lib/                 # Utilities and config
├── hooks/               # Custom React hooks
├── pages/               # Page components
├── types/               # TypeScript types
└── App.tsx              # Root component
\`\`\`

## Authentication

### SSO
- Google OAuth
- Microsoft OAuth

### Wallet Connect
- MetaMask
- WalletConnect
- Coinbase Wallet
- Rainbow Wallet

## Deployment

### Replit

1. Import repository to Replit
2. Click "Run"
3. App runs on Replit webview

### Vercel/Netlify

1. Connect Git repository
2. Auto-deploys on push
3. Configure environment variables

## Environment Variables

\`\`\`env
VITE_WALLETCONNECT_PROJECT_ID=your-project-id
VITE_GOOGLE_CLIENT_ID=your-client-id
VITE_MICROSOFT_CLIENT_ID=your-client-id
VITE_API_URL=http://localhost:3000
\`\`\`

## License

MIT
\`\`\`

**Step 2: Commit**

```bash
git add README.md
git commit -m "docs: add comprehensive README"
```

---

## Task 18: Final Testing & Polish

**Step 1: Test full user flow**

1. Navigate to http://localhost:5173
2. Should redirect to /login
3. Click "Connect Wallet" → Web3Modal opens
4. Click "Continue with Google" → mock login
5. Should redirect to /onboarding
6. Fill form → submit
7. Should redirect to /dashboard
8. Verify dashboard layout matches Figma
9. Click logout → should redirect to /login

**Step 2: Test edge cases**

- Try accessing /dashboard when not logged in → should redirect to /login
- Try accessing /onboarding after completing → should work (or redirect to dashboard)
- Refresh page while logged in → should stay logged in
- Logout → clear token → redirect to login

**Step 3: Visual polish**

- Verify all colors match design system
- Check responsive layout on mobile
- Verify all icons display correctly
- Check loading states

**Step 4: Final commit**

```bash
git add -A
git commit -m "polish: final testing and refinements"
```

---

## Success Criteria

✅ **Authentication**
- [ ] Login screen displays with SSO + Wallet options
- [ ] Google/Microsoft buttons trigger mock login
- [ ] Wallet Connect opens Web3Modal
- [ ] Login redirects to onboarding for new users

✅ **Onboarding**
- [ ] Onboarding form displays correctly
- [ ] Form validation works
- [ ] Submit creates account (mock)
- [ ] Redirects to dashboard on completion

✅ **Dashboard**
- [ ] Dashboard layout matches Ripple Custody design
- [ ] Header shows logo, breadcrumbs, user menu
- [ ] Sidebar navigation displays
- [ ] Account cards show mock balances
- [ ] Transactions table displays

✅ **Code Quality**
- [ ] TypeScript strict mode enabled
- [ ] No console errors
- [ ] Clean component structure
- [ ] Proper use of hooks

✅ **Deployment**
- [ ] Runs on Replit
- [ ] Production build works
- [ ] Environment variables configured

---

## Plan Complete!

This plan creates a fully functional treasury app with:
- Modern authentication (SSO + Wallet Connect)
- Professional onboarding flow
- Ripple Custody styled dashboard
- Production-ready code structure

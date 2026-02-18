import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
import App from './App.tsx'
import { AuthProvider } from '@/lib/auth'
import { config } from '@/lib/wallet'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </WagmiProvider>
  </StrictMode>,
)

export interface User {
  id: string;
  email?: string;
  walletAddress?: string;
  displayName?: string;
  isOnboarded: boolean;
}

export type AuthMethod = 'google' | 'microsoft' | 'wallet';

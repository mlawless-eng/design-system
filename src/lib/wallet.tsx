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

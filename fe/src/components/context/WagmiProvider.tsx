'use client';

/* eslint-disable */
import React, { useEffect, useState } from "react";
import { http, useAccount, useConnect, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider, getDefaultConfig, lightTheme, } from "@rainbow-me/rainbowkit";
import { celo, celoSepolia } from "wagmi/chains";
import { createPublicClient } from "viem";
import DataProvider from "./DataProvider";
import { APP_DESCRIPTION, APP_ICON_URL, APP_URL } from "@/lib/constants";

// Your walletconnect project Id
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;
// const alchemy_celo_api = process.env.NEXT_PUBLIC_ALCHEMY_CELO_MAINNET_API as string;
// const alchemy_celosepolia_api = process.env.NEXT_PUBLIC_ALCHEMY_CELO_SEPOLIA_API as string;

if (!projectId) throw new Error('Project ID is undefined');

// Custom hook for Coinbase Wallet detection and auto-connection
function useCoinbaseWalletAutoConnect() {
  const [isCoinbaseWallet, setIsCoinbaseWallet] = useState(false);
  const { connect, connectors } = useConnect();
  const { isConnected } = useAccount();

  useEffect(() => {
    // Check if we're running in Coinbase Wallet
    const checkCoinbaseWallet = () => {
      const isInCoinbaseWallet = window.ethereum?.isCoinbaseWallet || 
        window.ethereum?.isCoinbaseWalletExtension ||
        window.ethereum?.isCoinbaseWalletBrowser;
      setIsCoinbaseWallet(!!isInCoinbaseWallet);
    };
    
    checkCoinbaseWallet();
    window.addEventListener('ethereum#initialized', checkCoinbaseWallet);
    
    return () => {
      window.removeEventListener('ethereum#initialized', checkCoinbaseWallet);
    };
  }, []);

  useEffect(() => {
    // Auto-connect if in Coinbase Wallet and not already connected
    if (isCoinbaseWallet && !isConnected) {
      connect({ connector: connectors[1] }); // Coinbase Wallet connector
    }
  }, [isCoinbaseWallet, isConnected, connect, connectors]);

  return isCoinbaseWallet;
}

// Wrapper component that provides Coinbase Wallet auto-connection
function CoinbaseWalletAutoConnect({ children }: { children: React.ReactNode }) {
  useCoinbaseWalletAutoConnect();
  return <>{children}</>;
}

// Create a single QueryClient instance outside the component
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      refetchOnWindowFocus: false, // Disable refetch on window focus for better performance
      retry: 1, // Reduce retry attempts
    },
    mutations: {
      retry: 1, // Reduce mutation retry attempts
    },
  },
});

// Create config outside component to prevent multiple initializations
const config = getDefaultConfig({
  appName: 'RandoBet',
  projectId,
  appIcon: '/logo.png',
  appDescription: APP_DESCRIPTION,
  appUrl: APP_URL,
  chains: [celoSepolia, celo],
  ssr: true,
  multiInjectedProviderDiscovery: true,
  pollingInterval: 10_000,
  syncConnectedChain: true,
  transports: {
    [celoSepolia.id]: http(),
    [celo.id]: http(),
  },
});

// Create theme outside component to prevent recreation
const theme = lightTheme(
  {
    ...lightTheme.accentColors.purple,
    accentColorForeground: '#0f1113',
    borderRadius: 'large',
    fontStack: 'system',
    overlayBlur: 'small',
    accentColor: '#fff'
  }
);

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider 
          coolMode={true}
          modalSize="compact" 
          theme={theme} 
          initialChain={celoSepolia.id} 
          showRecentTransactions={true}
          appInfo={{
            appName: "RandoBet",
            learnMoreUrl: ''
          }}
        >
          <CoinbaseWalletAutoConnect>
            <DataProvider>
              <main>
                { children }
              </main>
            </DataProvider>
          </CoinbaseWalletAutoConnect>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

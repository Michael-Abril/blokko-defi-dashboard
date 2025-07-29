import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// import { MetricsProvider } from './context/MetricsContext';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './theme';
import ErrorBoundary from './components/ErrorBoundary';

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const config = getDefaultConfig({
  appName: 'Blokko DeFi Dashboard',
  projectId: 'demo',
  chains: [mainnet, polygon, optimism, arbitrum],
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <ChakraProvider theme={theme}>
              {/* <MetricsProvider> */}
                <App />
              {/* </MetricsProvider> */}
            </ChakraProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

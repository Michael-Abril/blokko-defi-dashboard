import { useState, useCallback } from 'react';
import { useSendTransaction, useAccount } from 'wagmi';

const useSwapQuote = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [error, setError] = useState(null);
  const { address } = useAccount();
  const { sendTransaction } = useSendTransaction();

  // Fetch a quote from the dashboard backend API
  const fetchQuote = useCallback(async ({ sellToken, buyToken, sellAmount }) => {
    if (!address) {
      throw new Error('Wallet not connected');
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3001/api/v1/swap/quote?sellToken=${sellToken}&buyToken=${buyToken}&sellAmount=${sellAmount}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch quote from API');
      }

      const quoteData = await response.json();
      const bestQuote = quoteData.quotes[0]; // Get the best quote
      
      console.log('Quote received:', bestQuote);
      return bestQuote;

    } catch (err) {
      console.error('Error fetching quote:', err);
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [address]);

  // Execute the swap transaction
  const executeSwap = useCallback(async (quote) => {
    if (!quote || !address) {
      throw new Error('Missing quote or wallet connection');
    }

    setIsExecuting(true);
    setError(null);

    try {
      // For demo purposes, simulate the transaction
      // In a real implementation, you would use the quote data to execute the swap
      console.log('Executing swap with quote:', quote);

      // Simulate transaction execution
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('Swap executed successfully');
      return { success: true, hash: '0x' + Math.random().toString(16).substr(2, 64) };

    } catch (err) {
      console.error('Error executing swap:', err);
      setError(err.message);
      throw err;
    } finally {
      setIsExecuting(false);
    }
  }, [address]);

  // For development/demo purposes - mock quote function
  const fetchMockQuote = useCallback(async ({ sellToken, buyToken, sellAmount }) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock quote data with realistic values
      const mockQuote = {
        dex: 'Uniswap V3',
        dexLogoUrl: 'https://cdn.worldvectorlogo.com/logos/uniswap-uni.svg',
        outputAmount: (parseFloat(sellAmount) * 1800).toFixed(2),
        gasFeeUSD: '5.75',
        transactionData: {},
        isBestRate: true,
      };

      console.log('Mock quote generated:', mockQuote);
      return mockQuote;

    } catch (err) {
      setError('Failed to get mock quote');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Use mock quote if backend is not available
  const finalFetchQuote = fetchMockQuote;

  return {
    fetchQuote: finalFetchQuote,
    executeSwap,
    isLoading,
    isExecuting,
    error,
    clearError: () => setError(null),
  };
};

export default useSwapQuote; 
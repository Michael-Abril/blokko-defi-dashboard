import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const MetricsContext = createContext();

// Fallback data when backend is not available
const fallbackData = {
  tvl: {
    "Ethereum": {
      "Aave": 4500000000,
      "Curve": 6000000000
    },
    "Arbitrum": {
      "GMX": 800000000,
      "Uniswap": 500000000
    }
  },
  protocolMetrics: {
    "Aave": {
      "apy": 5.1,
      "users": 12000,
      "volume24h": 25000000,
      "fees24h": 150000
    },
    "Curve": {
      "apy": 7.2,
      "users": 9000,
      "volume24h": 30000000,
      "fees24h": 220000
    },
    "GMX": {
      "apy": 12.5,
      "users": 4000,
      "volume24h": 12000000,
      "fees24h": 80000
    }
  },
  risk: {
    "Aave": {
      "riskScore": 20,
      "flagged": false
    },
    "Curve": {
      "riskScore": 35,
      "flagged": false
    },
    "GMX": {
      "riskScore": 60,
      "flagged": true
    }
  }
};

export const MetricsProvider = ({ children }) => {
  const [tvl, setTvl] = useState(fallbackData.tvl);
  const [protocolMetrics, setProtocolMetrics] = useState(fallbackData.protocolMetrics);
  const [risk, setRisk] = useState(fallbackData.risk);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAll = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const [t, p, r] = await Promise.all([
        axios.get('http://localhost:3001/api/v1/metrics/tvl'),
        axios.get('http://localhost:3001/api/v1/metrics/protocol'),
        axios.get('http://localhost:3001/api/v1/metrics/risk'),
      ]);
      
      setTvl(t.data);
      setProtocolMetrics(p.data);
      setRisk(r.data);
    } catch (e) {
      console.warn('Backend not available, using fallback data:', e.message);
      setError('Backend connection failed, using cached data');
      // Keep using fallback data
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
    const id = setInterval(fetchAll, 300000); // 5 minutes
    return () => clearInterval(id);
  }, []);

  return (
    <MetricsContext.Provider value={{ 
      tvl, 
      protocolMetrics, 
      risk, 
      isLoading, 
      error 
    }}>
      {children}
    </MetricsContext.Provider>
  );
};

export const useMetrics = () => useContext(MetricsContext);
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const MetricsContext = createContext();

export const MetricsProvider = ({ children }) => {
  const [tvl, setTvl] = useState({});
  const [protocolMetrics, setProtocolMetrics] = useState({});
  const [risk, setRisk] = useState({});

  const fetchAll = async () => {
    try {
      const [t, p, r] = await Promise.all([
        axios.get('http://localhost:3001/api/v1/metrics/tvl'),
        axios.get('http://localhost:3001/api/v1/metrics/protocol'),
        axios.get('http://localhost:3001/api/v1/metrics/risk'),
      ]);
      setTvl(t.data); setProtocolMetrics(p.data); setRisk(r.data);
    } catch (e) { console.error('Metrics fetch error', e); }
  };

  useEffect(()=>{ fetchAll(); const id = setInterval(fetchAll, 300000); return ()=>clearInterval(id); }, []);

  return <MetricsContext.Provider value={{ tvl, protocolMetrics, risk }}>{children}</MetricsContext.Provider>;
};

export const useMetrics = () => useContext(MetricsContext);
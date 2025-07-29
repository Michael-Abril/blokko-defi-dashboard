import { Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Activity from './pages/Activity';
import Allocation from './pages/Allocation';
import Bridge from './pages/Bridge';
import Swap from './pages/Swap';
import Discovery from './pages/Discovery';
import AIAccountant from './pages/AIAccountant';
import AIAgents from './pages/AIAgents';
import TaxCenter from './pages/TaxCenter';
import Academy from './pages/Academy';
import Holdings from './pages/Holdings';
import Transactions from './pages/Transactions';
// import AIAgentOverlay from './components/AI/AIAgentOverlay';

function App() {
  return (
    <Box bg="gray.50" color="gray.800" minH="100vh">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="activity" element={<Activity />} />
            <Route path="allocation" element={<Allocation />} />
            <Route path="bridge" element={<Bridge />} />
            <Route path="swap" element={<Swap />} />
            <Route path="discovery" element={<Discovery />} />
            <Route path="ai-accountant" element={<AIAccountant />} />
            <Route path="ai-agents" element={<AIAgents />} />
            <Route path="tax-center" element={<TaxCenter />} />
            <Route path="academy" element={<Academy />} />
            <Route path="holdings" element={<Holdings />} />
            <Route path="transactions" element={<Transactions />} />
          </Route>
        </Routes>

        {/* Global AI Agent Overlay - Temporarily disabled to avoid routing issues */}
        {/* <AIAgentOverlay /> */}
      </Router>
    </Box>
  );
}

export default App;
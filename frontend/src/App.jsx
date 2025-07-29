import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Holdings from './pages/Holdings';
import Swap from './pages/Swap';
import Bridge from './pages/Bridge';
import Transactions from './pages/Transactions';
import AIAccountant from './pages/AIAccountant';
import TaxCenter from './pages/TaxCenter';
import AIAgents from './pages/AIAgents';
import Academy from './pages/Academy';
import Activity from './pages/Activity';
import Allocation from './pages/Allocation';
import Discovery from './pages/Discovery';
import AIAgentOverlay from './components/AI/AIAgentOverlay';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/holdings" element={<Holdings />} />
          <Route path="/swap" element={<Swap />} />
          <Route path="/bridge" element={<Bridge />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/ai-accountant" element={<AIAccountant />} />
          <Route path="/tax-center" element={<TaxCenter />} />
          <Route path="/ai-agents" element={<AIAgents />} />
          <Route path="/academy" element={<Academy />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/allocation" element={<Allocation />} />
          <Route path="/discovery" element={<Discovery />} />
        </Routes>
      </Layout>
      <AIAgentOverlay />
    </Router>
  );
}

export default App;
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

function App() {
  return (
    <Box bg="brand.background" color="brand.text" minH="100vh">
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
          </Route>
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
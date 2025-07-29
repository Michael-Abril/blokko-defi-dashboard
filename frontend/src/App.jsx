import { Box } from '@chakra-ui/react';
import Dashboard from './pages/Dashboard';
import AIAgentOverlay from './components/AI/AIAgentOverlay';

function App() {
  return (
    <Box bg="gray.50" color="gray.800" minH="100vh">
      {/* Test message to verify deployment */}
      <Box 
        position="fixed" 
        top="10px" 
        right="10px" 
        bg="red.500" 
        color="white" 
        p={2} 
        borderRadius="md" 
        zIndex={9999}
        fontSize="sm"
      >
        DEPLOYMENT TEST - {new Date().toLocaleTimeString()}
      </Box>
      
      {/* Render Dashboard directly without routing */}
      <Dashboard />
      
      {/* Global AI Agent Overlay */}
      <AIAgentOverlay />
    </Box>
  );
}

export default App;
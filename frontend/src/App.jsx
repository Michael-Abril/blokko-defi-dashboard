import { Box, Text, VStack } from '@chakra-ui/react';

function App() {
  return (
    <Box bg="gray.50" color="gray.800" minH="100vh" p={8}>
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
      
      {/* Simple test content */}
      <VStack spacing={6} align="center" justify="center" minH="80vh">
        <Text fontSize="4xl" fontWeight="bold" color="blue.600">
          🚀 Blokko DeFi Dashboard
        </Text>
        <Text fontSize="xl" color="green.600" fontWeight="semibold">
          ✅ React App is Loading Successfully!
        </Text>
        <Text fontSize="lg" color="gray.600">
          If you can see this message, the JavaScript is working properly.
        </Text>
        <Box p={6} bg="green.100" borderRadius="lg" border="2px solid green.300">
          <Text fontSize="md" color="green.800" fontWeight="bold">
            🎉 SUCCESS: The React application is rendering correctly on GitHub Pages!
          </Text>
        </Box>
        <Text fontSize="sm" color="gray.500">
          Current time: {new Date().toLocaleString()}
        </Text>
      </VStack>
    </Box>
  );
}

export default App;
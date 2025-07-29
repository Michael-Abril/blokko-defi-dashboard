import React from 'react';
import { Box, Text, VStack, Button } from '@chakra-ui/react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          p={8}
          textAlign="center"
          minH="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="gray.50"
        >
          <VStack spacing={4}>
            <Text fontSize="2xl" fontWeight="bold" color="red.500">
              Something went wrong
            </Text>
            <Text color="gray.600">
              The application encountered an error. Please check the console for details.
            </Text>
            {this.state.error && (
              <Box
                p={4}
                bg="red.50"
                borderRadius="md"
                border="1px solid"
                borderColor="red.200"
                maxW="600px"
                textAlign="left"
              >
                <Text fontWeight="bold" color="red.700" mb={2}>
                  Error Details:
                </Text>
                <Text fontSize="sm" color="red.600" fontFamily="mono">
                  {this.state.error.toString()}
                </Text>
              </Box>
            )}
            <Button
              colorScheme="blue"
              onClick={() => window.location.reload()}
            >
              Reload Page
            </Button>
          </VStack>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 
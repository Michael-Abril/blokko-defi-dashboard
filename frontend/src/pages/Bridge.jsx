import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Card,
  CardBody,
  CardHeader,
  Button,
  Select,
  Input,
  Badge,
  Progress,
  Icon,
  useToast,
  SimpleGrid,
  Divider,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useBreakpointValue,
  Tooltip,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Avatar,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import {
  CheckCircleIcon,
  TimeIcon,
  ArrowForwardIcon,
  RepeatIcon,
  InfoIcon,
  WarningIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from '@chakra-ui/icons';

const Bridge = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [sourceChain, setSourceChain] = useState('');
  const [destinationChain, setDestinationChain] = useState('');
  const [token, setToken] = useState('');
  const [amount, setAmount] = useState('');
  const [isBridging, setIsBridging] = useState(false);
  const [bridgeStatus, setBridgeStatus] = useState('pending');
  const [autoAllocate, setAutoAllocate] = useState(false);
  const toast = useToast();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const steps = [
    { id: 0, title: 'Select Source', description: 'Choose source chain and token' },
    { id: 1, title: 'Select Destination', description: 'Choose destination chain' },
    { id: 2, title: 'Review & Confirm', description: 'Review bridge details' },
    { id: 3, title: 'Bridging', description: 'Transaction in progress' },
  ];

  const chains = [
    { id: 'ethereum', name: 'Ethereum', icon: '🔷', gas: 'High', time: '~5 min' },
    { id: 'arbitrum', name: 'Arbitrum', icon: '🔵', gas: 'Low', time: '~2 min' },
    { id: 'polygon', name: 'Polygon', icon: '🟣', gas: 'Low', time: '~1 min' },
    { id: 'optimism', name: 'Optimism', icon: '🔴', gas: 'Medium', time: '~3 min' },
    { id: 'base', name: 'Base', icon: '🔵', gas: 'Low', time: '~2 min' },
  ];

  const tokens = [
    { symbol: 'USDC', name: 'USD Coin', address: '0xA0b86a33E6B8eD8aB8C1e1f9d8cE00b9c5e6C5a0', decimals: 6 },
    { symbol: 'USDT', name: 'Tether USD', address: '0xdAC17F958D2ee523a2206206994597C13D831ec7', decimals: 6 },
    { symbol: 'DAI', name: 'Dai Stablecoin', address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', decimals: 18 },
    { symbol: 'WETH', name: 'Wrapped Ethereum', address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', decimals: 18 },
  ];

  const getChainIcon = (chainId) => {
    const chain = chains.find(c => c.id === chainId);
    return chain ? chain.icon : '🪙';
  };

  const getChainName = (chainId) => {
    const chain = chains.find(c => c.id === chainId);
    return chain ? chain.name : 'Unknown';
  };

  const getTokenSymbol = (tokenAddress) => {
    const token = tokens.find(t => t.address === tokenAddress);
    return token ? token.symbol : 'Unknown';
  };

  const calculateFee = () => {
    if (!sourceChain || !destinationChain) return 0;
    const source = chains.find(c => c.id === sourceChain);
    const dest = chains.find(c => c.id === destinationChain);
    if (!source || !dest) return 0;
    
    // Mock fee calculation
    const baseFee = 5;
    const gasMultiplier = source.gas === 'High' ? 1.5 : source.gas === 'Medium' ? 1.2 : 1;
    return (baseFee * gasMultiplier).toFixed(2);
  };

  const calculateTime = () => {
    if (!sourceChain || !destinationChain) return '~5 min';
    const source = chains.find(c => c.id === sourceChain);
    const dest = chains.find(c => c.id === destinationChain);
    if (!source || !dest) return '~5 min';
    
    // Mock time calculation
    const sourceTime = parseInt(source.time.replace('~', '').replace(' min', ''));
    const destTime = parseInt(dest.time.replace('~', '').replace(' min', ''));
    return `~${Math.max(sourceTime, destTime)} min`;
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBridge = async () => {
    setIsBridging(true);
    setBridgeStatus('pending');
    
    // Simulate bridge transaction
    setTimeout(() => {
      setBridgeStatus('processing');
      toast({
        title: 'Bridge initiated',
        description: 'Your transaction is being processed',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
    }, 1000);

    setTimeout(() => {
      setBridgeStatus('completed');
      setIsBridging(false);
      toast({
        title: 'Bridge completed!',
        description: `Successfully bridged ${amount} ${getTokenSymbol(token)} from ${getChainName(sourceChain)} to ${getChainName(destinationChain)}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }, 5000);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <VStack spacing={6} align="stretch">
            <Card bg="white" shadow="md">
              <CardHeader>
                <Text fontSize="lg" fontWeight="bold" color="gray.800">
                  Source Chain & Token
                </Text>
              </CardHeader>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  <Box>
                    <Text fontSize="sm" color="gray.600" mb={2}>
                      Select Source Chain
                    </Text>
                    <Select
                      value={sourceChain}
                      onChange={(e) => setSourceChain(e.target.value)}
                      placeholder="Choose source chain"
                      size="lg"
                    >
                      {chains.map((chain) => (
                        <option key={chain.id} value={chain.id}>
                          {chain.icon} {chain.name} ({chain.gas} gas, {chain.time})
                        </option>
                      ))}
                    </Select>
                  </Box>

                  <Box>
                    <Text fontSize="sm" color="gray.600" mb={2}>
                      Select Token
                    </Text>
                    <Select
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                      placeholder="Choose token to bridge"
                      size="lg"
                    >
                      {tokens.map((t) => (
                        <option key={t.address} value={t.address}>
                          {t.symbol} - {t.name}
                        </option>
                      ))}
                    </Select>
                  </Box>

                  <Box>
                    <Text fontSize="sm" color="gray.600" mb={2}>
                      Amount
                    </Text>
                    <Input
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter amount"
                      size="lg"
                      type="number"
                    />
                  </Box>
                </VStack>
              </CardBody>
            </Card>
          </VStack>
        );

      case 1:
        return (
          <VStack spacing={6} align="stretch">
            <Card bg="white" shadow="md">
              <CardHeader>
                <Text fontSize="lg" fontWeight="bold" color="gray.800">
                  Destination Chain
                </Text>
              </CardHeader>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  <Box>
                    <Text fontSize="sm" color="gray.600" mb={2}>
                      Select Destination Chain
                    </Text>
                    <Select
                      value={destinationChain}
                      onChange={(e) => setDestinationChain(e.target.value)}
                      placeholder="Choose destination chain"
                      size="lg"
                    >
                      {chains.filter(c => c.id !== sourceChain).map((chain) => (
                        <option key={chain.id} value={chain.id}>
                          {chain.icon} {chain.name} ({chain.gas} gas, {chain.time})
                        </option>
                      ))}
                    </Select>
                  </Box>

                  {/* Bridge Preview */}
                  {destinationChain && (
                    <Card bg="white" shadow="md" border="1px solid" borderColor="blue.200">
                      <CardBody>
                        <VStack spacing={3} align="stretch">
                          <HStack justify="space-between">
                            <Text fontSize="sm" color="gray.600">Estimated Fee</Text>
                            <Text fontSize="sm" fontWeight="bold" color="gray.800">
                              ${calculateFee()}
                            </Text>
                          </HStack>
                          <HStack justify="space-between">
                            <Text fontSize="sm" color="gray.600">Estimated Time</Text>
                            <Text fontSize="sm" fontWeight="bold" color="gray.800">
                              {calculateTime()}
                            </Text>
                          </HStack>
                          <HStack justify="space-between">
                            <Text fontSize="sm" color="gray.600">You'll Receive</Text>
                            <Text fontSize="sm" fontWeight="bold" color="green.500">
                              {amount} {getTokenSymbol(token)}
                            </Text>
                          </HStack>
                        </VStack>
                      </CardBody>
                    </Card>
                  )}
                </VStack>
              </CardBody>
            </Card>
          </VStack>
        );

      case 2:
        return (
          <VStack spacing={6} align="stretch">
            <Card bg="white" shadow="md">
              <CardHeader>
                <Text fontSize="lg" fontWeight="bold" color="gray.800">
                  Review Bridge Details
                </Text>
              </CardHeader>
              <CardBody>
                <VStack spacing={6} align="stretch">
                  {/* Bridge Summary */}
                  <Card bg="white" shadow="md" border="1px solid" borderColor="blue.200">
                    <CardBody>
                      <VStack spacing={4} align="stretch">
                        <HStack justify="space-between">
                          <Text fontSize="lg" fontWeight="bold" color="gray.800">
                            Bridge Summary
                          </Text>
                          <Badge colorScheme="blue" variant="subtle">
                            Ready
                          </Badge>
                        </HStack>
                        
                        <Divider />
                        
                        <SimpleGrid columns={2} spacing={4}>
                          <VStack align="start" spacing={1}>
                            <Text fontSize="sm" color="gray.600">From</Text>
                            <HStack>
                              <Text fontSize="2xl">{getChainIcon(sourceChain)}</Text>
                              <Text fontWeight="bold">{getChainName(sourceChain)}</Text>
                            </HStack>
                          </VStack>
                          
                          <VStack align="end" spacing={1}>
                            <Text fontSize="sm" color="gray.600">To</Text>
                            <HStack>
                              <Text fontWeight="bold">{getChainName(destinationChain)}</Text>
                              <Text fontSize="2xl">{getChainIcon(destinationChain)}</Text>
                            </HStack>
                          </VStack>
                        </SimpleGrid>
                        
                        <Divider />
                        
                        <VStack spacing={2} align="stretch">
                          <HStack justify="space-between">
                            <Text fontSize="sm" color="gray.600">Amount</Text>
                            <Text fontSize="sm" fontWeight="bold" color="gray.800">
                              {amount} {getTokenSymbol(token)}
                            </Text>
                          </HStack>
                          <HStack justify="space-between">
                            <Text fontSize="sm" color="gray.600">Bridge Fee</Text>
                            <Text fontSize="sm" fontWeight="bold" color="gray.800">
                              ${calculateFee()}
                            </Text>
                          </HStack>
                          <HStack justify="space-between">
                            <Text fontSize="sm" color="gray.600">Estimated Time</Text>
                            <Text fontSize="sm" fontWeight="bold" color="gray.800">
                              {calculateTime()}
                            </Text>
                          </HStack>
                        </VStack>
                      </VStack>
                    </CardBody>
                  </Card>

                  {/* Auto-Allocate Toggle */}
                  <Card bg="white" shadow="md">
                    <CardBody>
                      <HStack justify="space-between">
                        <VStack align="start" spacing={1}>
                          <Text fontSize="sm" fontWeight="bold" color="gray.800">
                            Auto-Allocate After Bridge
                          </Text>
                          <Text fontSize="xs" color="gray.600">
                            Automatically allocate bridged funds to optimal protocols
                          </Text>
                        </VStack>
                        <Button
                          size="sm"
                          variant={autoAllocate ? "solid" : "outline"}
                          onClick={() => setAutoAllocate(!autoAllocate)}
                        >
                          {autoAllocate ? 'Enabled' : 'Disabled'}
                        </Button>
                      </HStack>
                    </CardBody>
                  </Card>
                </VStack>
              </CardBody>
            </Card>
          </VStack>
        );

      case 3:
        return (
          <VStack spacing={6} align="stretch">
            <Card bg="white" shadow="md">
              <CardHeader>
                <Text fontSize="lg" fontWeight="bold" color="gray.800">
                  Bridge Progress
                </Text>
              </CardHeader>
              <CardBody>
                <VStack spacing={6} align="stretch">
                  {/* Progress Indicator */}
                  <Box>
                    <HStack justify="space-between" mb={2}>
                      <Text fontSize="sm" color="gray.600">Bridge Progress</Text>
                      <Badge
                        colorScheme={bridgeStatus === 'completed' ? 'green' : bridgeStatus === 'processing' ? 'yellow' : 'blue'}
                        variant="subtle"
                      >
                        {bridgeStatus === 'completed' ? 'Completed' : bridgeStatus === 'processing' ? 'Processing' : 'Pending'}
                      </Badge>
                    </HStack>
                    <Progress
                      value={bridgeStatus === 'completed' ? 100 : bridgeStatus === 'processing' ? 60 : 20}
                      colorScheme={bridgeStatus === 'completed' ? 'green' : 'blue'}
                      size="lg"
                      borderRadius="full"
                    />
                  </Box>

                  {/* Status Steps */}
                  <List spacing={3}>
                    <ListItem>
                      <ListIcon
                        as={bridgeStatus === 'pending' ? TimeIcon : CheckCircleIcon}
                        color={bridgeStatus === 'pending' ? 'yellow.500' : 'green.500'}
                      />
                      <Text fontSize="sm" color="gray.600">
                        Initiating bridge transaction...
                      </Text>
                    </ListItem>
                    <ListItem>
                      <ListIcon
                        as={bridgeStatus === 'processing' || bridgeStatus === 'completed' ? CheckCircleIcon : TimeIcon}
                        color={bridgeStatus === 'processing' || bridgeStatus === 'completed' ? 'green.500' : 'gray.400'}
                      />
                      <Text fontSize="sm" color="gray.600">
                        Transaction confirmed on source chain
                      </Text>
                    </ListItem>
                    <ListItem>
                      <ListIcon
                        as={bridgeStatus === 'completed' ? CheckCircleIcon : TimeIcon}
                        color={bridgeStatus === 'completed' ? 'green.500' : 'gray.400'}
                      />
                      <Text fontSize="sm" color="gray.600">
                        Funds received on destination chain
                      </Text>
                    </ListItem>
                  </List>

                  {bridgeStatus === 'completed' && (
                    <Alert status="success" borderRadius="lg">
                      <AlertIcon />
                      <Box>
                        <AlertTitle>Bridge completed successfully!</AlertTitle>
                        <AlertDescription>
                          Your funds have been bridged to {getChainName(destinationChain)}.
                          {autoAllocate && ' Auto-allocation is in progress...'}
                        </AlertDescription>
                      </Box>
                    </Alert>
                  )}
                </VStack>
              </CardBody>
            </Card>
          </VStack>
        );

      default:
        return null;
    }
  };

  return (
    <VStack spacing={8} align="stretch">
      {/* Page Header */}
      <Box>
        <Heading 
          size="2xl" 
          bgGradient="linear(to-r, blue.500, purple.500)" 
          bgClip="text"
          fontWeight="800"
          mb={2}
        >
          Bridge Assets
        </Heading>
        <Text color="gray.600" fontSize="lg">
          Seamlessly bridge assets across multiple chains
        </Text>
      </Box>

      {/* Stepper Progress */}
      <Card bg="white" shadow="md">
        <CardBody>
          <VStack spacing={6} align="stretch">
            {/* Step Indicators */}
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
              {steps.map((step, index) => (
                <Box key={step.id} textAlign="center">
                  <Box
                    w="40px"
                    h="40px"
                    borderRadius="full"
                    bg={index <= currentStep ? 'blue.500' : 'gray.200'}
                    color={index <= currentStep ? 'white' : 'gray.500'}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontWeight="bold"
                    mx="auto"
                    mb={2}
                    boxShadow={index <= currentStep ? 'lg' : 'none'}
                  >
                    {index < currentStep ? (
                      <CheckCircleIcon boxSize={5} />
                    ) : (
                      index + 1
                    )}
                  </Box>
                  <Text fontSize="xs" fontWeight="bold" color={index <= currentStep ? 'gray.800' : 'gray.600'}>
                    {step.title}
                  </Text>
                  {!isMobile && (
                    <Text fontSize="xs" color="gray.600">
                      {step.description}
                    </Text>
                  )}
                </Box>
              ))}
            </SimpleGrid>

            {/* Progress Bar */}
            <Progress
              value={(currentStep / (steps.length - 1)) * 100}
              colorScheme="blue"
              size="sm"
              borderRadius="full"
            />
          </VStack>
        </CardBody>
      </Card>

      {/* Step Content */}
      {renderStepContent()}

      {/* Navigation Buttons */}
      <HStack justify="space-between">
        <Button
          leftIcon={<ChevronLeftIcon />}
          onClick={handleBack}
          isDisabled={currentStep === 0}
          variant="outline"
        >
          Back
        </Button>

        {currentStep < steps.length - 1 ? (
          <Button
            rightIcon={<ChevronRightIcon />}
            onClick={handleNext}
            isDisabled={
              (currentStep === 0 && (!sourceChain || !token || !amount)) ||
              (currentStep === 1 && !destinationChain)
            }
            variant="solid"
            colorScheme="blue"
          >
            Next
          </Button>
        ) : (
          <Button
            onClick={handleBridge}
            isLoading={isBridging}
            loadingText="Bridging..."
            isDisabled={bridgeStatus === 'completed'}
            variant="solid"
            colorScheme="blue"
          >
            {bridgeStatus === 'completed' ? 'Bridge Completed' : 'Execute Bridge'}
          </Button>
        )}
      </HStack>
    </VStack>
  );
};

export default Bridge;
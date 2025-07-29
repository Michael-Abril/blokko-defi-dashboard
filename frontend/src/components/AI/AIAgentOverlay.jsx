import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  IconButton,
  Input,
  Avatar,
  Badge,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useToast,
  Divider,
  Flex,
  Spinner,
  Card,
  CardBody,
  useBreakpointValue,
  Tooltip,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from '@chakra-ui/react';
import {
  ChatIcon,
  CloseIcon,
  SettingsIcon,
  InfoIcon,
  StarIcon,
  RepeatIcon,
  CopyIcon,
  ArrowForwardIcon,
} from '@chakra-ui/icons';
import { useLocation } from 'react-router-dom';

const AIAgentOverlay = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const toast = useToast();
  const location = useLocation();
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Context-aware prompts based on current page
  const getContextPrompts = () => {
    const path = location.pathname;
    const prompts = {
      '/': [
        'What\'s my portfolio performance today?',
        'Show me the best yield opportunities',
        'What are the current market risks?',
      ],
      '/holdings': [
        'What\'s the risk level of my Curve exposure?',
        'Which protocols should I rebalance?',
        'Show me my highest yielding positions',
      ],
      '/swap': [
        'What\'s the best route for ETH to USDC?',
        'Compare gas fees across DEXs',
        'Show me historical swap rates',
      ],
      '/bridge': [
        'What\'s the fastest bridge to Arbitrum?',
        'Compare bridge fees and times',
        'Show me bridge liquidity status',
      ],
      '/activity': [
        'Summarize my recent transactions',
        'What caused this gas spike?',
        'Show me failed transactions',
      ],
    };
    return prompts[path] || [
      'How can I optimize my DeFi strategy?',
      'What are the current market trends?',
      'Show me risk management tips',
    ];
  };

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 1,
          type: 'ai',
          content: `Hello! I'm your AI DeFi assistant. I can help you with portfolio analysis, trading strategies, risk management, and more. What would you like to know about your DeFi activities?`,
          timestamp: new Date(),
        },
      ]);
    }
  }, [messages.length]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSendMessage = async (content) => {
    if (!content.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(content);
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput) => {
    const responses = {
      portfolio: {
        content: `Based on your current portfolio, I can see you have a well-diversified DeFi strategy. Your total value is $2.4M with an average APY of 8.2%. The highest yielding position is your Curve LP on Ethereum at 12.4% APY. Would you like me to suggest any rebalancing opportunities?`,
        suggestions: ['Show rebalancing suggestions', 'Analyze risk exposure', 'Compare with benchmarks']
      },
      risk: {
        content: `Your current risk score is 24/100, which is considered low risk. Your largest exposure is to stablecoins (45%), followed by ETH (30%) and LP positions (25%). The main risk factors are: 1) Smart contract risk in newer protocols, 2) Impermanent loss in LP positions, 3) Market volatility affecting ETH holdings.`,
        suggestions: ['Show risk mitigation strategies', 'Analyze protocol security', 'Suggest hedging options']
      },
      swap: {
        content: `For ETH to USDC swaps, I recommend using Uniswap V3 with 0.05% fee tier for the best rates. Current gas price is 25 gwei, and the optimal route would be ETH → WETH → USDC via Uniswap V3. Estimated gas cost: $12.50.`,
        suggestions: ['Show alternative routes', 'Compare gas costs', 'Set up limit order']
      },
      bridge: {
        content: `For bridging to Arbitrum, I recommend using the official Arbitrum Bridge for security or Stargate for speed. Current bridge times: Arbitrum Bridge (~10 min, $5 fee), Stargate (~2 min, $8 fee). Liquidity is good on both bridges.`,
        suggestions: ['Show bridge comparison', 'Check liquidity status', 'Set up auto-allocation']
      }
    };

    const input = userInput.toLowerCase();
    if (input.includes('portfolio') || input.includes('performance')) {
      return responses.portfolio;
    } else if (input.includes('risk') || input.includes('exposure')) {
      return responses.risk;
    } else if (input.includes('swap') || input.includes('route')) {
      return responses.swap;
    } else if (input.includes('bridge')) {
      return responses.bridge;
    } else {
      return {
        content: `I understand you're asking about "${userInput}". Let me analyze your portfolio and provide personalized insights. Based on your current holdings and market conditions, I'd recommend focusing on yield optimization and risk management. Would you like me to dive deeper into any specific aspect?`,
        suggestions: ['Portfolio analysis', 'Risk assessment', 'Yield optimization']
      };
    }
  };

  const handleQuickPrompt = (prompt) => {
    handleSendMessage(prompt);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied to clipboard',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const clearChat = () => {
    setMessages([
      {
        id: Date.now(),
        type: 'ai',
        content: `Chat cleared. How can I help you today?`,
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <>
      {/* Floating AI Button */}
      <Box
        position="fixed"
        bottom={6}
        right={6}
        zIndex={1000}
      >
        <Tooltip label="AI Assistant" placement="left">
          <IconButton
            icon={<ChatIcon />}
            onClick={onOpen}
            size="lg"
            colorScheme="secondary"
            variant="solid"
            borderRadius="full"
            boxShadow="0 4px 20px rgba(0, 212, 200, 0.3)"
            _hover={{
              transform: 'scale(1.1)',
              boxShadow: '0 6px 25px rgba(0, 212, 200, 0.4)',
            }}
            transition="all 0.2s"
          />
        </Tooltip>
      </Box>

      {/* AI Chat Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size={isMobile ? 'full' : 'xl'} scrollBehavior="inside">
        <ModalOverlay bg="background.overlay" backdropFilter="blur(10px)" />
        <ModalContent
          bg="glass.100"
          backdropFilter="blur(20px)"
          border="1px solid"
          borderColor="glass.300"
          borderRadius="xl"
          maxH="90vh"
        >
          <ModalHeader borderBottom="1px solid" borderColor="glass.300">
            <HStack justify="space-between">
              <HStack spacing={3}>
                <Avatar
                  size="sm"
                  bg="gradient.secondary"
                  name="AI Assistant"
                  src=""
                />
                <VStack align="start" spacing={0}>
                  <Text fontWeight="bold" color="text.primary">
                    AI DeFi Assistant
                  </Text>
                  <Text fontSize="xs" color="text.secondary">
                    Powered by GPT-4
                  </Text>
                </VStack>
              </HStack>
              
              <HStack spacing={2}>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    icon={<SettingsIcon />}
                    variant="ghost"
                    size="sm"
                    aria-label="Settings"
                  />
                  <MenuList bg="glass.200" backdropFilter="blur(10px)">
                    <MenuItem onClick={clearChat}>Clear Chat</MenuItem>
                    <MenuDivider />
                    <MenuItem>Export Chat</MenuItem>
                    <MenuItem>Settings</MenuItem>
                  </MenuList>
                </Menu>
                <IconButton
                  icon={<CloseIcon />}
                  onClick={onClose}
                  variant="ghost"
                  size="sm"
                  aria-label="Close"
                />
              </HStack>
            </HStack>
          </ModalHeader>

          <ModalBody p={0}>
            <VStack spacing={0} align="stretch" h="60vh">
              {/* Messages Area */}
              <Box flex={1} overflowY="auto" p={4}>
                <VStack spacing={4} align="stretch">
                  {messages.map((message) => (
                    <Box
                      key={message.id}
                      alignSelf={message.type === 'user' ? 'flex-end' : 'flex-start'}
                      maxW="80%"
                    >
                      <Card
                        variant="glass"
                        bg={message.type === 'user' ? 'secondary.500' : 'white'}
                        color={message.type === 'user' ? 'white' : 'text.primary'}
                      >
                        <CardBody p={3}>
                          <VStack align="stretch" spacing={2}>
                            <Text fontSize="sm">
                              {message.content}
                            </Text>
                            
                            {message.suggestions && (
                              <HStack spacing={2} wrap="wrap">
                                {message.suggestions.map((suggestion, index) => (
                                  <Button
                                    key={index}
                                    size="xs"
                                    variant="outline"
                                    onClick={() => handleQuickPrompt(suggestion)}
                                    color={message.type === 'user' ? 'white' : 'secondary.500'}
                                    borderColor={message.type === 'user' ? 'white' : 'secondary.500'}
                                    _hover={{
                                      bg: message.type === 'user' ? 'white' : 'secondary.50',
                                      color: message.type === 'user' ? 'secondary.500' : 'secondary.600',
                                    }}
                                  >
                                    {suggestion}
                                  </Button>
                                ))}
                              </HStack>
                            )}
                            
                            <HStack justify="space-between" pt={1}>
                              <Text fontSize="xs" opacity={0.7}>
                                {message.timestamp.toLocaleTimeString()}
                              </Text>
                              {message.type === 'ai' && (
                                <HStack spacing={1}>
                                  <IconButton
                                    icon={<CopyIcon />}
                                    size="xs"
                                    variant="ghost"
                                    onClick={() => copyToClipboard(message.content)}
                                    aria-label="Copy message"
                                  />
                                  <IconButton
                                    icon={<StarIcon />}
                                    size="xs"
                                    variant="ghost"
                                    aria-label="Save message"
                                  />
                                </HStack>
                              )}
                            </HStack>
                          </VStack>
                        </CardBody>
                      </Card>
                    </Box>
                  ))}
                  
                  {isLoading && (
                    <Box alignSelf="flex-start" maxW="80%">
                      <Card variant="glass">
                        <CardBody p={3}>
                          <HStack spacing={2}>
                            <Spinner size="sm" color="secondary.500" />
                            <Text fontSize="sm" color="text.secondary">
                              AI is thinking...
                            </Text>
                          </HStack>
                        </CardBody>
                      </Card>
                    </Box>
                  )}
                  
                  <div ref={messagesEndRef} />
                </VStack>
              </Box>

              <Divider />

              {/* Quick Prompts */}
              <Box p={4} bg="glass.50">
                <Text fontSize="xs" color="text.secondary" mb={2}>
                  Quick Prompts
                </Text>
                <HStack spacing={2} wrap="wrap">
                  {getContextPrompts().map((prompt, index) => (
                    <Button
                      key={index}
                      size="xs"
                      variant="outline"
                      onClick={() => handleQuickPrompt(prompt)}
                      colorScheme="secondary"
                    >
                      {prompt}
                    </Button>
                  ))}
                </HStack>
              </Box>

              <Divider />

              {/* Input Area */}
              <Box p={4}>
                <HStack spacing={2}>
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask me anything about your DeFi portfolio..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage(inputValue);
                      }
                    }}
                    size="lg"
                    borderRadius="lg"
                    borderColor="glass.300"
                    _focus={{
                      borderColor: 'secondary.500',
                      boxShadow: '0 0 0 3px rgba(0, 212, 200, 0.1)',
                    }}
                  />
                  <IconButton
                    icon={<ArrowForwardIcon />}
                    onClick={() => handleSendMessage(inputValue)}
                    isDisabled={!inputValue.trim() || isLoading}
                    colorScheme="secondary"
                    size="lg"
                    borderRadius="lg"
                    aria-label="Send message"
                  />
                </HStack>
              </Box>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AIAgentOverlay; 
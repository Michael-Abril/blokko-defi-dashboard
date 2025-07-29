import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  VStack,
  HStack,
  Text,
  Textarea,
  Button,
  Badge,
  Avatar,
  Divider,
  useDisclosure,
  Tooltip,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import {
  ChatIcon,
  CloseIcon,
  SendIcon,
  SettingsIcon,
  StarIcon,
  LightningIcon,
  BrainIcon,
} from '@chakra-ui/icons';

const AIAgentOverlay = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      type: 'ai',
      content: 'Hello! I\'m your Blokko AI assistant. I can help you optimize your DeFi strategy, analyze your portfolio, and provide insights. What would you like to know?',
      timestamp: new Date(),
      suggestions: ['Show me my portfolio performance', 'Optimize my yield strategy', 'Analyze risk exposure']
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const userMessage = {
      id: chatHistory.length + 1,
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setChatHistory(prev => [...prev, userMessage]);
    setMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: chatHistory.length + 2,
        type: 'ai',
        content: 'I\'m analyzing your request. Here are some insights based on your current portfolio...',
        timestamp: new Date(),
        suggestions: ['View detailed analysis', 'Apply optimization', 'Set up alerts']
      };
      setChatHistory(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleSuggestion = (suggestion) => {
    setMessage(suggestion);
  };

  const quickActions = [
    { label: 'Rebalance', icon: LightningIcon, color: 'blue' },
    { label: 'Optimize', icon: BrainIcon, color: 'green' },
    { label: 'Analyze', icon: StarIcon, color: 'purple' },
  ];

  return (
    <>
      {/* Floating AI Assistant Button */}
      <Box
        position="fixed"
        bottom="30px"
        right="30px"
        zIndex="tooltip"
        className="animate-float"
      >
        <Tooltip label="AI Assistant" placement="left">
          <IconButton
            aria-label="Open AI Assistant"
            icon={<ChatIcon />}
            size="lg"
            colorScheme="blue"
            borderRadius="full"
            w="60px"
            h="60px"
            boxShadow="soft.lg"
            onClick={onOpen}
            className="animate-glow"
            _hover={{
              transform: 'scale(1.1)',
              boxShadow: 'soft.xl',
            }}
          />
        </Tooltip>
      </Box>

      {/* AI Chat Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent bg="surface.50">
          <DrawerHeader borderBottomWidth="1px" borderColor="surface.200">
            <HStack spacing={3}>
              <Avatar
                size="sm"
                bg="gradient.brand"
                icon={<BrainIcon />}
                className="animate-pulse"
              />
              <VStack align="start" spacing={0}>
                <Text fontWeight="700" color="text.primary">
                  Blokko AI Assistant
                </Text>
                <Text fontSize="sm" color="text.secondary">
                  Your DeFi Strategy Partner
                </Text>
              </VStack>
              <Spacer />
              <Badge colorScheme="success" fontSize="xs">
                Live
              </Badge>
            </HStack>
          </DrawerHeader>

          <DrawerBody p={0}>
            <VStack h="full" spacing={0}>
              {/* Quick Actions */}
              <Box w="full" p={4} borderBottomWidth="1px" borderColor="surface.200">
                <Text fontSize="sm" fontWeight="600" color="text.secondary" mb={3}>
                  Quick Actions
                </Text>
                <HStack spacing={3}>
                  {quickActions.map((action, index) => (
                    <Button
                      key={action.label}
                      size="sm"
                      variant="neumorphic"
                      leftIcon={<action.icon />}
                      colorScheme={action.color}
                      onClick={() => handleSuggestion(action.label)}
                      className="hover:scale-105"
                    >
                      {action.label}
                    </Button>
                  ))}
                </HStack>
              </Box>

              {/* Chat Messages */}
              <Box flex="1" w="full" p={4} overflowY="auto">
                <VStack spacing={4} align="stretch">
                  {chatHistory.map((msg) => (
                    <Box key={msg.id}>
                      <HStack spacing={3} align="start">
                        <Avatar
                          size="sm"
                          bg={msg.type === 'ai' ? 'gradient.brand' : 'surface.300'}
                          icon={msg.type === 'ai' ? <BrainIcon /> : undefined}
                          name={msg.type === 'user' ? 'You' : 'AI'}
                        />
                        <Box flex="1">
                          <Text fontSize="sm" color="text.secondary" mb={1}>
                            {msg.type === 'ai' ? 'Blokko AI' : 'You'}
                          </Text>
                          <Box
                            bg={msg.type === 'ai' ? 'surface.100' : 'brand.50'}
                            p={3}
                            borderRadius="lg"
                            boxShadow="soft.sm"
                          >
                            <Text fontSize="sm" color="text.primary">
                              {msg.content}
                            </Text>
                          </Box>
                          
                          {/* Suggestions */}
                          {msg.suggestions && (
                            <HStack spacing={2} mt={3} flexWrap="wrap">
                              {msg.suggestions.map((suggestion, index) => (
                                <Button
                                  key={index}
                                  size="xs"
                                  variant="outline"
                                  colorScheme="brand"
                                  onClick={() => handleSuggestion(suggestion)}
                                  className="hover:scale-105"
                                >
                                  {suggestion}
                                </Button>
                              ))}
                            </HStack>
                          )}
                        </Box>
                      </HStack>
                    </Box>
                  ))}
                </VStack>
              </Box>

              {/* Message Input */}
              <Box w="full" p={4} borderTopWidth="1px" borderColor="surface.200">
                <VStack spacing={3}>
                  <HStack w="full" spacing={2}>
                    <Textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Ask me about your portfolio, strategy, or DeFi insights..."
                      size="sm"
                      resize="none"
                      rows={2}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <IconButton
                      aria-label="Send message"
                      icon={<SendIcon />}
                      colorScheme="brand"
                      size="sm"
                      onClick={handleSendMessage}
                      isDisabled={!message.trim()}
                      className="hover:scale-105"
                    />
                  </HStack>
                  <Text fontSize="xs" color="text.tertiary" textAlign="center">
                    Press Enter to send, Shift+Enter for new line
                  </Text>
                </VStack>
              </Box>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AIAgentOverlay; 
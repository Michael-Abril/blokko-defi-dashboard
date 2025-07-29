import React, { useState } from 'react';
import { Box, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';

const AIAgentCard = ({ title, description, prompt }) => (
    <Box bg="white" p={5} borderRadius="lg" boxShadow="md">
        <Heading size="md">{title}</Heading>
        <Text mt={2} color="gray.600">{description}</Text>
        <Text mt={4} fontStyle="italic">e.g., "{prompt}"</Text>
    </Box>
)

const AIAgents = () => {
  return (
    <Box>
      <Heading mb={10} bgGradient="linear(to-r, gradient.start, gradient.end)" bgClip="text">
        Blokko AI Agents
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
        <AIAgentCard 
            title="Marketing Agent"
            description="Analyzes sales data and suggests promotions."
            prompt="Analyze my sales data and suggest a new promotion."
        />
        <AIAgentCard 
            title="Operations Agent"
            description="Provides insights into business operations."
            prompt="What were my busiest hours last week?"
        />
        <AIAgentCard 
            title="Treasury Agent"
            description="Advises on treasury management based on market conditions."
            prompt="Based on market volatility, should I adjust my currency allocation?"
        />
      </SimpleGrid>
    </Box>
  );
};

export default AIAgents;
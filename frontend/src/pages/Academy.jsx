import React, { useState } from 'react';
import { Box, Heading, SimpleGrid, Text, VStack, Icon } from '@chakra-ui/react';
import { AcademicCapIcon, VideoCameraIcon } from '@heroicons/react/24/solid';

const ArticleCard = ({ title, description }) => (
    <Box bg="white" p={5} borderRadius="lg" boxShadow="md">
        <HStack><Icon as={AcademicCapIcon} w={6} h={6} color="brand.primary" /><Heading size="md">{title}</Heading></HStack>
        <Text mt={2} color="gray.600">{description}</Text>
    </Box>
);

const TutorialCard = ({ title }) => (
    <Box bg="white" p={5} borderRadius="lg" boxShadow="md">
        <VStack>
            <Icon as={VideoCameraIcon} w={12} h={12} color="brand.primary" />
            <Heading size="md" mt={2}>{title}</Heading>
        </VStack>
    </Box>
);

const Academy = () => {
  return (
    <Box>
      <Heading mb={10} bgGradient="linear(to-r, gradient.start, gradient.end)" bgClip="text">Blokko Academy</Heading>
      <Heading size="lg" mb={5}>Getting Started</Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5} mb={10}>
        <ArticleCard title="What is a Stablecoin?" description="Learn the fundamentals of fiat-backed digital currencies." />
        <ArticleCard title="Understanding DeFi Yield Farming" description="A guide to earning passive income with your crypto assets." />
        <ArticleCard title="How to Read On-Chain Data" description="An introduction to blockchain explorers and analytics." />
      </SimpleGrid>

      <Heading size="lg" mb={5}>Video Tutorials</Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
        <TutorialCard title="Setting Up Your Blokko Wallet" />
        <TutorialCard title="Your First Cross-Chain Swap" />
        <TutorialCard title="Automating Your Treasury with the Investment DAO" />
      </SimpleGrid>
    </Box>
  );
};

export default Academy;
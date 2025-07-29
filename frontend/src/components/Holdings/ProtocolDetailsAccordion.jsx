import React from 'react';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, HStack, Text, Badge } from '@chakra-ui/react';

const ProtocolDetailsAccordion = ({ positions }) => {
  return (
    <Accordion allowToggle>
      {positions.map((p) => (
        <AccordionItem key={p.name}>
          <h2>
            <AccordionButton _expanded={{ bg: 'gray.50' }}>
              <Box flex="1" textAlign="left">
                <HStack spacing={3}>
                  <Text fontWeight="bold">{p.name}</Text>
                  <Badge colorScheme="blue">{p.category}</Badge>
                  <Badge colorScheme="green">APY {p.apy}%</Badge>
                </HStack>
              </Box>
              <Box>{`$${p.balance.toLocaleString()}`}</Box>
              <AccordionIcon ml={3} />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} fontSize="sm">
            <Text>Interest Earned: ${(p.balance * p.apy / 100 / 12).toFixed(2)} (est monthly)</Text>
            <Text>Details coming soon...</Text>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default ProtocolDetailsAccordion;
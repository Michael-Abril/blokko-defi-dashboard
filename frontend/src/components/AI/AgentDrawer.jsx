import React, { useState } from 'react';
import { Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, Button, Textarea, VStack, Box, Text, HStack, Badge } from '@chakra-ui/react';
import axios from 'axios';

const AgentDrawer = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMsg = async (prompt) => {
    if (!prompt) return;
    setMessages(m=>[...m,{ role:'user', text: prompt }]);
    setInput('');
    const { data } = await axios.post('http://localhost:3001/api/v1/ai-agent', { prompt });
    setMessages(m=>[...m,{ role:'assistant', text:data.answer, suggestions:data.suggestions }]);
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>Holdings Advisor AI</DrawerHeader>
        <DrawerBody>
          <VStack align="stretch" spacing={3} maxH="70vh" overflowY="auto">
            {messages.map((msg,idx)=>(
              <Box key={idx} alignSelf={msg.role==='user'?'flex-end':'flex-start'} bg={msg.role==='user'?'brand.500':'gray.100'} color={msg.role==='user'?'white':'black'} p={3} borderRadius="md">
                <Text fontSize="sm">{msg.text}</Text>
                {msg.suggestions && (
                  <HStack mt={2} spacing={2}>{msg.suggestions.map(s=>(<Badge as="button" key={s} onClick={()=>sendMsg(s)} cursor="pointer" colorScheme="blue">{s}</Badge>))}</HStack>
                )}
              </Box>
            ))}
          </VStack>
        </DrawerBody>
        <DrawerFooter>
          <Textarea placeholder="Ask a question..." value={input} onChange={e=>setInput(e.target.value)} mr={2}/>
          <Button colorScheme="brand" onClick={()=>sendMsg(input)}>Send</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AgentDrawer;
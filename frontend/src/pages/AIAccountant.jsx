import React, { useState } from 'react';
import { Box, Heading, VStack, Text, Textarea, Button, HStack, Avatar } from '@chakra-ui/react';
import Message from '../components/AIAccountant/Message';
import MessageInput from '../components/AIAccountant/MessageInput';
import axios from 'axios';

const AIAccountant = () => {
    const [messages, setMessages] = useState([]);

    const handleSendMessage = async (text) => {
        const userMessage = { sender: 'user', text };
        setMessages(prev => [...prev, userMessage]);

        try {
            const { data } = await axios.post('http://localhost:3001/api/v1/agent/query', { query: text });
            const agentMessage = { sender: 'agent', text: data.answer };
            setMessages(prev => [...prev, agentMessage]);
        } catch (error) {
            const errorMessage = { sender: 'agent', text: "Sorry, I'm having trouble connecting to my brain right now." };
            setMessages(prev => [...prev, errorMessage]);
        }
    };

  return (
    <Box maxW="800px" mx="auto">
      <Heading mb={10} bgGradient="linear(to-r, gradient.start, gradient.end)" bgClip="text">
        AI Accountant
      </Heading>

      <VStack 
        spacing={4} 
        p={5}
        bg="white"
        borderRadius="lg"
        boxShadow="md"
        height="600px"
        align="stretch"
      >
        <VStack flex="1" overflowY="auto" align="stretch" spacing={4} pr={4}>
            {messages.map((msg, index) => (
                <Message key={index} sender={msg.sender} text={msg.text} />
            ))}
        </VStack>

        <MessageInput onSendMessage={handleSendMessage} />
      </VStack>
    </Box>
  );
};

export default AIAccountant;
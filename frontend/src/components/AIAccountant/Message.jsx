import React from 'react';
import { HStack, Avatar, Box, Text } from '@chakra-ui/react';

const Message = ({ sender, text }) => {
  const isUser = sender === 'user';
  return (
    <HStack alignSelf={isUser ? 'flex-end' : 'flex-start'}>
      {!isUser && <Avatar name="AI Agent" size="sm" />}
      <Box 
        bg={isUser ? 'brand.primary' : 'gray.100'}
        color={isUser ? 'white' : 'brand.text'}
        px={4} 
        py={2} 
        borderRadius="lg"
      >
        <Text>{text}</Text>
      </Box>
      {isUser && <Avatar name="User" size="sm" />}
    </HStack>
  );
};

export default Message;
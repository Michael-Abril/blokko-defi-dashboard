import React, { useState } from 'react';
import { HStack, Input, Button } from '@chakra-ui/react';

const MessageInput = ({ onSendMessage }) => {
    const [text, setText] = useState('');

    const handleSend = () => {
        if (text.trim()) {
            onSendMessage(text);
            setText('');
        }
    };

    return (
        <HStack>
            <Input 
                placeholder="Ask your AI Accountant a question..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <Button colorScheme="brand" onClick={handleSend}>Send</Button>
        </HStack>
    );
};

export default MessageInput;
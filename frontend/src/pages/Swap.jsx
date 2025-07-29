import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Select,
  Input,
  Button,
  Icon,
  Heading,
  Text,
} from '@chakra-ui/react';
import { ArrowDownIcon } from '@chakra-ui/icons';
import QuoteRow from '../components/Swap/QuoteRow';
import axios from 'axios';
import SwapComparisonChart from '../components/Swap/SwapComparisonChart';
import FeeBreakdown from '../components/Swap/FeeBreakdown';
import { Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react';

const Swap = () => {
    const [quotes, setQuotes] = useState([]);
    const [selectedQuote, setSelectedQuote] = useState(null);
    const [slippage, setSlippage] = useState(0.5);
    const [deadline, setDeadline] = useState(20);

    const handleGetQuotes = async () => {
        const { data } = await axios.get('http://localhost:3001/api/v1/swap/quote', {
            params: {
                fromToken: 'USDC',
                toToken: 'USDT',
                amount: 1000,
                chainId: 1
            }
        });
        setQuotes(data.quotes);
    }

  return (
    <Box maxW="800px" mx="auto">
      <VStack spacing={8}>
        <Box 
            bg="white" 
            p={8} 
            borderRadius="lg" 
            boxShadow="md" 
            w="full"
            maxW="480px"
        >
            <Box 
                p={4} 
                mb={6} 
                borderRadius="lg"
                bgGradient="linear(to-r, gradient.start, gradient.end)"
            >
                <Heading size="lg" color="white" textAlign="center">Blokko Swap</Heading>
            </Box>
            <VStack align="stretch" spacing={4}>
                <HStack>
                    <Input placeholder="Amount" />
                    <Select placeholder="Select Token">
                        <option>USDC</option>
                        <option>USDT</option>
                        <option>DAI</option>
                    </Select>
                </HStack>

                <HStack justifyContent="center">
                    <Icon as={ArrowDownIcon} />
                </HStack>

                <HStack>
                    <Input placeholder="Amount" isReadOnly={true} />
                    <Select placeholder="Select Token">
                        <option>USDC</option>
                        <option>USDT</option>
                        <option>DAI</option>
                    </Select>
                </HStack>

                <Button colorScheme="brand" size="lg" onClick={handleGetQuotes}>Get Quotes</Button>
                <HStack>
                  <Text fontSize="sm">Slippage: {slippage}%</Text>
                  <Slider value={slippage} min={0.1} max={3} step={0.1} onChange={setSlippage}><SliderTrack><SliderFilledTrack /></SliderTrack><SliderThumb /></Slider>
                </HStack>
                <HStack>
                  <Text fontSize="sm">Deadline: {deadline} min</Text>
                  <Slider value={deadline} min={5} max={60} step={5} onChange={setDeadline}><SliderTrack><SliderFilledTrack /></SliderTrack><SliderThumb /></Slider>
                </HStack>
            </VStack>
        </Box>

        {quotes.length > 0 && (
            <VStack w="full" align="stretch" spacing={4}>
                {quotes.map(quote => (
                    <QuoteRow key={quote.dex} quote={quote} onSelect={setSelectedQuote} isSelected={selectedQuote?.dex===quote.dex} />
                ))}
            </VStack>
        )}
        {quotes.length>0 && (
            <SwapComparisonChart quotes={quotes} />
        )}
        {selectedQuote && (
            <FeeBreakdown quote={selectedQuote} bestOutput={Math.max(...quotes.map(q=>Number(q.outputAmount)))} />
        )}
      </VStack>
      {selectedQuote && (
          <Box mt={10} p={5} bg="white" borderRadius="lg" boxShadow="md">
            <Heading size="md" mb={4}>Confirm Swap</Heading>
            <Text>Swapping via {selectedQuote.dex}</Text>
            <Button mt={4} colorScheme="accent" size="lg">Swap</Button>
          </Box>
      )}
    </Box>
  );
};

export default Swap;

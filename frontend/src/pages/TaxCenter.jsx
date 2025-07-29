import React, { useState } from 'react';
import { Box, Heading, VStack, Textarea, Button, Text, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import axios from 'axios';

const TaxCenter = () => {
    const [transactions, setTransactions] = useState('');
    const [capitalGains, setCapitalGains] = useState(null);
    const [taxReport, setTaxReport] = useState(null);

    const handleCalculate = async () => {
        try {
            const parsedTransactions = JSON.parse(transactions);
            const { data } = await axios.post('http://localhost:3001/api/v1/taxes/capital-gains', { transactions: parsedTransactions });
            setCapitalGains(data.capitalGains);
            generateMockReport(parsedTransactions);
        } catch (error) {
            alert('Invalid JSON format for transactions.');
        }
    }
    
    const generateMockReport = (txs) => {
        const sales = txs.filter(t => t.type === 'sell');
        const report = sales.map((sale, index) => ({
            id: index + 1,
            asset: 'ETH',
            dateAcquired: '2023-01-01',
            dateSold: sale.date,
            proceeds: sale.price * sale.amount,
            costBasis: 2000 * sale.amount,
            gainOrLoss: (sale.price - 2000) * sale.amount,
        }));
        setTaxReport(report);
    }

    return (
        <Box>
            <Heading mb={10} bgGradient="linear(to-r, gradient.start, gradient.end)" bgClip="text">Tax Center</Heading>
            <VStack bg="white" p={5} borderRadius="lg" boxShadow="md" align="stretch" spacing={4}>
                <Text>Enter your transactions in JSON format...</Text>
                <Textarea placeholder="Enter transactions here..." value={transactions} onChange={(e) => setTransactions(e.target.value)} rows={10}/>
                <Button colorScheme="brand" onClick={handleCalculate}>Calculate & Generate Report</Button>
                {capitalGains !== null && (
                    <Box mt={4} p={4} borderWidth="1px" borderRadius="lg">
                        <Heading size="md">Estimated Capital Gains</Heading>
                        <Text fontSize="2xl" fontWeight="bold">${capitalGains.toLocaleString()}</Text>
                    </Box>
                )}
            </VStack>
            
            {taxReport && (
                <Box mt={10} bg="white" p={5} borderRadius="lg" boxShadow="md">
                    <Heading size="lg" mb={4}>Taxable Events Report (Form 8949)</Heading>
                    <Table variant="simple">
                        <Thead><Tr><Th>Asset</Th><Th>Date Acquired</Th><Th>Date Sold</Th><Th isNumeric>Proceeds</Th><Th isNumeric>Cost Basis</Th><Th isNumeric>Gain or Loss</Th></Tr></Thead>
                        <Tbody>
                            {taxReport.map(row => (
                                <Tr key={row.id}>
                                    <Td>{row.asset}</Td>
                                    <Td>{row.dateAcquired}</Td>
                                    <Td>{row.dateSold}</Td>
                                    <Td isNumeric>${row.proceeds.toLocaleString()}</Td>
                                    <Td isNumeric>${row.costBasis.toLocaleString()}</Td>
                                    <Td isNumeric color={row.gainOrLoss >= 0 ? 'accent.500' : 'red.500'}>${row.gainOrLoss.toLocaleString()}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
            )}
        </Box>
    );
};

export default TaxCenter;
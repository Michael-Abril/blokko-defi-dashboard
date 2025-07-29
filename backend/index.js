const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 3001;

const { mockTransactionHistory } = require('./mockTransactionHistory');
const { mockOpportunities } = require('./mockOpportunities');
const tvlData = require('./mockData/tvl.json');
const protocolMetrics = require('./mockData/protocolMetrics.json');
const riskData = require('./mockData/riskData.json');

app.use(cors());
app.use(express.json());

app.post('/api/v1/agent/query', (req, res) => {
  const { query } = req.body;
  let responseText = "I'm sorry, I don't have the data for that.";
  if (query.toLowerCase().includes('income')) {
    const totalIncome = mockTransactionHistory.filter(t => t.type === 'Income').reduce((sum, t) => sum + t.amount, 0);
    responseText = `Your total income for the period is $${totalIncome.toLocaleString()}.`;
  }
  res.json({ answer: responseText });
});

const fetchUniswapQuote = async (params) => ({ dex: "Uniswap V3", dexLogoUrl: "https://cdn.worldvectorlogo.com/logos/uniswap-uni.svg", outputAmount: "1000.50", gasFeeUSD: "5.75", transactionData: {} });
const fetchSushiSwapQuote = async (params) => ({ dex: "SushiSwap", dexLogoUrl: "https://cdn.worldvectorlogo.com/logos/sushiswap.svg", outputAmount: "999.80", gasFeeUSD: "4.90", transactionData: {} });

app.get('/api/v1/swap/quote', async (req, res) => {
    try {
        const [uniswapQuote, sushiswapQuote] = await Promise.all([ fetchUniswapQuote(req.query), fetchSushiSwapQuote(req.query) ]);
        const quotes = [uniswapQuote, sushiswapQuote];
        const bestQuote = quotes.reduce((best, current) => parseFloat(current.outputAmount) > parseFloat(best.outputAmount) ? current : best);
        const sortedQuotes = quotes.map(q => ({ ...q, isBestRate: q === bestQuote })).sort((a,b) => b.outputAmount - a.outputAmount);
        res.json({ quotes: sortedQuotes });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch quotes" });
    }
});

app.get('/api/v1/market/prices', async (req, res) => {
    const { ids } = req.query;
    if (!ids) return res.status(400).json({ error: 'Token IDs are required' });
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', { params: { ids, vs_currencies: 'usd' } });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch market prices' });
    }
});

// Endpoint to return mock DeFi opportunities
app.get('/api/v1/defi/opportunities', (req, res) => {
  res.json(mockOpportunities);
});

app.post('/api/v1/taxes/capital-gains', (req, res) => {
    const { transactions } = req.body;
    let purchases = transactions.filter(t => t.type === 'buy').sort((a, b) => new Date(a.date) - new Date(b.date));
    let sales = transactions.filter(t => t.type === 'sell').sort((a, b) => new Date(a.date) - new Date(b.date));
    let capitalGains = 0;
    for (const sale of sales) {
        let saleAmount = sale.amount;
        while (saleAmount > 0 && purchases.length > 0) {
            const purchase = purchases[0];
            const amountToProcess = Math.min(saleAmount, purchase.amount);
            capitalGains += (sale.price - purchase.price) * amountToProcess;
            saleAmount -= amountToProcess;
            purchase.amount -= amountToProcess;
            if (purchase.amount === 0) purchases.shift();
        }
    }
    res.json({ capitalGains });
});

app.post('/api/v1/ai-agent', (req,res)=>{
  const { prompt } = req.body;
  res.json({ answer:`AI Stub Response to: ${prompt}`, suggestions:["Generate Report","Rebalance Portfolio"] });
});

app.get('/api/v1/metrics/tvl', (req,res)=>{ res.json(tvlData); });
app.get('/api/v1/metrics/protocol', (req,res)=>{ res.json(protocolMetrics); });
app.get('/api/v1/metrics/risk', (req,res)=>{ res.json(riskData); });

app.listen(port, () => {
  console.log(`Blokko backend listening at http://localhost:${port}`);
});
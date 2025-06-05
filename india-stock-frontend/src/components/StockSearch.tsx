import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Card, 
  CardContent, 
  Typography, 
  Box,
  CircularProgress,
  Alert
} from '@mui/material';
import { getStockPrice } from '../services/stockService';
import { StockResponse } from '../types/stock';

const StockSearch: React.FC = () => {
  const [stockName, setStockName] = useState('');
  const [stockData, setStockData] = useState<StockResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!stockName.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const data = await getStockPrice(stockName);
      setStockData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setStockData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Indian Stock Exchange Search
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <TextField
          fullWidth
          label="Enter Stock Name"
          value={stockName}
          onChange={(e) => setStockName(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Button 
          variant="contained" 
          onClick={handleSearch}
          disabled={loading || !stockName.trim()}
        >
          Search
        </Button>
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {stockData && (
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {stockData.name}
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">Current Price</Typography>
              <Typography>BSE: ₹{stockData.currentPrice.BSE}</Typography>
              <Typography>NSE: ₹{stockData.currentPrice.NSE}</Typography>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">Performance</Typography>
              <Typography>Change: {stockData.percentChange}</Typography>
              <Typography>52-Week High: ₹{stockData.yearHigh}</Typography>
              <Typography>52-Week Low: ₹{stockData.yearLow}</Typography>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default StockSearch; 
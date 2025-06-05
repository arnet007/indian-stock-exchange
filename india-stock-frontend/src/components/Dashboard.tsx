import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Tab,
  Tabs,
  CircularProgress,
  Alert,
  Stack,
  Button,
  Grid,
  useTheme
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import {
  getTrendingStocks,
  getNSEMostActive,
  getBSEMostActive,
  getPriceShockers,
  getCommodityFutures
} from '../services/stockService';
import {
  TrendingStock,
  MostActiveStock,
  PriceShocker,
  CommodityFuture
} from '../types/stock';
import StockSearch from './StockSearch';

// Market imagery URLs
const MARKET_IMAGES = {
  bullBear: "https://img.freepik.com/free-vector/bull-bear-symbols-stock-market-trends_1017-31712.jpg",
  chartBackground: "https://img.freepik.com/free-vector/business-candle-stick-graph-chart-stock-market_41981-1435.jpg"
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [trendingStocks, setTrendingStocks] = useState<TrendingStock[]>([]);
  const [nseMostActive, setNseMostActive] = useState<MostActiveStock[]>([]);
  const [bseMostActive, setBseMostActive] = useState<MostActiveStock[]>([]);
  const [priceShockers, setPriceShockers] = useState<PriceShocker[]>([]);
  const [commodities, setCommodities] = useState<CommodityFuture[]>([]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const loadDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [
        trendingData,
        nseData,
        bseData,
        shockersData,
        commoditiesData
      ] = await Promise.all([
        getTrendingStocks(),
        getNSEMostActive(),
        getBSEMostActive(),
        getPriceShockers(),
        getCommodityFutures()
      ]);

      setTrendingStocks(trendingData);
      setNseMostActive(nseData);
      setBseMostActive(bseData);
      setPriceShockers(shockersData);
      setCommodities(commoditiesData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load dashboard data';
      setError(errorMessage);
      console.error('Dashboard loading error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const renderStockList = (stocks: any[], title: string) => (
    <Paper 
      sx={{ 
        p: 3,
        height: '100%',
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)), url(${MARKET_IMAGES.chartBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: 2,
        boxShadow: theme.shadows[3]
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <ShowChartIcon color="primary" />
        {title}
      </Typography>
      {stocks.length === 0 ? (
        <Typography color="text.secondary">No data available</Typography>
      ) : (
        <Stack spacing={2}>
          {stocks.map((stock, index) => {
            const changeValue = parseFloat(stock.change || stock.percentageChange || '0');
            const isPositive = changeValue >= 0;
            
            return (
              <Paper
                key={index}
                elevation={2}
                sx={{
                  p: 2,
                  borderRadius: 1,
                  background: theme.palette.background.paper,
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: theme.shadows[4]
                  }
                }}
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {stock.name || stock.symbol}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Price: ₹{parseFloat(stock.price).toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {isPositive ? (
                        <TrendingUpIcon color="success" />
                      ) : (
                        <TrendingDownIcon color="error" />
                      )}
                      <Typography
                        variant="body2"
                        color={isPositive ? 'success.main' : 'error.main'}
                        fontWeight="bold"
                      >
                        {changeValue > 0 ? '+' : ''}{stock.change || stock.percentageChange}%
                      </Typography>
                    </Box>
                    {stock.volume && (
                      <Typography variant="body2" color="text.secondary">
                        Volume: {parseInt(stock.volume).toLocaleString()}
                      </Typography>
                    )}
                    {stock.trades && (
                      <Typography variant="body2" color="text.secondary">
                        Trades: {stock.trades.toLocaleString()}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </Paper>
            );
          })}
        </Stack>
      )}
    </Paper>
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 2 }}>
        <Alert 
          severity="error" 
          action={
            <Button color="inherit" size="small" onClick={loadDashboardData}>
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Market Imagery */}
      <Paper 
        sx={{ 
          p: 3, 
          mb: 3, 
          borderRadius: 2,
          background: theme.palette.background.paper,
          boxShadow: theme.shadows[3]
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={4}>
            <img
              src={MARKET_IMAGES.bullBear}
              alt="Bull and Bear Market"
              style={{ 
                width: '100%',
                height: 'auto',
                borderRadius: theme.shape.borderRadius
              }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <StockSearch />
          </Grid>
        </Grid>
      </Paper>

      {/* Market Data Tabs */}
      <Paper 
        sx={{ 
          width: '100%',
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: theme.shadows[3]
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            bgcolor: theme.palette.background.paper,
            '& .MuiTab-root': {
              minHeight: 64,
              fontSize: '0.9rem'
            }
          }}
        >
          <Tab label="Trending" icon={<TrendingUpIcon />} iconPosition="start" />
          <Tab label="NSE Active" icon={<ShowChartIcon />} iconPosition="start" />
          <Tab label="BSE Active" icon={<ShowChartIcon />} iconPosition="start" />
          <Tab label="Price Shockers" icon={<TrendingUpIcon />} iconPosition="start" />
          <Tab label="Commodities" icon={<ShowChartIcon />} iconPosition="start" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          {renderStockList(trendingStocks, 'Trending Stocks')}
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          {renderStockList(nseMostActive, 'NSE Most Active')}
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          {renderStockList(bseMostActive, 'BSE Most Active')}
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          {renderStockList(priceShockers, 'Price Shockers')}
        </TabPanel>

        <TabPanel value={tabValue} index={4}>
          {renderStockList(commodities, 'Commodity Futures')}
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default Dashboard; 
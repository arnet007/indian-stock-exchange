import axios from 'axios';
import {
  StockResponse,
  CompanyData,
  IndustryData,
  MutualFund,
  TrendingStock,
  WeekHighLowData,
  MostActiveStock,
  PriceShocker,
  CommodityFuture,
  AnalystRecommendation,
  StockForecast,
  HistoricalData,
  HistoricalStats,
  PeriodType,
  DataType
} from '../types/stock';

const BASE_URL = "https://stock.indianapi.in";
const API_KEY = "sk-live-WVnsfYKty2FXOXF5EKVX8oUt3z99FgzYlGFGJ4IK";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'x-api-key': API_KEY,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// Helper function to handle API errors
const handleApiError = (error: any, context: string): never => {
  if (axios.isAxiosError(error)) {
    const errorMessage = error.response?.data?.message || error.message;
    const statusCode = error.response?.status;
    console.error(`${context} Error:`, {
      message: errorMessage,
      status: statusCode,
      data: error.response?.data
    });
    throw new Error(`${context} failed: ${errorMessage} (Status: ${statusCode})`);
  }
  throw new Error(`Failed to ${context.toLowerCase()}: Unknown error`);
};

// Mock data for development
const mockTrendingStocks: TrendingStock[] = [
  { 
    symbol: 'RELIANCE', 
    name: 'Reliance Industries', 
    price: '2456.75', 
    change: '2.34',
    volume: '1234567',
    marketCap: '1567890000000',
    trending_score: 98,
  },
  { 
    symbol: 'TCS', 
    name: 'Tata Consultancy Services', 
    price: '3567.80', 
    change: '1.23',
    volume: '987654',
    marketCap: '1234567000000',
    trending_score: 95,
  },
  { 
    symbol: 'INFY', 
    name: 'Infosys Limited', 
    price: '1478.90', 
    change: '-0.45',
    volume: '876543',
    marketCap: '987654000000',
    trending_score: 92,
  }
];

// Mock stock search response
const mockStockSearchResponse: Record<string, StockResponse> = {
  'RELIANCE': {
    name: 'Reliance Industries',
    currentPrice: {
      BSE: '2456.75',
      NSE: '2457.00'
    },
    percentChange: '+2.34',
    yearHigh: '2890.00',
    yearLow: '1987.50'
  },
  'TCS': {
    name: 'Tata Consultancy Services',
    currentPrice: {
      BSE: '3567.80',
      NSE: '3568.15'
    },
    percentChange: '+1.23',
    yearHigh: '3890.00',
    yearLow: '2987.50'
  },
  'INFY': {
    name: 'Infosys Limited',
    currentPrice: {
      BSE: '1478.90',
      NSE: '1479.05'
    },
    percentChange: '-0.45',
    yearHigh: '1890.00',
    yearLow: '1287.50'
  }
};

const mockMostActiveStocks: MostActiveStock[] = [
  { 
    symbol: 'TATASTEEL', 
    name: 'Tata Steel', 
    price: '1234.56', 
    change: '3.45', 
    volume: '1234567',
    value: '15678900000',
    trades: 45678
  },
  { 
    symbol: 'BHARTIARTL', 
    name: 'Bharti Airtel', 
    price: '876.54', 
    change: '2.13', 
    volume: '987654',
    value: '12345678000',
    trades: 34567
  }
];

const mockPriceShockers: PriceShocker[] = [
  { 
    symbol: 'ZOMATO', 
    name: 'Zomato Ltd', 
    price: '89.67', 
    percentageChange: '8.90',
    absoluteChange: '7.34',
    volume: '1234567'
  },
  { 
    symbol: 'PAYTM', 
    name: 'Paytm', 
    price: '456.78', 
    percentageChange: '-7.80',
    absoluteChange: '-38.45',
    volume: '987654'
  }
];

const mockCommodities: CommodityFuture[] = [
  { 
    symbol: 'GOLD', 
    name: 'Gold Future', 
    price: '58760', 
    change: '0.45',
    volume: '1234',
    openInterest: '4567',
    expiryDate: '2024-06-28'
  },
  { 
    symbol: 'SILVER', 
    name: 'Silver Future', 
    price: '71890', 
    change: '1.23',
    volume: '2345',
    openInterest: '5678',
    expiryDate: '2024-06-28'
  }
];

// Modified endpoints to use mock data for now
export const getTrendingStocks = async (): Promise<TrendingStock[]> => {
  return Promise.resolve(mockTrendingStocks);
};

export const getNSEMostActive = async (): Promise<MostActiveStock[]> => {
  return Promise.resolve(mockMostActiveStocks);
};

export const getBSEMostActive = async (): Promise<MostActiveStock[]> => {
  return Promise.resolve(mockMostActiveStocks);
};

export const getPriceShockers = async (): Promise<PriceShocker[]> => {
  return Promise.resolve(mockPriceShockers);
};

export const getCommodityFutures = async (): Promise<CommodityFuture[]> => {
  return Promise.resolve(mockCommodities);
};

// Stock search with fallback to mock data
export const getStockPrice = async (stockName: string): Promise<StockResponse> => {
  try {
    // First try the real API
    const response = await api.get<StockResponse>(`/stock?name=${encodeURIComponent(stockName)}`);
    return response.data;
  } catch (error) {
    console.warn('API call failed, falling back to mock data');
    // Check if we have mock data for this stock
    const mockData = mockStockSearchResponse[stockName.toUpperCase()];
    if (mockData) {
      return mockData;
    }
    // If no mock data, throw the original error
    return handleApiError(error, 'Fetch Stock Price');
  }
};

// New endpoints
export const getCompanyData = async (name: string): Promise<CompanyData> => {
  try {
    const response = await api.get<CompanyData>(`/company?name=${encodeURIComponent(name)}`);
    return response.data;
  } catch (error) {
    return handleApiError(error, 'Fetch Company Data');
  }
};

export const searchIndustry = async (industry: string): Promise<IndustryData> => {
  try {
    const response = await api.get<IndustryData>(`/industry?name=${encodeURIComponent(industry)}`);
    return response.data;
  } catch (error) {
    return handleApiError(error, 'Search Industry');
  }
};

export const searchMutualFund = async (query: string): Promise<MutualFund[]> => {
  try {
    const response = await api.get<MutualFund[]>(`/mutual_funds/search?q=${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    return handleApiError(error, 'Search Mutual Fund');
  }
};

export const get52WeekData = async (symbol: string): Promise<WeekHighLowData> => {
  try {
    const response = await api.get<WeekHighLowData>(`/52week?symbol=${encodeURIComponent(symbol)}`);
    return response.data;
  } catch (error) {
    return handleApiError(error, 'Get 52 Week Data');
  }
};

export const getAnalystRecommendations = async (symbol: string): Promise<AnalystRecommendation[]> => {
  try {
    const response = await api.get<AnalystRecommendation[]>(`/recommendations?symbol=${encodeURIComponent(symbol)}`);
    return response.data;
  } catch (error) {
    return handleApiError(error, 'Get Analyst Recommendations');
  }
};

export const getStockForecasts = async (
  symbol: string,
  period: PeriodType = PeriodType.SHORT_TERM,
  dataType: DataType = DataType.PRICE
): Promise<StockForecast> => {
  try {
    const response = await api.get<StockForecast>('/stock_forecasts', {
      params: { symbol, period, dataType }
    });
    return response.data;
  } catch (error) {
    return handleApiError(error, 'Get Stock Forecasts');
  }
};

export const getHistoricalData = async (
  symbol: string,
  startDate: string,
  endDate: string
): Promise<HistoricalData[]> => {
  try {
    const response = await api.get<HistoricalData[]>('/historical', {
      params: { symbol, startDate, endDate }
    });
    return response.data;
  } catch (error) {
    return handleApiError(error, 'Get Historical Data');
  }
};

export const getHistoricalStats = async (
  symbol: string,
  period: string
): Promise<HistoricalStats> => {
  try {
    const response = await api.get<HistoricalStats>('/historical_stats', {
      params: { symbol, period }
    });
    return response.data;
  } catch (error) {
    return handleApiError(error, 'Get Historical Stats');
  }
}; 
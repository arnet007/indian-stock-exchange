export interface StockResponse {
  name: string;
  currentPrice: {
    BSE: string;
    NSE: string;
  };
  percentChange: string;
  yearHigh: string;
  yearLow: string;
}

export interface StockData {
  name: string;
  price: {
    bse: string;
    nse: string;
  };
  change: string;
  range: {
    high: string;
    low: string;
  };
  industry: string;
}

// Company Data
export interface CompanyData {
  name: string;
  symbol: string;
  industry: string;
  description: string;
  marketCap: string;
  peRatio: string;
  dividendYield: string;
  bookValue: string;
  financials: {
    revenue: string;
    profit: string;
    assets: string;
    liabilities: string;
  };
}

// Industry Data
export interface IndustryData {
  name: string;
  companies: Array<{
    name: string;
    symbol: string;
    marketCap: string;
  }>;
  marketSize: string;
  growth: string;
}

// Mutual Fund
export interface MutualFund {
  name: string;
  category: string;
  nav: string;
  aum: string;
  oneYearReturn: string;
  threeYearReturn: string;
  fiveYearReturn: string;
  riskRating: string;
  expenseRatio: string;
}

// Trending Stocks
export interface TrendingStock {
  symbol: string;
  name: string;
  price: string;
  change: string;
  volume: string;
  marketCap: string;
  trending_score: number;
}

// 52 Week Data
export interface WeekHighLowData {
  symbol: string;
  name: string;
  currentPrice: string;
  high52Week: string;
  low52Week: string;
  highDate: string;
  lowDate: string;
  distanceFromHigh: string;
  distanceFromLow: string;
}

// Most Active Stocks
export interface MostActiveStock {
  symbol: string;
  name: string;
  price: string;
  change: string;
  volume: string;
  value: string;
  trades: number;
}

// Price Shockers
export interface PriceShocker {
  symbol: string;
  name: string;
  price: string;
  absoluteChange: string;
  percentageChange: string;
  volume: string;
  reason?: string;
}

// Commodity Future
export interface CommodityFuture {
  name: string;
  symbol: string;
  price: string;
  change: string;
  volume: string;
  openInterest: string;
  expiryDate: string;
}

// Analyst Recommendation
export enum RecommendationType {
  STRONG_BUY = 'STRONG_BUY',
  BUY = 'BUY',
  HOLD = 'HOLD',
  SELL = 'SELL',
  STRONG_SELL = 'STRONG_SELL'
}

export interface AnalystRecommendation {
  symbol: string;
  name: string;
  recommendation: RecommendationType;
  targetPrice: string;
  currentPrice: string;
  upside: string;
  analystCount: number;
  lastUpdated: string;
  rationale: string;
}

// Stock Forecast
export enum PeriodType {
  SHORT_TERM = 'SHORT_TERM',
  MEDIUM_TERM = 'MEDIUM_TERM',
  LONG_TERM = 'LONG_TERM'
}

export enum DataType {
  PRICE = 'PRICE',
  VOLUME = 'VOLUME',
  VOLATILITY = 'VOLATILITY'
}

export interface StockForecast {
  symbol: string;
  name: string;
  period: PeriodType;
  dataType: DataType;
  currentValue: string;
  forecastValue: string;
  confidence: string;
  lastUpdated: string;
}

// Historical Data
export interface HistoricalData {
  symbol: string;
  date: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  adjustedClose: string;
}

// Historical Stats
export interface HistoricalStats {
  symbol: string;
  period: string;
  averagePrice: string;
  averageVolume: string;
  volatility: string;
  beta: string;
  correlation: string;
  sharpeRatio: string;
} 
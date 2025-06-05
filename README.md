# Indian Stock Exchange Dashboard

A modern React-based dashboard for tracking Indian stock market data, including real-time stock prices, market trends, and financial information.

## Features

- **Real-time Stock Search**: Search and view live stock prices from BSE and NSE
- **Market Overview**: 
  - Trending Stocks
  - NSE Most Active Stocks
  - BSE Most Active Stocks
  - Price Shockers
  - Commodity Futures
- **Detailed Stock Information**:
  - Current BSE/NSE Prices
  - Price Change Percentage
  - 52-Week High/Low
  - Performance Metrics

## Tech Stack

- **Frontend**: React with TypeScript
- **UI Framework**: Material-UI (MUI)
- **State Management**: React Hooks
- **API Integration**: Axios
- **Development Tools**: 
  - Create React App
  - TypeScript
  - ESLint
  - Prettier

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/indian-stock-exchange.git
cd indian-stock-exchange
```

2. Navigate to the frontend directory:
```bash
cd india-stock-frontend
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:5000`

## Project Structure

```
india-stock-frontend/
├── public/
├── src/
│   ├── components/         # React components
│   ├── services/          # API services
│   ├── types/            # TypeScript type definitions
│   ├── App.tsx           # Main application component
│   └── index.tsx         # Application entry point
├── package.json
└── tsconfig.json
```

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App

## API Integration

The application integrates with the Indian Stock Exchange API for real-time market data. It includes:
- Stock price lookups
- Market trends
- Company information
- Historical data

For development purposes, the application includes mock data for common stocks (RELIANCE, TCS, INFY) when the API is unavailable.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Indian Stock Exchange API for providing market data
- Material-UI team for the excellent UI components
- React community for the amazing tools and libraries

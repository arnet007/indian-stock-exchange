# Indian Stock Exchange MCP Server

MCP Server for providing detailed financial data for companies listed on the Bombay Stock Exchange (BSE) and National Stock Exchange (NSE), empowering users with comprehensive insights into the dynamic Indian stock market.

For more details, visit - [Indian Stock Market API](https://indianapi.in/indian-stock-market)

## Tools

(For API details, please visit - [Indian Stock Market API](https://indianapi.in/indian-stock-market))

- **get-market-news** - Get the latest market news  
- **get-news** - Get Indian Stock Exchange News  
- **get-stock-details** - Get details for a specific stock  
- **get-stock-history** - Get historical data for a specific stock  
- **get-stock-price** - Get the latest stock price for a specific stock  
- **get-stock-recommendations** - Get stock recommendations based on market trends  
- **get-top-gainers** - Get the top gaining stocks  
- **get-top-losers** - Get the top losing stocks  

## Setup

### 1. Download the Repo and Update API Key
Clone the repository and update the API key in `src/.env`:

```sh
ISE_API_KEY=your_api_key_here
```
### 2. Install Packages and Build
Run the following commands to install dependencies and build the project:

```sh
npm install
npm run build
```

### 3. Installing on Claude Desktop
Before starting, ensure Node.js is installed on your desktop for npx to work.

Go to: Settings > Developer > Edit Config

Add the following to your claude_desktop_config.json:

```sh
{
  "mcpServers": {
    "IndiaStockExchange": {
      "command": "node",
      "args": [
        "<path_to_project>/build/index.js"
      ]
    }
  }
}
```

### 4. Restart Claude Desktop
After updating the configuration, restart Claude Desktop to apply the changes.

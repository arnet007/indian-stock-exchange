import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const BASE_URL = "https://stock.indianapi.in";
const USER_AGENT = "ise-app/1.0";

// Create server instance
const server = new McpServer({
  name: "ISE",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

// Helper function for making NWS API requests
async function makeNWSRequest<T>(url: string): Promise<T | null> {
  const headers = {
    'x-api-key':<Indian Stock Exchange API Key>
  };

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return (await response.json()) as T;
  } catch (error) {
    console.error("Error making NWS request:", error);
    return null;
  }
}


// Register news tools
server.tool(
  "get-news",
  "Get Indian Stock Exchange News",
  {
  },
  async ({}) => {
    const stockURL = BASE_URL + '/news';
    const stockNews = await makeNWSRequest(stockURL);

    if (!stockNews) {
      return {
        content: [
          {
            type: "text",
            text: "Failed to retrieve stock news",
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(stockNews, null, 2),
        },
      ],
    };
  },
);

// 1. Stock Details Tool with Zod
server.tool(
  "get-stock-details",
  "Get details for a specific stock",
  {
    name: z.string().describe("Name of the stock (e.g. 'Tata Steel')")
  },
  async ({ name }) => {
    const stockURL = `${BASE_URL}/stock/details?name=${encodeURIComponent(name)}`;
    const stockDetails = await makeNWSRequest(stockURL);

    if (!stockDetails) {
      return {
        content: [{
          type: "text",
          text: "Failed to retrieve stock details",
        }],
      };
    }

    return {
      content: [{
        type: "text",
        text: JSON.stringify(stockDetails, null, 2),
      }],
    };
  }
);

// 2. Stock Price Tool with Zod
server.tool(
  "get-stock-price",
  "Get the latest stock price for a specific stock",
  {
    name: z.string().describe("Name of the stock (e.g. 'Reliance Industries')")
  },
  async ({ name }) => {
    const stockPriceURL = `${BASE_URL}/stock/price?name=${encodeURIComponent(name)}`;
    const stockPrice = await makeNWSRequest(stockPriceURL);

    if (!stockPrice) {
      return {
        content: [{
          type: "text",
          text: "Failed to retrieve stock price",
        }],
      };
    }

    return {
      content: [{
        type: "text",
        text: JSON.stringify(stockPrice, null, 2),
      }],
    };
  }
);

// 3. Market News Tool with Zod
server.tool(
  "get-market-news",
  "Get the latest market news",
  {},
  async () => {
    const newsURL = `${BASE_URL}/market/news`;
    const marketNews = await makeNWSRequest(newsURL);

    if (!marketNews) {
      return {
        content: [{
          type: "text",
          text: "Failed to retrieve market news",
        }],
      };
    }

    return {
      content: [{
        type: "text",
        text: JSON.stringify(marketNews, null, 2),
      }],
    };
  }
);

// 4. Stock Historical Data Tool with Zod
server.tool(
  "get-stock-history",
  "Get historical data for a specific stock",
  {
    name: z.string().describe("Name of the stock (e.g. 'Infosys')"),
    period: z.string().describe("Time period (e.g. '1m', '6m', '1y')")
  },
  async ({ name, period }) => {
    const historyURL = `${BASE_URL}/stock/history?name=${encodeURIComponent(name)}&period=${encodeURIComponent(period)}`;
    const historyData = await makeNWSRequest(historyURL);

    if (!historyData) {
      return {
        content: [{
          type: "text",
          text: "Failed to retrieve historical data",
        }],
      };
    }

    return {
      content: [{
        type: "text",
        text: JSON.stringify(historyData, null, 2),
      }],
    };
  }
);

// 5. Top Gainers Tool with Zod
server.tool(
  "get-top-gainers",
  "Get the top gaining stocks",
  {},
  async () => {
    const gainersURL = `${BASE_URL}/stock/gainers`;
    const topGainers = await makeNWSRequest(gainersURL);

    if (!topGainers) {
      return {
        content: [{
          type: "text",
          text: "Failed to retrieve top gainers",
        }],
      };
    }

    return {
      content: [{
        type: "text",
        text: JSON.stringify(topGainers, null, 2),
      }],
    };
  }
);

// 6. Top Losers Tool with Zod
server.tool(
  "get-top-losers",
  "Get the top losing stocks",
  {},
  async () => {
    const losersURL = `${BASE_URL}/stock/losers`;
    const topLosers = await makeNWSRequest(losersURL);

    if (!topLosers) {
      return {
        content: [{
          type: "text",
          text: "Failed to retrieve top losers",
        }],
      };
    }

    return {
      content: [{
        type: "text",
        text: JSON.stringify(topLosers, null, 2),
      }],
    };
  }
);

// 7. Stock Recommendations Tool with Zod
server.tool(
  "get-stock-recommendations",
  "Get stock recommendations based on market trends",
  {},
  async () => {
    const recommendationsURL = `${BASE_URL}/stock/recommendations`;
    const stockRecommendations = await makeNWSRequest(recommendationsURL);

    if (!stockRecommendations) {
      return {
        content: [{
          type: "text",
          text: "Failed to retrieve stock recommendations",
        }],
      };
    }

    return {
      content: [{
        type: "text",
        text: JSON.stringify(stockRecommendations, null, 2),
      }],
    };
  }
);


async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("ISE MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});

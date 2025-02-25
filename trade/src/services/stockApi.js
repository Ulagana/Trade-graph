// const API_KEY = "YOUR_ALPHA_VANTAGE_API_KEY"; // Replace with your actual Alpha Vantage API key

// export const fetchStockData = async (symbol, timeframe) => {
//   try {
//     let url;
//     switch (timeframe) {
//       case "1M":
//         url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`;
//         break;
//       case "1Y":
//         url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`;
//         break;
//       case "5Y":
//         url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${API_KEY}`;
//         break;
//       default:
//         url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`;
//     }

//     console.log(`Fetching data from: ${url}`);
//     const response = await fetch(url);
//     const data = await response.json();
//     console.log("API Response:", data);

//     let timeSeries;
//     if (timeframe === "1M") timeSeries = data["Time Series (5min)"];
//     else if (timeframe === "1Y") timeSeries = data["Time Series (Daily)"];
//     else timeSeries = data["Time Series (Monthly)"];

//     if (!timeSeries) {
//       console.warn("No time series data in response:", data);
//       throw new Error("No time series data available");
//     }

//     const formattedData = Object.entries(timeSeries)
//       .map(([timestamp, values]) => ({
//         timestamp,
//         price: Number.parseFloat(values["4. close"]),
//       }))
//       .reverse()
//       .slice(0, timeframe === "1M" ? 50 : timeframe === "1Y" ? 252 : 60);

//     console.log("Formatted Data:", formattedData);
//     return formattedData;
//   } catch (error) {
//     console.error("Error fetching stock data:", error);
//     return []; // Return empty array to trigger mock data in StockGraph
//   }
// };
const API_KEY = "YOUR_ALPHA_VANTAGE_API_KEY"; // Replace with your actual Alpha Vantage API key

export const fetchStockData = async (symbol, timeframe) => {
  try {
    // Append .NS for Indian stocks if needed
    const isIndianStock = [
      "RELIANCE",
      "TCS",
      "HDFCBANK",
      "INFY",
      "SBIN",
      "BAJFINANCE",
      "HINDUNILVR",
    ].includes(symbol);
    const apiSymbol = isIndianStock ? `${symbol}.NS` : symbol;

    let url;
    switch (timeframe) {
      case "1M":
        url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${apiSymbol}&interval=5min&apikey=${API_KEY}`;
        break;
      case "1Y":
        url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${apiSymbol}&apikey=${API_KEY}`;
        break;
      case "5Y":
        url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${apiSymbol}&apikey=${API_KEY}`;
        break;
      default:
        url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${apiSymbol}&interval=5min&apikey=${API_KEY}`;
    }

    console.log(`Fetching data for ${symbol} from: ${url}`);
    const response = await fetch(url);
    const data = await response.json();
    console.log(`API Response for ${symbol}:`, data);

    let timeSeries;
    if (timeframe === "1M") timeSeries = data["Time Series (5min)"];
    else if (timeframe === "1Y") timeSeries = data["Time Series (Daily)"];
    else timeSeries = data["Time Series (Monthly)"];

    if (!timeSeries) {
      console.warn(`No time series data for ${symbol}:`, data);
      throw new Error("No time series data available");
    }

    const formattedData = Object.entries(timeSeries)
      .map(([timestamp, values]) => ({
        timestamp,
        price: Number.parseFloat(values["4. close"]),
      }))
      .reverse()
      .slice(0, timeframe === "1M" ? 50 : timeframe === "1Y" ? 252 : 60);

    console.log(`Formatted Data for ${symbol}:`, formattedData);
    return formattedData;
  } catch (error) {
    console.error(`Error fetching stock data for ${symbol}:`, error);
    return [];
  }
};
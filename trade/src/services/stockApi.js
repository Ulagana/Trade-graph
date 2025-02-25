// const API_KEY = "YOUR_ALPHA_VANTAGE_API_KEY" // Replace with your actual API key

// export const fetchStockData = async (symbol) => {
//   try {
//     const response = await fetch(
//       `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`,
//     )
//     const data = await response.json()
//     const timeSeries = data["Time Series (5min)"]

//     return Object.entries(timeSeries)
//       .map(([timestamp, values]) => ({
//         timestamp,
//         price: Number.parseFloat(values["4. close"]),
//       }))
//       .reverse()
//       .slice(0, 50) // Get the last 50 data points
//   } catch (error) {
//     console.error("Error fetching stock data:", error)
//     return []
//   }
// }

const API_KEY = "YOUR_ALPHA_VANTAGE_API_KEY"; // Replace with your actual Alpha Vantage API key

export const fetchStockData = async (symbol, timeframe) => {
  try {
    let url;
    switch (timeframe) {
      case "1M":
        url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`;
        break;
      case "1Y":
        url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`;
        break;
      case "5Y":
        url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${API_KEY}`;
        break;
      default:
        url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    let timeSeries;
    if (timeframe === "1M") timeSeries = data["Time Series (5min)"];
    else if (timeframe === "1Y") timeSeries = data["Time Series (Daily)"];
    else timeSeries = data["Time Series (Monthly)"];

    if (!timeSeries) throw new Error("No data available");

    return Object.entries(timeSeries)
      .map(([timestamp, values]) => ({
        timestamp,
        price: Number.parseFloat(values["4. close"]),
      }))
      .reverse()
      .slice(0, timeframe === "1M" ? 50 : timeframe === "1Y" ? 252 : 60); // Adjust data points
  } catch (error) {
    console.error("Error fetching stock data:", error);
    return [];
  }
};
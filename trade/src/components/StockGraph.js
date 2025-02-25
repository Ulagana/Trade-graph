// "use client"

// import { useState, useEffect } from "react"
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
// import StockSelector from "./StockSelector"
// import { fetchStockData } from "../services/stockApi"

// const StockGraph = () => {
//   const [stockData, setStockData] = useState([])
//   const [selectedStock, setSelectedStock] = useState("AAPL")

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await fetchStockData(selectedStock)
//       setStockData(data)
//     }

//     fetchData()
//     const interval = setInterval(fetchData, 60000) // Fetch data every minute

//     return () => clearInterval(interval)
//   }, [selectedStock])

//   const handleStockChange = (newStock) => {
//     setSelectedStock(newStock)
//   }

//   return (
//     <div className="stock-graph">
//       <StockSelector onStockChange={handleStockChange} selectedStock={selectedStock} />
//       <ResponsiveContainer width="100%" height={400}>
//         <LineChart data={stockData}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="timestamp" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   )
// }

// export default StockGraph

"use client";

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import StockSelector from "./StockSelector";
import { fetchStockData } from "../services/stockApi";

const StockGraph = () => {
  const [stockData, setStockData] = useState([]);
  const [selectedStock, setSelectedStock] = useState("AAPL");
  const [timeframe, setTimeframe] = useState("1M"); // 1M, 1Y, 5Y
  const [priceChange, setPriceChange] = useState({ current: 0, change: 0 });
  const [sipReturns, setSipReturns] = useState(0);
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchStockData(selectedStock, timeframe);
      setStockData(data);

      // Calculate price change
      if (data.length > 1) {
        const latestPrice = data[data.length - 1].price;
        const earliestPrice = data[0].price;
        setPriceChange({
          current: latestPrice,
          change: latestPrice - earliestPrice,
        });

        // Calculate SIP returns (simplified: monthly investment * avg growth)
        const monthlyInvestment = 100; // Example: $100/month
        const avgPrice = data.reduce((sum, d) => sum + d.price, 0) / data.length;
        const periods = timeframe === "1M" ? 1 : timeframe === "1Y" ? 12 : 60;
        setSipReturns((monthlyInvestment * periods * (latestPrice / avgPrice)).toFixed(2));

        // Basic future prediction (linear extrapolation)
        const slope = (latestPrice - data[data.length - 2].price) / 5; // 5-min interval
        setPrediction((latestPrice + slope * 12).toFixed(2)); // Predict 1 hour ahead
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [selectedStock, timeframe]);

  const handleStockChange = (newStock) => setSelectedStock(newStock);
  const handleTimeframeChange = (newTimeframe) => setTimeframe(newTimeframe);

  return (
    <div className="stock-graph p-6 bg-gray-900 text-white rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <StockSelector onStockChange={handleStockChange} selectedStock={selectedStock} />
        <div className="flex gap-2">
          {["1M", "1Y", "5Y"].map((tf) => (
            <button
              key={tf}
              onClick={() => handleTimeframeChange(tf)}
              className={`px-4 py-2 rounded-full ${
                timeframe === tf ? "bg-blue-600" : "bg-gray-700"
              } hover:bg-blue-500 transition`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Price Info */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold">
          {selectedStock} - ${priceChange.current.toFixed(2)}
          <span
            className={`ml-2 text-lg ${
              priceChange.change >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {priceChange.change >= 0 ? "+" : ""}
            {priceChange.change.toFixed(2)}
          </span>
        </h2>
        <p className="text-sm text-gray-400">
          SIP Returns ({timeframe}): ${sipReturns}
        </p>
        <p className="text-sm text-gray-400">1-Hour Prediction: ${prediction}</p>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={stockData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="timestamp" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip
            contentStyle={{ backgroundColor: "#333", border: "none" }}
            labelStyle={{ color: "#fff" }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockGraph;
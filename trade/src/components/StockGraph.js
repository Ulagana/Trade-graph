// "use client";

// import { useState, useEffect } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import StockSelector from "./StockSelector";
// import { fetchStockData } from "../services/stockApi";

// // Mock data for testing (unique per stock)
// const getMockData = (stock) => {
//   const basePrice = stock === "TSLA" ? 150 : stock === "AAPL" ? 170 : 100; // Differentiate by stock
//   return Array.from({ length: 50 }, (_, i) => ({
//     timestamp: new Date(Date.now() - i * 5 * 60 * 1000).toISOString().slice(0, 16),
//     price: basePrice + Math.sin(i / 5) * 10 + Math.random() * 5,
//   }));
// };

// const StockGraph = () => {
//   const [stockData, setStockData] = useState([]);
//   const [selectedStock, setSelectedStock] = useState("AAPL"); // Matches US default  const [timeframe, setTimeframe] = useState("1M");
//   const [priceChange, setPriceChange] = useState({ current: 0, change: 0 });
//   const [sipReturns, setSipReturns] = useState(0);
//   const [prediction, setPrediction] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       // Reset all states to avoid stale data
//       setLoading(true);
//       setError(null);
//       setStockData([]);
//       setPriceChange({ current: 0, change: 0 });
//       setSipReturns(0);
//       setPrediction(null);

//       try {
//         const data = await fetchStockData(selectedStock, timeframe);
//         if (!data || data.length === 0) {
//           console.warn(`No data for ${selectedStock}, using mock data.`);
//           processData(getMockData(selectedStock));
//         } else {
//           processData(data);
//         }
//       } catch (err) {
//         setError(`Error fetching ${selectedStock} data. Using mock data.`);
//         console.error(err);
//         processData(getMockData(selectedStock));
//       } finally {
//         setLoading(false);
//       }
//     };

//     const processData = (data) => {
//       console.log(`Processing data for ${selectedStock}:`, data); // Debug log
//       setStockData(data);
//       if (data.length > 1) {
//         const latestPrice = data[data.length - 1].price;
//         const earliestPrice = data[0].price;
//         const change = latestPrice - earliestPrice;
//         setPriceChange({ current: latestPrice, change });

//         const monthlyInvestment = 100;
//         const avgPrice = data.reduce((sum, d) => sum + d.price, 0) / data.length;
//         const periods = timeframe === "1M" ? 1 : timeframe === "1Y" ? 12 : 60;
//         const sip = (monthlyInvestment * periods * (latestPrice / avgPrice)).toFixed(2);
//         setSipReturns(sip);

//         const slope = (latestPrice - data[data.length - 2].price) / 5;
//         const pred = (latestPrice + slope * 12).toFixed(2);
//         setPrediction(pred);

//         console.log(`Updated states for ${selectedStock} - Price: ${latestPrice}, Change: ${change}, SIP: ${sip}, Prediction: ${pred}`);
//       }
//     };

//     fetchData();
//     const interval = setInterval(fetchData, 300000); // 5 minutes

//     return () => clearInterval(interval);
//   }, [selectedStock, timeframe]);

//   const handleStockChange = (newStock) => {
//     console.log(`Switching to stock: ${newStock}`);
//     setSelectedStock(newStock);
//   };

//   const handleTimeframeChange = (newTimeframe) => {
//     console.log(`Switching to timeframe: ${newTimeframe}`);
//     setTimeframe(newTimeframe);
//   };

//   return (
//     <div className="stock-graph p-6 bg-gray-900 text-white rounded-lg shadow-lg max-w-4xl mx-auto">
//       <div className="flex justify-between items-center mb-4">
//         <StockSelector onStockChange={handleStockChange} selectedStock={selectedStock} />
//         <div className="flex gap-2">
//           {["1M", "1Y", "5Y"].map((tf) => (
//             <button
//               key={tf}
//               onClick={() => handleTimeframeChange(tf)}
//               className={`px-4 py-2 rounded-full ${
//                 timeframe === tf ? "bg-blue-600" : "bg-gray-700"
//               } hover:bg-blue-500 transition`}
//             >
//               {tf}
//             </button>
//           ))}
//         </div>
//       </div>

//       {loading && <div className="text-center text-gray-400 mb-4">Loading...</div>}
//       {error && <div className="text-center text-red-400 mb-4">{error}</div>}

//       {!loading && (
//         <div className="mb-4">
//           <h2 className="text-2xl font-bold">
//             {selectedStock} - ${priceChange.current.toFixed(2)}
//             <span
//               className={`ml-2 text-lg ${
//                 priceChange.change >= 0 ? "text-green-500" : "text-red-500"
//               }`}
//             >
//               {priceChange.change >= 0 ? "+" : ""}
//               {priceChange.change.toFixed(2)}
//             </span>
//           </h2>
//           <p className="text-sm text-gray-400">
//             SIP Returns ({timeframe}): ${sipReturns}
//           </p>
//           <p className="text-sm text-gray-400">
//             1-Hour Prediction: ${prediction || "N/A"}
//           </p>
//         </div>
//       )}

//       <ResponsiveContainer width="100%" height={400}>
//         <LineChart data={stockData}>
//           <CartesianGrid strokeDasharray="3 3" stroke="#444" />
//           <XAxis dataKey="timestamp" stroke="#fff" />
//           <YAxis stroke="#fff" />
//           <Tooltip
//             contentStyle={{ backgroundColor: "#333", border: "none" }}
//             labelStyle={{ color: "#fff" }}
//           />
//           <Legend />
//           <Line
//             type="monotone"
//             dataKey="price"
//             stroke="#8884d8"
//             activeDot={{ r: 8 }}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default StockGraph;

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
  const [timeframe, setTimeframe] = useState("1M");
  const [priceChange, setPriceChange] = useState({ current: 0, change: 0 });
  const [sipReturns, setSipReturns] = useState(0);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setStockData([]);
      setPriceChange({ current: 0, change: 0 });
      setSipReturns(0);
      setPrediction(null);

      try {
        const data = await fetchStockData(selectedStock, timeframe);
        if (!data || data.length === 0) {
          console.warn(`No data for ${selectedStock}, using mock data.`);
          processData(getMockData(selectedStock));
        } else {
          processData(data);
        }
      } catch (err) {
        setError(`Error fetching ${selectedStock} data. Using mock data.`);
        console.error(err);
        processData(getMockData(selectedStock));
      } finally {
        setLoading(false);
      }
    };

    const getMockData = (stock) => {
      const basePrice = indianStocks.includes(stock) ? 2000 : 150;
      return Array.from({ length: 50 }, (_, i) => ({
        timestamp: new Date(Date.now() - i * 5 * 60 * 1000).toISOString().slice(0, 16),
        price: basePrice + Math.sin(i / 5) * 10 + Math.random() * 5,
      }));
    };

    const processData = (data) => {
      setStockData(data);
      if (data.length > 1) {
        const latestPrice = data[data.length - 1].price;
        const earliestPrice = data[0].price;
        const change = latestPrice - earliestPrice;
        setPriceChange({ current: latestPrice, change });

        const monthlyInvestment = 100;
        const avgPrice = data.reduce((sum, d) => sum + d.price, 0) / data.length;
        const periods = timeframe === "1M" ? 1 : timeframe === "1Y" ? 12 : 60;
        const sip = (monthlyInvestment * periods * (latestPrice / avgPrice)).toFixed(2);
        setSipReturns(sip);

        const slope = (latestPrice - data[data.length - 2].price) / 5;
        const pred = (latestPrice + slope * 12).toFixed(2);
        setPrediction(pred);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 300000);

    return () => clearInterval(interval);
  }, [selectedStock, timeframe]);

  const handleStockChange = (newStock) => {
    console.log(`Switching to stock: ${newStock}`);
    setSelectedStock(newStock);
  };

  const handleTimeframeChange = (newTimeframe) => setTimeframe(newTimeframe);

  return (
    <div className="stock-graph w-full max-w-5xl mx-auto p-4 md:p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl shadow-2xl my-4 mt-3">
      {/* Header Section */}
      <div></div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <StockSelector onStockChange={handleStockChange} selectedStock={selectedStock} />
        <div className="flex flex-wrap gap-2">
          {["1M", "1Y", "5Y"].map((tf) => (
            <button
              key={tf}
              onClick={() => handleTimeframeChange(tf)}
              className={`px-3 py-1 md:px-4 md:py-2 rounded-full text-sm md:text-base font-medium ${
                timeframe === tf ? "bg-blue-600" : "bg-gray-700"
              } hover:bg-blue-500 transition duration-200`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Loading/Error States */}
      {loading && (
        <div className="text-center text-gray-400 text-lg py-10">Loading stock data...</div>
      )}
      {error && (
        <div className="text-center text-red-400 text-lg py-10">{error}</div>
      )}

      {/* Stock Report Section */}
      {!loading && !error && (
        <div className="space-y-6">
          <div className="bg-gray-800 p-4 rounded-lg shadow-inner">
            <h2 className="text-xl md:text-2xl font-semibold flex items-center gap-2">
              <span>{selectedStock}</span>
              <span className="text-2xl md:text-3xl">
                {indianStocks.includes(selectedStock) ? "₹" : "$"}
                {priceChange.current.toFixed(2)}
              </span>
              <span
                className={`text-lg md:text-xl ${
                  priceChange.change >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {priceChange.change >= 0 ? "+" : ""}
                {priceChange.change.toFixed(2)}
              </span>
            </h2>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm md:text-base">
              <p className="bg-gray-700 p-2 rounded-md">
                <span className="font-medium text-gray-300">SIP Returns ({timeframe}):</span>{" "}
                <span className="text-blue-400">
                  {indianStocks.includes(selectedStock) ? "₹" : "$"}
                  {sipReturns}
                </span>
              </p>
              <p className="bg-gray-700 p-2 rounded-md">
                <span className="font-medium text-gray-300">1-Hour Prediction:</span>{" "}
                <span className="text-blue-400">
                  {indianStocks.includes(selectedStock) ? "₹" : "$"}
                  {prediction || "N/A"}
                </span>
              </p>
            </div>
          </div>

          {/* Chart Section */}
          <div className="bg-gray-800 p-2 rounded-lg shadow-inner">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={stockData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis
                  dataKey="timestamp"
                  stroke="#fff"
                  tick={{ fill: "#fff", fontSize: 12 }}
                  interval="preserveStartEnd"
                />
                <YAxis
                  stroke="#fff"
                  tick={{ fill: "#fff", fontSize: 12 }}
                  domain={["auto", "auto"]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#333",
                    border: "none",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#fff" }}
                  itemStyle={{ color: "#fff" }}
                />
                <Legend wrapperStyle={{ color: "#fff", paddingTop: "10px" }} />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockGraph;

const indianStocks = ["RELIANCE", "TCS", "HDFCBANK", "INFY", "SBIN", "BAJFINANCE", "HINDUNILVR"];;
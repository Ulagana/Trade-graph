// const stocks = ["AAPL", "GOOGL", "MSFT", "AMZN", "META", "TSLA", "NVDA"];

// const StockSelector = ({ onStockChange, selectedStock }) => {
//   return (
//     <div className="stock-selector">
//       <label htmlFor="stock-select" className="text-gray-300 mr-2 font-medium">
//         Select Stock:
//       </label>
//       <select
//         id="stock-select"
//         value={selectedStock}
//         onChange={(e) => onStockChange(e.target.value)}
//         className="bg-gray-700 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//       >
//         {stocks.map((stock) => (
//           <option key={stock} value={stock}>
//             {stock}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default StockSelector;
import { useState } from "react";

const usStocks = ["AAPL", "GOOGL", "MSFT", "AMZN", "META", "TSLA", "NVDA"];
const indianStocks = ["RELIANCE", "TCS", "HDFCBANK", "INFY", "SBIN", "BAJFINANCE", "HINDUNILVR"];

const StockSelector = ({ onStockChange, selectedStock }) => {
  const [category, setCategory] = useState("US"); // Default to US stocks
  const [stock, setStock] = useState(selectedStock || usStocks[0]); // Default to first US stock

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    // Set default stock for the new category
    const newStock = newCategory === "US" ? usStocks[0] : indianStocks[0];
    setStock(newStock);
    onStockChange(newStock); // Notify parent component
  };

  const handleStockChange = (e) => {
    const newStock = e.target.value;
    setStock(newStock);
    onStockChange(newStock); // Notify parent component
  };

  return (
    <div className="stock-selector flex gap-4">
      {/* Category Dropdown */}
      <div>
        <label htmlFor="category-select" className="text-gray-300 mr-2 font-medium">
          Region:
        </label>
        <select
          id="category-select"
          value={category}
          onChange={handleCategoryChange}
          className="bg-gray-700 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="US">US Stocks</option>
          <option value="IN">Indian Stocks</option>
        </select>
      </div>

      {/* Stock Dropdown */}
      <div>
        <label htmlFor="stock-select" className="text-gray-300 mr-2 font-medium">
          Select Stock:
        </label>
        <select
          id="stock-select"
          value={stock}
          onChange={handleStockChange}
          className="bg-gray-700 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          {(category === "US" ? usStocks : indianStocks).map((stockOption) => (
            <option key={stockOption} value={stockOption}>
              {stockOption}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default StockSelector;
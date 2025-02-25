// const stocks = ["AAPL", "GOOGL", "MSFT", "AMZN", "FB"]

// const StockSelector = ({ onStockChange, selectedStock }) => {
//   return (
//     <div className="stock-selector">
//       <label htmlFor="stock-select">Select a stock: </label>
//       <select id="stock-select" value={selectedStock} onChange={(e) => onStockChange(e.target.value)}>
//         {stocks.map((stock) => (
//           <option key={stock} value={stock}>
//             {stock}
//           </option>
//         ))}
//       </select>
//     </div>
//   )
// }

// export default StockSelector

const stocks = ["AAPL", "GOOGL", "MSFT", "AMZN", "META", "TSLA", "NVDA"];

const StockSelector = ({ onStockChange, selectedStock }) => {
  return (
    <div className="stock-selector">
      <label htmlFor="stock-select" className="text-gray-300 mr-2">
        Select a stock:
      </label>
      <select
        id="stock-select"
        value={selectedStock}
        onChange={(e) => onStockChange(e.target.value)}
        className="bg-gray-800 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {stocks.map((stock) => (
          <option key={stock} value={stock}>
            {stock}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StockSelector;
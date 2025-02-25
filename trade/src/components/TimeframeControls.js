import { motion } from "framer-motion";

const TimeframeControls = ({ timeframe, onTimeframeChange }) => {
  const timeframes = ["1M", "1Y", "5Y"];

  return (
    <div className="flex gap-2">
      {timeframes.map((tf) => (
        <motion.button
          key={tf}
          onClick={() => onTimeframeChange(tf)}
          className={`px-4 py-2 rounded-full text-sm font-semibold ${
            timeframe === tf ? "bg-blue-600" : "bg-gray-700"
          } hover:bg-blue-500 transition-colors`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {tf}
        </motion.button>
      ))}
    </div>
  );
};

export default TimeframeControls;
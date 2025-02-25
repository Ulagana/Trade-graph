import { motion } from "framer-motion";

const PriceInfo = ({ current, change, sip, prediction, stock }) => {
  return (
    <motion.div
      className="mb-6 p-4 bg-gray-800 rounded-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold">
        {stock} - ${current.toFixed(2)}
        <span
          className={`ml-3 text-xl ${
            change >= 0 ? "text-green-400" : "text-red-400"
          }`}
        >
          {change >= 0 ? "+" : ""}
          {change.toFixed(2)}
        </span>
      </h2>
      <div className="mt-2 text-sm text-gray-300 flex gap-4">
        <p>
          SIP Returns: <span className="text-blue-400">${sip}</span>
        </p>
        <p>
          1-Hour Prediction: <span className="text-blue-400">${prediction}</span>
        </p>
      </div>
    </motion.div>
  );
};

export default PriceInfo;
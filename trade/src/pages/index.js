import StockGraph from "../components/StockGraph";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <StockGraph />
    </div>
  );
}
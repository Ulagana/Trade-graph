import StockGraph from "./components/StockGraph"
import "./App.css"

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-center items-center me-3">
          <h1 className="text-xl sm:text-2xl font-bold text-blue-500 me-2">Ulaganathan G</h1>
          <h2 className="text-lg sm:text-xl font-semibold text-secondory-300 items-end me-2">Live Stock Reports</h2>
        </div>      </header>
      <main>
        <StockGraph />
      </main>
    </div>
  )
}

export default App


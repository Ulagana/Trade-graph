import StockGraph from "./components/StockGraph"
import "./App.css"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Real-Time Stock Graph</h1>
      </header>
      <main>
        <StockGraph />
      </main>
    </div>
  )
}

export default App


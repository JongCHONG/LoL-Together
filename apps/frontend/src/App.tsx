import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <h1>LoL-Together Frontend</h1>
        <p>
          Frontend React + TypeScript pour LoL-Together
        </p>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            Count is {count}
          </button>
          <p>
            Éditez <code>src/App.tsx</code> et sauvegardez pour recharger.
          </p>
        </div>
        <p className="read-the-docs">
          Cliquez sur le logo Vite et React pour en savoir plus
        </p>
      </header>
    </div>
  )
}

export default App

import { useState } from 'react'
import ForceGraph from './components/ForceGraph'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ForceGraph></ForceGraph>
    </>
  )
}

export default App

import { useState } from 'react'
import './App.css'
import Home_wrapper from './pages/home/home_wrapper'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Home_wrapper/>
    </>
  )
}

export default App

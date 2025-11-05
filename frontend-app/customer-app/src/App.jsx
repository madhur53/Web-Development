import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Customers from './components/Customers'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Customers />
    </>
  )
}

export default App

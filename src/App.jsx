import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TaskQuicklist from "./TaskQuicklist";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <TaskQuicklist />
    </>
  )
}

export default App

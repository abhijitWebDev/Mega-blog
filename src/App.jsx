import { useState } from 'react'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)
  console.log(import.meta.env.VITE_APPWRITE_URL)

  return (
    <>
     <h1 className="text-white bg-orange-950 text-center p-4">The mega blog project</h1>
    </>
  )
}

export default App

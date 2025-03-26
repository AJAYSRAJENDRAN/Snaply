import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './modules/Authentication/LoginPage'

import Router from './Router'
import Navbar from './components/Navbar'
import Feeds from './components/Feeds'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Router/>
   
    </>
  )
}

export default App

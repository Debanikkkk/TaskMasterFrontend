import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import LoginPage from './components/LoginPage/LoginPage'
// import LoginPage from './components/LoginPage/LoginPage'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard'
import WorkspacePage from './components/WorkspacePage/WorkspacePage'
// import LoginPage from './components/LoginPage/LoginPage.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/workspace/:workspaceId' element={<WorkspacePage/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

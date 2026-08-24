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
import { initialWorkspaces, tasks } from './components/data'
// import LoginPage from './components/LoginPage/LoginPage.jsx'

function App() {
  const [count, setCount] = useState(0)
  const [workspaceState, setWorkspaceState] = useState(initialWorkspaces)
  const [taskState, setTaskState] = useState(tasks)

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/dashboard' element={<Dashboard workspaces={workspaceState} setWorkspaces={setWorkspaceState} tasks={taskState} />}/>
        <Route path='/workspace/:workspaceId' element={<WorkspacePage workspaces={workspaceState} tasks={taskState} setTasks={setTaskState} />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

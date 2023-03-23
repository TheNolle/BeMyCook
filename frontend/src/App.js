import { Route, Routes } from 'react-router-dom'

import './App.scss'

import Home from './pages/Home'
import Login from './pages/Login'
import Recipe from './pages/Recipe'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/recipe" exact element={<Recipe />} />
      </Routes>
    </div>
  )
}

export default App
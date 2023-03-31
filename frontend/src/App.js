import { Route, Routes } from 'react-router-dom'

import './App.scss'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Generate from './pages/Generate'
import Recipes from './pages/Recipes'

export default function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/generate" exact element={<Generate />} />
        <Route path="/recipes" exact element={<Recipes />} />
      </Routes>
    </div>
  )
}

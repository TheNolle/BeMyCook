import React from 'react'
import { useNavigate } from 'react-router-dom'

import './Home.scss'

export default function Home() {
    const navigate = useNavigate()

    return (
        <div>
            <h1>Be My Cook</h1>
            <p>Be My Cook is a website that will help you find recipes based on the ingredients you have in your fridge. It will also help you find recipes based on your mood. You can also save your favorite recipes and share them with your friends.</p>
            <button onClick={() => navigate('/login')}>Login</button>
        </div>
    )
}

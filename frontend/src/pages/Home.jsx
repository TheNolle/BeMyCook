import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Home() {
    const [ingredients, setIngredients] = useState('')
    const [mood, setMood] = useState('')
    const [language, setLanguage] = useState('english')
    const navigate = useNavigate()

    const generateRecipe = async (e) => {
        e.preventDefault()
        try {
            if (!ingredients) return alert('Please specify ingredients')
            const response = await axios.post('http://localhost:5001/recipes/generate', { ingredients, mood, language })
            localStorage.setItem('recipe', response.data.recipe)
            navigate('/recipe')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <h1>Be My Cook</h1>
            <form onSubmit={generateRecipe}>
                <input type="text" placeholder="Ingredients" value={ingredients} onChange={(e) => setIngredients(e.target.value)} autoFocus />
                <input type="text" placeholder="Mood" value={mood} onChange={(e) => setMood(e.target.value)} />
                <select defaultValue="english" onChange={(e) => setLanguage(e.target.value)}>
                    <option value="english">English</option>
                    <option value="french">French</option>
                </select>
                <button>Generate Recipe</button>
            </form>
        </div>
    )
}

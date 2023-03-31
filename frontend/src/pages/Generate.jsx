import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

import './Generate.scss'

export default function Generate() {
    const [ingredients, setIngredients] = useState('')
    const [mood, setMood] = useState('')
    const [language, setLanguage] = useState('english')
    const [peoples, setPeoples] = useState(2)
    const [type, setType] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('token')) navigate('/login')
    }, [navigate])

    const generateRecipe = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        await axios.post('http://localhost:5001/recipes/generate', { ingredients, mood, language, peoples, type })
            .then((response) => {
                const data = response.data
                const recipe = JSON.parse(data.recipe)
                recipe.mood = mood
                const isGood = window.confirm(`Name: ${recipe.name}\nIngredients: ${recipe.ingredients.join(', ')}\nSteps:\n- ${recipe.steps.join('\n-')}\nTemps de préparation: ${recipe.time}\nPour ${recipe.peoples} personne(s)\nType: ${recipe.type}\nMood: ${recipe.mood}\nIs it good for you?`)
                if (isGood) {
                    data.id = uuidv4()
                    data.date = new Date().toISOString()
                    const recipes = JSON.parse(localStorage.getItem('recipes')) || []
                    recipes.push(data)
                    localStorage.setItem('recipes', JSON.stringify(recipes))
                    return navigate('/recipes')
                } else {
                    setIsLoading(false)
                    return generateRecipe(e)
                }
            })
            .catch((error) => {
                console.log(error)
                setIsLoading(false)
            })
    }

    return (
        <div>
            <h1>Be My Cook</h1>
            <form onSubmit={generateRecipe}>
                <input type="text" placeholder="Ingredients" value={ingredients} onChange={(e) => setIngredients(e.target.value)} autoFocus required disabled={isLoading} />
                <input type="text" placeholder="Mood" value={mood} onChange={(e) => setMood(e.target.value)} disabled={isLoading} />
                <input type="number" placeholder="2" value={peoples} onChange={(e) => setPeoples(e.target.value)} disabled={isLoading} />
                <input type="string" placeholder="Breakfast" value={type} onChange={(e) => setType(e.target.value)} disabled={isLoading} />
                <select defaultValue="english" onChange={(e) => setLanguage(e.target.value)} disabled={isLoading}>
                    <option value="english">English</option>
                    <option value="french">French</option>
                    <option value="swedish">Svenska</option>
                    <option value="german">German</option>
                </select>
                <button disabled={isLoading}>{isLoading ? 'Generating Recipe...' : 'Generate Recipe'}</button>
            </form>
        </div>
    )
}

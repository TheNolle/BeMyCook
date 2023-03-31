import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import './Recipes.scss'

export default function Recipes() {
    const [recipes, setRecipes] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        }
    }, [navigate])

    useEffect(() => {
        var recipes = JSON.parse(localStorage.getItem('recipes'))
        recipes ? recipes = recipes.reverse().map(recipe => { return { id: recipe.id, date: recipe.date, recipe: JSON.parse(recipe.recipe) } }) : recipes = []
        setRecipes(recipes)
    }, [])

    const deleteRecipe = async (id) => {
        const recipes = JSON.parse(localStorage.getItem('recipes')) || []
        const recipe = recipes.find(recipe => recipe.id === id)
        const index = recipes.indexOf(recipe)
        recipes.splice(index, 1)
        localStorage.setItem('recipes', JSON.stringify(recipes))
        setRecipes(recipes)
    }

    return (
        <div className="recipes">
            <h1>Be My Cook</h1>
            <h2>My Recipes</h2>
            <div className="list">
                {!recipes.length && (
                    <div>
                        <h3>No recipes found</h3>
                        <button onClick={() => navigate('/generate')}>Generate Recipe</button>
                    </div>
                )}
                {recipes.map(recipe => (
                    <div key={recipe.id} className="card">
                        <div className="card-header">
                            <h1>{recipe.recipe.name}</h1>
                            <h2>{recipe.recipe.description}</h2>
                            <button onClick={() => deleteRecipe(recipe.id)}>Delete</button>
                        </div>
                        <div className="type">
                            <h3>Type</h3>
                            <p>{recipe.recipe.type}</p>
                        </div>
                        <div className="time">
                            <h3>Time</h3>
                            <p>{recipe.recipe.time}</p>
                        </div>
                        <div className="difficulty">
                            <h3>Difficulty</h3>
                            <p>{recipe.recipe.difficulty}</p>
                        </div>
                        <div className="servings">
                            <h3>Servings</h3>
                            <p>{recipe.recipe.peoples} people(s)</p>
                        </div>
                        <div className="body">
                            <div className="ingredients">
                                <h3>Ingredients</h3>
                                <ul>
                                    {recipe.recipe.ingredients.map(ingredient => (<li key={ingredient}>{ingredient}</li>))}
                                </ul>
                            </div>
                        </div>
                        <div className="instructions">
                            <h3>Instructions</h3>
                            <ol>
                                {recipe.recipe.steps.map(instruction => (<li key={instruction}>{instruction}</li>))}
                            </ol>
                        </div>
                    </div>
                ))}
                {recipes.length > 0 && (<button onClick={() => navigate('/generate')}>Generate Recipe</button>)}
            </div>
        </div>
    )
}

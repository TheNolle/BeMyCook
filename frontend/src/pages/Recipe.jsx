import React from 'react'

export default function Recipe() {
    const recipe = localStorage.getItem('recipe')

    return (
        <div>
            <h1>Generated Recipe</h1>
            <pre>{recipe}</pre>
        </div>
    )
}

const express = require('express')
const router = express.Router()
const { Configuration, OpenAIApi } = require('openai')

router.post('/generate', async (request, response) => {
    const { ingredients, mood, language, peoples, type } = request.body

    const OpenAI = new OpenAIApi(
        new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        })
    )

    try {
        const request = await OpenAI.createCompletion({
            model: 'text-davinci-003',
            prompt: `Generate a recipe based on the following criteria: - The recipe must be coherent and the ingredients must be used in the recipe. - The recipe must be in ${language}. - The recipe must be for ${peoples > 1 ? `${peoples} peoples` : `${peoples} people`}. - The recipe must match the mood: ${mood || 'Anything'}. - The recipe must use the following ingredients: ${ingredients}. - The recipe can use any ingredients other than the ones specified only if they are basic spices or oils (like salt, pepper, olive oil, etc.) - The recipe must be for ${type || 'Any type of meal'}. - The ingredients must be in a json array list format like this: ['ingredient 1 and quantity', 'ingredient 2 and quantity', ...] - The steps must be in a json array list format. - The recipe must be generated as a json object in this format: {"name": "Recipe name", "descriptio": "Quick and small recipe description", "ingredients": "Array containing the Recipe ingredients", "type": "Recipe type", "steps": "Array containing the Recipe steps", "time": "Recipe time", "difficulty": "Recipe difficulty", "peoples": "For how many peoples"}`,
            max_tokens: 2000,
        })

        response.json({ recipe: request.data.choices[0].text.trim() })
    } catch (error) {
        console.error(error.message)
        response.status(500).json({ message: 'Recipe generation failed' })
    }
})

module.exports = router

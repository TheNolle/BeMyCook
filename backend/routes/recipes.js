const express = require('express')
const router = express.Router()
const { Configuration, OpenAIApi } = require('openai')

router.post('/generate', async (request, response) => {
    const { ingredients, mood, language } = request.body

    const OpenAI = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }))

    try {
        const request = await OpenAI.createCompletion({
            model: 'text-davinci-003',
            prompt: `Generate a recipe using only the following ingredients: ${ingredients}. | You don't have to use all the ingredients, i just list them to you so you can pick in it to make your recipe. | The recipe should match this mood: ${mood || 'anything'}. | This recipe cannot use ingredients not listed here other than basic spices. | Put the recipe name at the top and just under the name, add a link to an image representing the recipe or write "No Image Found". | Please, generate this recipe in ${language}. | The recipe must be coherent.`,
            max_tokens: 2000
        })

        response.json({ recipe: request.data.choices[0].text.trim() })
    } catch (error) {
        console.error(error)
        response.status(500).json({ message: 'Recipe generation failed' })
    }
})

module.exports = router

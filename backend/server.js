require('dotenv').config()

console.clear()

const express = require('express')
const app = express()
const cors = require('cors')

const PORT = process.env.PORT || 5000

app.use(cors({ origin: true, methods: 'GET, HEAD, PUT, PATCH, POST, DELETE', allowedHeaders: ['Content-Type', 'Authorization'] }))
app.use(express.json())

app.get('/', (request, response) => response.send('Welcome to Be My Cook API!'))
app.use('/auth', require('./routes/auth'))
app.use('/recipes', require('./routes/recipes'))

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

mongoose.connection.once('open', () => {
    console.log('MongoDB database connection established successfully')
})

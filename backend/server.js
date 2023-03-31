require('dotenv-defaults/config')


console.clear()


const express = require('express')
const cors = require('cors')


const app = express()
const PORT = process.env.PORT || 5000


app.use(cors({ origin: true, methods: 'GET, HEAD, PUT, PATCH, POST, DELETE', allowedHeaders: ['Content-Type', 'Authorization'] }))
app.use(express.json())


app.use('/user', require('./routes/user'))
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

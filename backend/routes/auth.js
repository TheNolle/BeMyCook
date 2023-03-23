const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

router.post('/login', async (request, response) => {
    const { username, password } = request.body

    const validUsername = 'Nolly'
    const hashedPassword = '$2b$10$NRRWJrTusISo0GFVLkUYOeOfdkrMDV2xZcFlEefF9cMv/X0.1jWBa'

    if (username === validUsername && await bcrypt.compare(password, hashedPassword)) {
        response.json({ message: 'Authentication successful' })
    } else {
        response.status(401).json({ message: 'Invalid credentials' })
    }
})

module.exports = router

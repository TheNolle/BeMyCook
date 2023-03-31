const express = require('express')
const router = express.Router()
const { compare, hash } = require('bcrypt')
const { sign, verify } = require('jsonwebtoken')
const User = require('../schemas/user')

router.post('/token', async (request, response) => {
    const { token } = request.body
    const { id } = verify(token, process.env.JWT_SECRET)
    const user = await User.findOne({ _id: id })
    if (user) {
        const newToken = sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' })
        return response.status(200).json({ token: newToken })
    }
    response.status(404).json({ message: 'User not found' })
})

router.post('/login', async (request, response) => {
    const { email, password } = request.body
    try {
        const user = await User.findOne({ email: email })
        const verifyPassword = compare(password, user.password)
        if (user && verifyPassword) {
            const token = sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' })
            response.status(200).json({ token })
        } else {
            response.status(404).json({ message: 'Email or password is incorrect' })
        }
    } catch (error) {
        response.status(500).json({ message: 'An error occurred', error })
    }
})

router.post('/register', async (request, response) => {
    const { email, password } = request.body
    try {
        const hashedPassword = await hash(password, 10)
        const user = await User.findOne({ email: email })
        if (user) return response.status(409).json({ message: 'Account already exists' })
        const newUser = new User({ email: email, password: hashedPassword })
        const savedUser = await newUser.save()
        const token = sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '24h' })
        response.status(200).json({ token })
    } catch (error) {
        response.status(500).json({ message: 'An error occurred', error })
    }
})

module.exports = router

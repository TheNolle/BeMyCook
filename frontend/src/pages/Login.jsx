import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5001/auth/login', { username, password })
            if (response.data.message === 'Authentication successful') {
                navigate('/')
            } else {
                alert('Invalid credentials')
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}

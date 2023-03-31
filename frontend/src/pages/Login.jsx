import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import './Login.scss'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        async function checkToken() {
            if (localStorage.getItem('token')) {
                await axios.post('http://localhost:5001/user/token', { token: localStorage.getItem('token') })
                    .then(response => {
                        localStorage.setItem('token', response.data.token)
                        navigate('/recipes')
                    })
                    .catch(error => {
                        navigate('/login')
                    })
            }
        }
        checkToken()
    }, [navigate])

    async function login(event) {
        event.preventDefault()
        setIsLoading(true)

        await axios.post('http://localhost:5001/user/login', { email, password })
            .then(response => {
                localStorage.setItem('token', response.data.token)
                navigate('/recipes')
            })
            .catch(error => {
                alert(error.response.data.message)
                setIsLoading(false)
            })
    }

    return (
        <div className="register">
            <h1>Be My Cook</h1>
            <form onSubmit={login}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus required disabled={isLoading} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={isLoading} />
                <button disabled={isLoading}>{isLoading ? 'Logging in...' : 'Login'}</button>
            </form>
            Don't have an account ? <Link to="/register">Register now</Link>
        </div>
    )
}

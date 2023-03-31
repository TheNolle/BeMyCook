import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Register() {
    const [user, setUser] = useState({ email: '', password: '' })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
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

    const onChangeInput = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
        setError(null)
    }

    const registerSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        await axios.post('http://localhost:5001/user/register', { ...user })
            .then(response => {
                localStorage.setItem('token', response.data.token)
                navigate('/recipes')
            })
            .catch(error => {
                setError(error.response.data.message)
                setLoading(false)
            })
    }

    return (
        <div className="login">
            <h1>Be My Cook</h1>
            {error && <h3>{error}</h3>}
            <form onSubmit={registerSubmit}>
                <input type="email" name="email" required placeholder="Email" value={user.email} onChange={onChangeInput} disabled={loading} />
                <input type="password" name="password" required autoComplete="on" placeholder="Password" value={user.password} onChange={onChangeInput} disabled={loading} />
                <button type="submit" disabled={loading}>Register</button>
            </form>
            Already have an account ? <Link to="/login">Login now</Link>
        </div>
    )
}

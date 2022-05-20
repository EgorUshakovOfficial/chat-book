import { useState } from 'react';
import { useLocation, useNavigate} from 'react-router-dom'; 

const Login = ({addToken}) => {
    // State 
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    // Navigate 
    const navigate = useNavigate()

    // Location
    const location = useLocation() 

    // Handle submit
    const handleSubmit = e => {
        e.preventDefault()

        // Attempt to fetch authentication token 
        fetch('http://localhost:4000/login', {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                email,
                password
            }),
            credentials: "include"
        })
        .then(res => {
            if (res.status === 401) {
                setError("Please provide a valid email address and password")
            } else {
                res.json()
                    .then(data => {
                        const { token } = data
                        addToken(token)
                    })
            }
        })
        .catch(err => setError("Error! Something went wrong"))
    }

    return (
        <form id="login-form" onSubmit={handleSubmit}>
            {location.state?.message && <div className="alert alert-success alert-dismissible">
                <button type="button" className="btn-close" onClick={() => navigate('/', {replace: true})}></button>
                <strong>{location.state?.message}</strong>
            </div>}
            {error && <div className="alert alert-danger alert-dismissible">
                <button type="button" className="btn-close" onClick={() => setError("")}></button>
                <strong>{error}</strong>
            </div>}
            <div className="form-element">
                <input type="email" className="form-control"  onChange={e => setEmail(e.target.value)} value={email} placeholder="Email" />
            </div>
            <div className="form-element">
                <input type="password" className="form-control" onChange={e => setPassword(e.target.value)} value={password} placeholder="Password" />
            </div>
            <button type="submit" id="login" className="form-element btn btn-primary btn-block">Log in</button>
        </form>
    )
}

export default Login; 

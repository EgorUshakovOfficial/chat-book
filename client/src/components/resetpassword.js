import {useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    // Navigate
    const navigate = useNavigate()

    // Location
    const location = useLocation()

    // State
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [mismatch, setMismatch] = useState('')
    const [error, setError] = useState('')

    // Redirects user back to home page if navigated to this page by url
    useEffect(() => {
        if (location.state?.isMatch === false || location.state === null) {
            navigate('/', { replace: true})
        }
    }, [])

    // Handle submit
    const handleSubmit = e => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMismatch('Passwords do not match')
            return
        }

        // Update user password
        fetch(`https://chat-book.onrender.com/forgot-password/reset`, {
            method: "POST",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                email: location.state?.email ||  "",
                code: location.state?.code || "",
                password
            })
        })
            .then(async res => {
                const data = await res.json()
                console.log(data)
                if (data.success) {
                    navigate('/', { replace: true, state: { message:data.message } })
                } else {
                   setError(data.message)
                }
            })
            .catch(err => console.log(err))

    }


    return (
        <div id="reset-password">
            <h2>Reset password</h2>
            {error && <div className="alert alert-danger alert-dismissible">
                <button type="button" className="btn-close" onClick={() => setError("")}></button>
                <strong>{error}</strong>
            </div>}
            <hr />
            <form id="reset-password-form" onSubmit={handleSubmit}>
                <input type="password" className="form-control" style={{marginBottom: "0.8em"}}placeholder="New password" onChange={e => {
                    setMismatch('')
                    setPassword(e.target.value)
                 }
                } required />
                <input type="password" className="form-control" placeholder="Confirm password" onChange={e => {
                    setMismatch('')
                    setConfirmPassword(e.target.value)
                }
                } required />
                <p className="mismatch">{mismatch}</p>
                <hr/>
                <button className="btn btn-primary" type="submit" style={{float:"right"}}>Reset</button>
            </form>
        </div>
    )
}

export default ResetPassword;

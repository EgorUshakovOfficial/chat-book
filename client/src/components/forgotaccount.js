import { useState } from 'react';
import '../styles/forgotaccount.css';
import { useNavigate, useLocation} from 'react-router-dom'; 
const ForgotAccount = () => {
    // State 
    const [email, setEmail] = useState('')

    // Navigate 
    const navigate = useNavigate()

    // Location 
    const location = useLocation()
    const {state} = location

    // Handle submit 
    const handleSubmit = e => {
        e.preventDefault()

        // Send email 
        fetch('http://localhost:4000/forgot-password', {
            method: "POST",
            headers: { 'Content-type': "application/json" },
            body: JSON.stringify({
                email
            })
        })
            .then(res => {
                navigate(`/forgot-password/verification?email=${email}`)
            })
            .catch(err => console.log(err))
    }

    return (<div id="forgot-account">
        <h2 className="title">Find Your Account</h2>
        {state?.errMessage && <div className="alert alert-danger alert-dismissible">
            <button type="button" className="btn-close" onClick={() => {
                navigate(location.pathname, {replace: true})
            }}></button>
            <strong>{state?.errMessage}</strong>
        </div>}
        <hr />
        <form id="forgot-account-form" onSubmit={handleSubmit}>
            <div id="forgot-account-details">Please enter your email to search for your account</div>
            <input type="email" className="form-control" onChange={e => setEmail(e.target.value)} required/>
            <hr />
            <div id="forgot-account-btns">
                <button className="btn btn-secondary" type="button" id="cancel-btn" onClick={() => navigate('/')}>Cancel</button>
                <button className="btn btn-primary" type="submit" id="search-btn">Next</button>
            </div>
        </form>
    </div>)
}

export default ForgotAccount; 

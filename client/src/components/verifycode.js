import { useSearchParams, useNavigate} from 'react-router-dom';
import { useState, useEffect} from 'react'; 
const VerifyCode = () => {
    // State
    const [code, setCode] = useState('')

    // Query params
    const [searchParams] = useSearchParams()
    let email = searchParams.get('email')

    // Navigate 
    const navigate = useNavigate()

    console.log(email)

    // Redirects user back to home page if navigated to this page by url  
    useEffect(() => {
        if (email === null) {
            navigate('/', { replace: true })
        }
    }, [])

    // Handle submit 
    const handleSubmit = e => {
        e.preventDefault()

        fetch(`http://localhost:4000/forgot-password/${code}`, {
            method: "GET",
            headers: {'Content-type':"application/json"}       
        })
            .then(async res => {
                let data = await res.json()
                if (data.isMatch) {
                    navigate(`/forgot-password/reset`, { state: {email, code, isMatch: true } })
                } else {
                    navigate('/forgot-password', { replace: true, state: {errMessage:"An invalid verification code was entered. Please try again"} })

                }
                   
            })
    }

    return (
        <div id="verify-code">
            <h2>Verification</h2>
            <hr />
            <p>An email with a verification code was just sent to {email}</p>
            <form id="verification-form" onSubmit={handleSubmit}>
                <input type="text" id="enter-code" className="form-control" placeholder="Enter code" onChange={e => setCode(e.target.value)} required />
                <hr />
                <button id="verify-code-submit" type="submit" className="btn btn-primary" style={{float:"right"}}>Verify</button>
            </form>
        </div>
    )
}

export default VerifyCode; 
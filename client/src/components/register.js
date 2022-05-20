import { useState } from 'react';

const Register = () => {
    // State 
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = e => {
        e.preventDefault()

        // Fetch data 
        fetch("http://localhost:4000/register", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                username,
                password
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setError(data.error)
                } else {
                    setSuccess(data.success)
                }
            })
            .catch(err => setError("Error! Something went wrong!"))
    }

    return (
        <form className="modal" id="registerModal" onSubmit={handleSubmit}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-title">Registration</h2>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" />
                    </div>
                    <div className="modal-body">
                        {success &&
                            <div className="alert alert-success alert-dismissible">
                            <button type="button" className="btn-close" onClick={() => setSuccess("")} />
                                <strong>{success}</strong>
                            </div>
                        }
                        {error &&
                            <div className="alert alert-danger alert-dismissible">
                                <button type="button" className="btn-close" onClick={() => setError("")} />
                                <strong>{error}</strong>
                            </div>
                        }
                        <div className="row">
                            <div className="col">
                                <input className="form-control" placeholder="First name" onChange={e => setFirstName(e.target.value)} required/>
                            </div>
                            <div className="col">
                                <input className="form-control" placeholder="Last name" onChange={e => setLastName(e.target.value)} required/>
                            </div>
                        </div>
                        <div className="form-group">
                            <input type="email" className="form-control" placeholder="Email" onChange={e => setEmail(e.target.value)} required/>
                            <input className="form-control" placeholder="Username" onChange={e => setUsername(e.target.value)} />
                            <input type="password" className="form-control" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="submit" className="btn btn-success">Sign up</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Register; 
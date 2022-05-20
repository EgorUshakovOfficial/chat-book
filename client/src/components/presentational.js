import Home from '../pages/home';
import Profile from '../pages/profile';
import ForgotAccount from '../components/forgotaccount';
import VerifyCode from '../components/verifycode';
import ResetPassword from '../components/resetpassword';
import AuthProvider from './authprovider';
import {useContext, useEffect} from 'react';
import { ReactReduxContext } from 'react-redux';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';


const Presentational = ({ addToken, fetchUser, logoutUser, notLoading, setTimer}) => {
    // Store is where state of the entire application resides 
    const { store } = useContext(ReactReduxContext)

    // State of application 
    let {
        token,
        user,
        userFetched,
        loading,
        timer
    } = store.getState()

    const verifyUser = () => {
        fetch('http://localhost:4000/refreshToken', {
            method: "POST",
            credentials: "include"
        })
            .then(async res => {
                if (res.ok) {
                    const data = await res.json()
                    let token = data.token
                    addToken(token)
                }
                else if (res.status === 401){
                    notLoading()
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if (document.cookie && !token) {
            verifyUser()
        }
        else if (token && userFetched === false) {
            fetchUser(token)
        }
        else if (loading) {
            notLoading()
        }
        else if (loading === false && token && document.cookie && timer === "") {
            let silentTimer = setInterval(verifyUser, 1000*60*5)
            setTimer(silentTimer)
        }

    })

    return (
        <Router>
            {loading &&
                <div id="spinner-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                    <div className="spinner-border" role="status">
                        <span className="sr-only"></span>
                    </div>
                </div>
            }
            {loading===false &&                <Routes>
                    {token ?
                        <Route path="/" element={<Profile timer={timer} user={user} authToken={token} logoutUser={logoutUser} />} />
                        :
                        <Route path="/" element={<Home addToken={addToken} />} />
                    }
                    <Route path="/forgot-password" element={<ForgotAccount />} />
                    <Route path="/forgot-password/verification" element={<VerifyCode />} />
                    <Route path="/forgot-password/reset" element={<ResetPassword />} />
              </Routes>
            }
        </Router>
    )
}

export default Presentational;
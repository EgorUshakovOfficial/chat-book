import Home from '../pages/home'; 

const AuthProvider = ({ user, children }) => {
    if (!user) {
       return <Home />
    }
    return {children}
}

export default AuthProvider; 
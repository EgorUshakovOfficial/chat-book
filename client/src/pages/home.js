import Login from '../components/login';
import Register from '../components/register'; 
import {Link} from 'react-router-dom'; 
import '../styles/home.css';


const Home = ({addToken}) => {
    return (
        <div id="home">
            <h1 className="title">Create an account and start chatting with people today</h1>
            <div id="home-forms">
                <Login addToken={addToken} />
                <Link to="/forgot-password" id="forget-password-link">Forgot password?</Link>
                <hr />
                <div className="button-wrapper">
                    <button className="btn btn-default btn-success" id="create-new-account" data-bs-toggle="modal" data-bs-target="#registerModal">Create new account</button>
                </div>
                <Register />
            </div>
        </div>
    );
}

export default Home; 

import {
    addUserSuccess,
    addUserFailure
} from './actions';

export const fetchLogin = token => dispatch => {
    return fetch('http://localhost:4000/user', {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": `bearer ${token}`
        }
    })
    .then(async res => {
        if (res.status === 401) {
            dispatch(addUserFailure())
        } else {
            const data = await res.json()
            const { user } = data
            dispatch(addUserSuccess(user))
        }
    })
    .catch(err => console.log(err))
}

export default fetchLogin; 

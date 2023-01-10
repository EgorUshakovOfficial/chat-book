import { logoutUser } from './actions.js';

export const fetchLogout = () => dispatch => {
    return fetch('https://chat-book.onrender.com/logout', {
        method: "GET",
        credentials: "include"
    })
    .then(async res => {
        if (res.status === 200) {
            dispatch(logoutUser())
        } else {
            const data = await res.json()
            dispatch(logoutUser(data.message))
        }
    })
    .catch(err => console.log(err))
}

export default fetchLogout;
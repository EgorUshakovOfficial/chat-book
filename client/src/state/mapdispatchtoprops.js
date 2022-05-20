import {
    addToken,
    notLoading,
    addSilentTimer
} from './actions';

import fetchLogin from './fetchlogin';
import fetchLogout from './fetchlogout';

export const mapDispatchToProps = dispatch => {
    return {
        addToken: token => {
            dispatch(addToken(token))
        },
        fetchUser: token => {
            dispatch(fetchLogin(token))
        },
        logoutUser: () => {
            dispatch(fetchLogout())
        },
        notLoading: () => {
            dispatch(notLoading())
        },
        setTimer: timer => {
            dispatch(addSilentTimer(timer))
        }
    }
}

export default mapDispatchToProps; 
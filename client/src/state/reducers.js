const defaultState = {
    token: "",
    user: null,
    userFetched: false,
    loading: true,
    timer: "",
    message: ""
}

// Creates copy of original state 
const newState = (state, info) => Object.assign({}, state, info)

// Reducer 
export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case "ADD_TOKEN":
            return newState(state, { token: action.token, loading: true })
        case "ADD_USER_SUCCESS":
            return newState(state, {
                user: action.user,
                userFetched: true
            })
        case "ADD_USER_FAILURE":
            return newState(state, { user: false, userFetched: true })
        case "LOGOUT_USER":
            return newState(state, {
                user: null,
                token: "",
                userFetched: false,
                timer: "",
                message: action.message
            })
        case "NOT_LOADING":
            return newState(state, { loading: false })
        case "ADD_SILENT_TIMER":
            return newState(state, { timer: action.timer })
        default:
            return state
    }
}


export default reducer; 

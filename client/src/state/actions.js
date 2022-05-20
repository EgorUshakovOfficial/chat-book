export const addToken = token => ({ type: "ADD_TOKEN", token })
export const addUserSuccess = user => ({ type: "ADD_USER_SUCCESS", user })
export const addUserFailure = () => ({ type: "ADD_USER_FAILURE" })
export const logoutUser = (message="") => ({ type: "LOGOUT_USER", message})
export const notLoading = () => ({ type: "NOT_LOADING" })
export const addSilentTimer = timer => ({ type: "ADD_SILENT_TIMER", timer })

export default {
    addToken,
    addUserSuccess,
    addUserFailure,
    logoutUser,
    notLoading,
    addSilentTimer
}

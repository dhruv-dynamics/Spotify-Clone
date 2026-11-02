import {
    USER_LOGGED_IN,
    USER_LOGGED_OUT,
    USER_ABOUT
} from "../constants/userConstant.jsx"

export const userActor = (user) => async (dispatch) => {
    dispatch({
        type: USER_LOGGED_IN,
        payload: user
    })
}

export const logoutActor = () => async (dispatch) => {
    localStorage.removeItem("token")
    dispatch({
        type: USER_LOGGED_OUT
    })
}

export const getUser = (user) => async (dispatch) => {
    dispatch({
        type: USER_ABOUT,
        payload: user
    })
}
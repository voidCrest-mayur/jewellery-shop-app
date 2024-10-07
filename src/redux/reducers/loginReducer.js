import { GET_REGISTERED_DATA, LOGIN_USER } from "../actions/actionTypes"

const initialState = {
    isAuth: false,
    registeredData: []
}


const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REGISTERED_DATA:
            return {
                ...state,
                registeredData: action.data
            }
        case LOGIN_USER:

            // creating session for user 
            window.sessionStorage.setItem('token', JSON.stringify(action.data))
            return {
                ...state,
                isAuth: true
            }
        default:
            return state
    }
}

export default loginReducer;
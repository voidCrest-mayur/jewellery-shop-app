import { GET_REGISTERED_DATA, LOGIN_USER } from "./actionTypes"

export const getRegisteredData = (users)=>{
    // On get registered data
    return{type:GET_REGISTERED_DATA , payload:'get usersdata.', data:users}
}
export const loginUser = (user)=>{
    // login user
    return{type:LOGIN_USER, payload:'login user',data:user}
}
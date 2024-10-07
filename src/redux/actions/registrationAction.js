import { GET_EXIST_DATA, REGISTER_USER_DATA } from "./actionTypes"

export const getExistData = (users)=>{
    // On get exists data
    return{type:GET_EXIST_DATA , payload:'get usersdata.', data:users}
}
export const registerUserData = (user)=>{
    // On get exists data
    return{type:REGISTER_USER_DATA, payload:'register users data.',data:user}
}
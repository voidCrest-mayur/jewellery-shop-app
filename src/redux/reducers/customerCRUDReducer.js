import axios from "axios";
import { CREATE_CUSTOMER, DELETE_CUSTOMER, UPDATE_CUSTOMER } from "../actions/actionTypes"



const initialState = {
    response: '',
}


const customerCRUDReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_CUSTOMER:
            const createActionStatus = (data) => {
                // on creating user 
                axios.post('http://localhost:666/users', data).then(res => {
                    const response = res
                    return response
                }).catch(err => {
                    const error = err
                    return error
                })
            }
            return {
                ...state,

                // saving response promise 
                reponse: createActionStatus(action.data)
            }
        case DELETE_CUSTOMER:
            const deleteActionStatus = (data) => {
                // on deleting user
                axios.delete(`http://localhost:666/users/${data.id}`).then(res => {
                    const response = res
                    return response
                }).catch(err => {
                    const error = err
                    return error
                })
            }
            return {
                ...state,

                // saving response promise 
                reponse: deleteActionStatus(action.data)

            }
        case UPDATE_CUSTOMER:
            const updateActionStatus = (data) => {
                // on update  user
                axios.put(`http://localhost:666/users/${data.id}`, data).then(res => {
                    const response = res
                    return response
                }).catch(err => {
                    const error = err
                    return error
                })
            }
            return {
                ...state,

                // saving response promise 
                reponse: updateActionStatus(action.data)

            }
        default:
            return state
    }
}

export default customerCRUDReducer;
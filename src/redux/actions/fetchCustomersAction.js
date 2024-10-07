import { FETCH_CUSTOMER_FAILURE, FETCH_CUSTOMER_REQUEST, FETCH_CUSTOMER_SUCCESS } from "./actionTypes"

export const fetchCustomersRequest = ()=>{
    // On request 
    return{type: FETCH_CUSTOMER_REQUEST, payload:'fetching customers..'}
}
export const fetchCustomersSuccess = (customer)=>{
    // on request success 
    return{type: FETCH_CUSTOMER_SUCCESS, payload:'fetching customers success',data:customer}
}
export const fetchCustomersFailure= (error)=>{
    // on request faliure 
    return{type: FETCH_CUSTOMER_FAILURE, payload:'fetching customers fail',data:error}
}
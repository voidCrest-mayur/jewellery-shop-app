import { FETCH_SELECTED_PRODUCT_FAILURE, FETCH_SELECTED_PRODUCT_REQUEST, FETCH_SELECTED_PRODUCT_SUCCESS } from "./actionTypes"


export const fetchSelectedProductRequest = ()=>{
    // On request 
    return{type: FETCH_SELECTED_PRODUCT_REQUEST, payload:'fetching selected product..'}
}
export const fetchSelectedProductSuccess = (products)=>{
    // on request success 
    return{type: FETCH_SELECTED_PRODUCT_SUCCESS, payload:'fetching selected products success',data:products}
}
export const fetchSelectedProductFailure= (error)=>{
    // on request faliure 
    return{type: FETCH_SELECTED_PRODUCT_FAILURE, payload:'fetching selected product fail',data:error}
}
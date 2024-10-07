import { FETCH_PRODUCTS_FAILURE, FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS } from "./actionTypes"

export const fetcProductsRequest = ()=>{
    // On request 
    return{type: FETCH_PRODUCTS_REQUEST, payload:'fetching products..'}
}
export const fetchProductsSuccess = (products)=>{
    // on request success 
    return{type: FETCH_PRODUCTS_SUCCESS, payload:'fetching products success',data:products}
}
export const fetchProductsFailure= (error)=>{
    // on request faliure 
    return{type: FETCH_PRODUCTS_FAILURE, payload:'fetching products fail',data:error}
}
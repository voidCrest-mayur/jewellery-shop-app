import { FILTER_PRODUCTS, SAVE_PRODUCTS } from "./actionTypes"


export const saveProducts= (products)=>{
    // On saving products in state
    return{type: SAVE_PRODUCTS, payload:'saving products', data:products}
}
export const filterProducts= (searchValue)=>{
    // on filter products
    return{type: FILTER_PRODUCTS, payload:'filtering products...',data:searchValue}
}
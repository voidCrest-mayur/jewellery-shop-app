import { ADD_PRODUCT_TO_CART, GET_TOTAL_CART_PRICE, REMOVE_PRODUCT_FROM_CART, UPDATE_PRODUCT_FROM_CART } from "./actionTypes"

export const getTotalCartPrice  = ()=>{
    //  get cart price
    return{type: GET_TOTAL_CART_PRICE , payload:'fetching Total cartPrice...' }
}
export const addProductToCart  = (product)=>{
    // on product add to cart
    return{type: ADD_PRODUCT_TO_CART, payload:'adding product to cart...' ,data: product}
}

export const removeProductFromCart  = (product)=>{
    // on remove product from cart 
    return{type: REMOVE_PRODUCT_FROM_CART, payload:'remove product from cart...', data:product}
}
export const updateProductFromCart  = (product)=>{
    // on update product from cart 
    return{type: UPDATE_PRODUCT_FROM_CART, payload:'update product from cart...', data:product}
}
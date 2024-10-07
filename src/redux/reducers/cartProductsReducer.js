import { ADD_PRODUCT_TO_CART, GET_TOTAL_CART_PRICE, REMOVE_PRODUCT_FROM_CART, UPDATE_PRODUCT_FROM_CART } from "../actions/actionTypes"

const initialState = {
    cartProducts: [],
    totalCartPrice: 0

}

const cartProductsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCT_TO_CART:
            return {
                ...state,
                cartProducts: [...state.cartProducts, { ...action.data, initPrice: action.data.price, productQuantity: action.data.productQuantity }],

            }
        case REMOVE_PRODUCT_FROM_CART:
            return {
                ...state,
                cartProducts: state.cartProducts.filter((each) => {
                    return each.id !== action.data.id
                }),
            }
        case UPDATE_PRODUCT_FROM_CART:
            return {
                ...state,
                cartProducts: state.cartProducts.map((each) => {

                    // update only one product data on all cart data 
                    if (each.id === action.data.id) {
                        return action.data
                    }
                    return each
                })
            }
        case GET_TOTAL_CART_PRICE:
            return {
                ...state,
                totalCartPrice: totalCartPrice(state.cartProducts)
            }

        default:
            return state
    }
}


const totalCartPrice = (products) => {
    let totalPrice = 0;
    products.forEach(product => {
        totalPrice += product.price
    });
    return totalPrice

}

export default cartProductsReducer;
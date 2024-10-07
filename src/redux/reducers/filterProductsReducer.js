import { FILTER_PRODUCTS, SAVE_PRODUCTS } from "../actions/actionTypes"


const initialState = {
    products: [],
}

const filterProductsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_PRODUCTS:
            return {
                ...state,
                products: action.data
            }
        case FILTER_PRODUCTS:
            return {
                ...state,
                products: state.products.filter((each) => {
                    return each.title.includes(action.data)
                })
            }
        default:
            return state
    }
}

export default filterProductsReducer;
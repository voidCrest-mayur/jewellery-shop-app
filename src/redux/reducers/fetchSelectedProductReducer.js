import { FETCH_SELECTED_PRODUCT_FAILURE, FETCH_SELECTED_PRODUCT_REQUEST, FETCH_SELECTED_PRODUCT_SUCCESS } from "../actions/actionTypes"


const initialState = {
    loading: false,
    product: [],
    error: ''
}

const fetchSelectedProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SELECTED_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_SELECTED_PRODUCT_SUCCESS:

            return {
                ...state,
                loading: false,
                product: action.data
            }
        case FETCH_SELECTED_PRODUCT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.data
            }
        default:
            return state
    }
}


export default fetchSelectedProductReducer;
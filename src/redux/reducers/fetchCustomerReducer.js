import { FETCH_CUSTOMER_FAILURE, FETCH_CUSTOMER_REQUEST, FETCH_CUSTOMER_SUCCESS } from "../actions/actionTypes"


const initialState = {
    loading: false,
    customers: [],
    error: ''
}

const fetchCustomersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CUSTOMER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_CUSTOMER_SUCCESS:
            return {
                ...state,
                loading: false,
                customers: action.data
            }
        case FETCH_CUSTOMER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.data
            }
        default:
            return state
    }
}

export default fetchCustomersReducer;
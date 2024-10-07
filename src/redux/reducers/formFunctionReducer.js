import { MAKE_CREATE_FORM, MAKE_UPDATE_FORM } from "../actions/actionTypes"
import { createCustomer, updateCustomer } from "../actions/customerCRUDAction"

const initialState = {
    formFunction: createCustomer,
    intialFormData: { firstName: '', lastName: '', email: '', address: '' }
}


const formFunctionReducer = (state = initialState, action) => {
    switch (action.type) {
        case MAKE_CREATE_FORM:
            return {
                ...state
            }
        case MAKE_UPDATE_FORM:

            return {
                ...state,
                formFunction: updateCustomer,
                intialFormData: action.data

            }

        default:
            return state
    }

}

export default formFunctionReducer
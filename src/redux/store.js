import { combineReducers, legacy_createStore } from "@reduxjs/toolkit";
import fetchProductsReducer from "./reducers/fetchProductsReducer";
import cartProductsReducer from "./reducers/cartProductsReducer";
import fetchCustomersReducer from "./reducers/fetchCustomerReducer";
import customerCRUDReducer from "./reducers/customerCRUDReducer";
import formFunctionReducer from "./reducers/formFunctionReducer";
import filterProductsReducer from "./reducers/filterProductsReducer";
import fetchSelectedProductReducer from "./reducers/fetchSelectedProductReducer";
import registrationReducer from "./reducers/registrationReducer";
import loginReducer from "./reducers/loginReducer";


// combining all reducers 
const rootReducer = combineReducers({ changeFormFun: formFunctionReducer, fetchProducts: fetchProductsReducer, fetchCustomers: fetchCustomersReducer, filterProducts: filterProductsReducer, selectedProduct: fetchSelectedProductReducer, cartProcucts: cartProductsReducer, customerCRUD: customerCRUDReducer, registerUser: registrationReducer, loginUser: loginReducer })

const store = legacy_createStore(rootReducer);


export default store;
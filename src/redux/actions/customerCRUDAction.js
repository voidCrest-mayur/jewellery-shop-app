import { CREATE_CUSTOMER, DELETE_CUSTOMER, UPDATE_CUSTOMER } from "./actionTypes"

export const createCustomer = (customerData)=>{
    // On CREATE 
    return{type: CREATE_CUSTOMER, payload:'creating customers..' ,data:customerData}
}
export const updateCustomer = (customerData)=>{
    // on UPDATE 
    return{type: UPDATE_CUSTOMER, payload:'updating customers success',data:customerData}
}
export const deleteCustomer= (customerData)=>{
    // on DELETE 
    return{type: DELETE_CUSTOMER, payload:'deleting customers fail',data:customerData}
}
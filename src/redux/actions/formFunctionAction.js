import { MAKE_CREATE_FORM, MAKE_UPDATE_FORM } from "./actionTypes"

export const createFormFunction =()=>{
   //Make form for create
    return{type:MAKE_CREATE_FORM  , payload:'Making form for create customer.'}

}
export const updateFormFunction =(updateData)=>{
   //Make form for create
    return{type:MAKE_UPDATE_FORM  , payload:'Making form for update customer.',data:updateData}

}
import axios from "axios"
import { GET_EXIST_DATA, REGISTER_USER_DATA } from "../actions/actionTypes"

const initialState =  {
    response:'',
    existData:[]
}

const registrationReducer = (state = initialState, action) =>{
    switch(action.type){
        case GET_EXIST_DATA:
            return{
                ...state,
                existData: action.data
            }
        case REGISTER_USER_DATA:
            const registerUser= (data)=>{

                // excluding the confirm password field from form data 
                const createData = {name:data.name,email:data.email,password:data.userPassword} 

                // registering user 
                axios.post('http://localhost:5500/auth_users',createData).then(res=>{
                    const response = res
                    return response
                }).catch(err=>{
                    const error = err
                    return error
                })
            }
            return{
                ...state,

                 // saving response promise  
                response: registerUser(action.data)
            }
        default:
            return state
    }
}

export default registrationReducer;
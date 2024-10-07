const isUserAuth = ()=>{
    // checking if user is autherized or not 
    
    let token = sessionStorage.getItem('token');
    if(token===null){
        return false
    }
    else{
        return true
    }

}

export default isUserAuth;
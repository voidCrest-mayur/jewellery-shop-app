import React, { useEffect, useState } from 'react'
import { NavLink, Navigate } from 'react-router-dom'
import storeStyles from '../styles/Store.module.css'
import { useForm } from 'react-hook-form'
import useDocumentTitle from '../utils/hooks/useDocumentTitle'
import isUserAuth from '../utils/customFunctions/isUserAuth'
import { useDispatch, useSelector } from 'react-redux'
import { getRegisteredData, loginUser } from '../redux/actions/loginAction'

const Login = () => {

    useDocumentTitle('VOID JEWELLERY - Login')

    const [isPassShow, setIsPassShow] = useState(false)
    const [isLogin, setIsLogin] = useState(false);
    const dispatch = useDispatch();


    // react-hook-form initialization
    const { register, handleSubmit, formState: { errors }, setError } = useForm({ defaultValues: { email: '', userPassword: '' } })

    useEffect(() => {
        // taking details of user if user is autherized or not 
        setIsLogin(isUserAuth())
    }, [isLogin])

    useEffect(() => {
        // fetching all the registered users data from server
        //  and saving into  redux store with new state

        fetch("http://localhost:5500/auth_users").then(response => {
            return response.json()
        }).then(responseData => {
            const usersData = responseData;
            dispatch(getRegisteredData(usersData))
        }).catch(error => {
            console.error(error)
        })
    }, [dispatch])


    // fetching all the registered users data from redux store 
    const registeredUser = useSelector((state) => state.loginUser.registeredData);



    const onSubmitData = (data, e) => {
        // handling the form data on submit

        e.preventDefault();

        // for email validation based on registered data 
        if (registeredUser.length !== 0) {
            let isEmailExist = true;

            let user = undefined;
            registeredUser.forEach((each) => {
                if (each.email !== data.email) {
                    isEmailExist = false
                }
                else {
                    isEmailExist = true
                    user = each
                }
            })

            if (isEmailExist && user !== undefined) {
                // for password validation based on registered data 
                if (user.password !== data.userPassword) {

                    // setting form error on password wrong 
                    setError('userPassword', { type: 'validate', message: 'Wrong Password!' })
                }
                else {
                    dispatch(loginUser(user));
                    setIsLogin(true)
                    alert('login Succussfully');


                }


            }
            else {
                // setting form error on email wrong 
                setError('email', { type: 'validate', message: 'Email does not exist' })

            }
        }

    }
    return (
        <>



            {
                // if user is autherized then Navigate to home page 
                (isLogin) ? (
                    <Navigate to="/" replace={true} />
                ) : ''
            }

            <h1 className='text-light text-center'>Login User</h1>

            <form className='col-11 col-lg-6 mx-auto  text-light my-2 ' onSubmit={handleSubmit(onSubmitData)}>

                <div className='my-1'>
                    <label htmlFor="email" className='form-label'>Email</label>
                    <input id='email' type='email' className='form-control' {...register("email", {
                        required: true,
                        pattern: {
                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                            message: "Enter valid Email"
                        }
                    }
                    )} />

                    {/* defining form errors  */}
                    {errors.email?.type === "validate" && (<p className='text-warning' style={{ fontSize: '15x' }}>{errors.email.message}</p>)}
                    {errors.email?.type === "required" && (
                        <p className='text-warning' style={{ fontSize: '15x' }}>Email is required!!</p>
                    )}
                    {errors.email?.type === "pattern" && (<p className='text-warning' style={{ fontSize: '15x' }}>{errors.email.message}</p>)}
                </div>
                <div className='my-1'>

                    <label htmlFor="userPassword" className='form-label'>Password</label>
                    <div className='position-relative'>
                        <input type={isPassShow ? 'text' : 'password'} id='userPassword' className='form-control'{...register("userPassword", {
                            required: true,
                            minLength: 4,
                            maxLength: 8
                        })} />
                        <span onClick={() => { setIsPassShow(!isPassShow) }} style={{ cursor: 'pointer' }} className=" material-symbols-outlined position-absolute top-50 text-black pe-auto end-0 translate-middle translate-bottom">
                            {(!isPassShow) ? 'visibility' : 'visibility_off'}
                        </span>
                    </div>

                    {/* defining form errors  */}
                    {errors.userPassword?.type === "validate" && (<p className='text-warning' style={{ fontSize: '15x' }}>{errors.userPassword.message}</p>)}
                    {errors.userPassword?.type === "required" && (
                        <p className='text-warning' style={{ fontSize: '15x' }}>Password is required!!</p>
                    )}
                    {errors.userPassword?.type === "maxLength" && (
                        <p className='text-warning' style={{ fontSize: '15x' }}>Password cannot exceed more than 8 characters!!</p>
                    )}
                    {errors.userPassword?.type === "minLength" && (
                        <p className='text-warning' style={{ fontSize: '15x' }}>Password must be more than 3 characters</p>
                    )}

                </div>

                <button className={`btn fs-6 my-3 mx-auto ${storeStyles.myBtn}`} type="submit" >Login</button>
            </form>

            <NavLink className='text-center d-block text-warning' to='/account/sign_up'>Register Now</NavLink>
        </>
    )
}

export default Login

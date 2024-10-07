import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import storeStyles from '../styles/Store.module.css'
import { NavLink, useNavigate } from 'react-router-dom';
import useDocumentTitle from '../utils/hooks/useDocumentTitle';
import { useDispatch, useSelector } from 'react-redux';
import { getExistData, registerUserData } from '../redux/actions/registrationAction';

const SignUP = () => {

    useDocumentTitle('VOID JEWELLERY - Sign Up')

    const [isPassShow, setIsPassShow] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, watch, setError, formState: { errors } } = useForm({ defaultValues: { name: '', email: '', userPassword: '', confirmPass: '' } })


    useEffect(() => {
        // fetching all the registered users data from server
        //  and saving into  redux store with new state for check validations

        fetch("http://localhost:5500/auth_users").then(response => {
            return response.json()
        }).then(responseData => {
            const usersData = responseData;
            dispatch(getExistData(usersData))
        }).catch(error => {
            console.error(error)
        })
    }, [dispatch])

    // fetching all the registered users data from redux store 
    const registeredData = useSelector(state => state.registerUser.existData);



    const onSubmitData = (data, e) => {
        // handling the form data on submit

        e.preventDefault();
        let flag = true;

        // checking if email is already exists or not 
        registeredData.forEach((each) => {
            if (each.email === data.email) {

                // setting form error if email is already exists 
                setError('email', { type: 'validate', message: 'Email is already Exists' })
                flag = false
            }

        })
        if (flag) {
            dispatch(registerUserData(data));
            alert('Registration Done');

            // after register navigate to login page 
            navigate('/account/login')

        }
    }
    return (
        <>
            <h1 className='text-light text-center'>Register User</h1>
            <form className='col-11 col-lg-6 mx-auto text-light my-2 ' onSubmit={handleSubmit(onSubmitData)}>
                <div className='my-1'>
                    <label htmlFor="Name" className='form-label'>Name</label>
                    <input id='Name' className='form-control ' {...register("name", {
                        required: true,
                        maxLength: 30
                    })} />

                    {/* defining form errors  */}
                    {errors.name?.type === "required" && (
                        <p className='text-warning' style={{ fontSize: '15x' }}>Name is required!!</p>
                    )}
                    {errors.name?.type === "maxLength" && (
                        <p className='text-warning' style={{ fontSize: '15x' }}>Name exceed limit!!</p>
                    )}
                </div>
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
                <div className='my-1'>

                    <label htmlFor="confirmPass" className='form-label'>Confirm Password</label>
                    <input type="password" id='confirmPass' className='form-control'{...register("confirmPass", {
                        required: true,
                        validate: (pass) => {
                            // check if password is mathing with confirmation password 
                            if (watch('userPassword') !== pass) {
                                return "password and confirm password must be match"
                            }
                        }
                    })} />


                    {/* defining form errors  */}
                    {errors.confirmPass?.type === "validate" && (<p className='text-warning' style={{ fontSize: '15x' }}>{errors.confirmPass.message}</p>)}
                    {errors.password?.type === "required" && (
                        <p className='text-warning' style={{ fontSize: '15x' }}>Confirm password is required!!</p>
                    )}

                </div>
                <button className={`btn fs-6 my-3 mx-auto ${storeStyles.myBtn}`} type="submit" >Sign Up</button>

            </form>
            <NavLink className='text-center d-block text-warning' to='/account/login'>Already Registered?</NavLink>
        </>
    )
}

export default SignUP

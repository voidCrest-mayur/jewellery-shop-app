import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import storeStyles from '../styles/Store.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { updateCustomer } from '../redux/actions/customerCRUDAction';




const CustomCustomerForm = () => {

    // fetching form  intialData and form function  from redux store 
    const intitalData = useSelector(state => state.changeFormFun.intialFormData)
    const fetchFunction = useSelector(state => state.changeFormFun.formFunction);

    const dispatch = useDispatch();
    const [formFunctionStatus, setFormFunctionStatus] = useState('Create')

    // intializing react-hook-form 
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: intitalData })


    useEffect(() => {
        // on loading the component to check if function have to be for creating or updating 
        if (fetchFunction === updateCustomer) {
            setFormFunctionStatus('Update')
            reset(intitalData)
        }
    }, [fetchFunction, intitalData, reset])

    const onSubmitData = (data, e) => {
        // handling how to submit form data 

        e.preventDefault();
        if (fetchFunction === updateCustomer) {
            dispatch(fetchFunction(data));
            alert(`${data.firstName} data has been updating...`)
        }
        dispatch(fetchFunction(data))
    }

    return (
        <div className=''>
            <form className='text-light ' onSubmit={handleSubmit(onSubmitData)}>
                <div className='my-1'>
                    <label htmlFor="firstName" className='form-label'>First Name</label>
                    <input id='firstName' className='form-control' {...register("firstName", {
                        required: true,
                        maxLength: 20
                    })} />

                    {/* errors  */}
                    {errors.firstName?.type === "required" && (
                        <p className='text-warning' style={{ fontSize: '15x' }}>First name is required!!</p>
                    )}
                    {errors.firstName?.type === "maxLength" && (
                        <p className='text-warning' style={{ fontSize: '15x' }}>First Name exceed limit!!</p>
                    )}
                </div>
                <div className='my-1'>
                    <label htmlFor="lastName" className='form-label'>Last Name</label>
                    <input id='lastName' className='form-control' {...register("lastName", {
                        required: true,
                        maxLength: 25
                    })} />

                    {/* defining form errors  */}
                    {errors.lastName?.type === "required" && (
                        <p className='text-warning' style={{ fontSize: '15x' }}>Last name is required!!</p>
                    )}
                    {errors.lastName?.type === "maxLength" && (
                        <p className='text-warning' style={{ fontSize: '15x' }}>Last Name exceed limit!!</p>
                    )}
                </div>
                <div className='my-1'>
                    <label htmlFor="email" className='form-label'>Email</label>
                    <input id='email' className='form-control' {...register("email", {
                        required: true,
                        pattern: {
                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                            message: "Enter valid Email"
                        }
                    }
                    )} />

                    {/* defining form errors  */}
                    {errors.email?.type === "required" && (
                        <p className='text-warning' style={{ fontSize: '15x' }}>Email is required!!</p>
                    )}
                    {errors.email?.type === "pattern" && (<p className='text-warning' style={{ fontSize: '15x' }}>{errors.email.message}</p>)}
                </div>
                <div className='my-1'>
                    <label htmlFor="address" className='form-label'>Address</label>
                    <textarea id='address' className='form-control'{...register("address", {
                        required: true,
                        maxLength: 50
                    })} />

                    {/* defining form errors  */}
                    {errors.address?.type === "required" && (
                        <p className='text-warning' style={{ fontSize: '15x' }}>Address is required!!</p>
                    )}
                    {errors.address?.type === "maxLength" && (
                        <p className='text-warning' style={{ fontSize: '15x' }}>Address exceed limit!!</p>
                    )}
                </div>

                <button className={`btn fs-6 my-3 mx-auto ${storeStyles.myBtn}`} type="submit" >{formFunctionStatus}</button>
            </form>
            <hr className='text-light' />
        </div>
    )
}

export default CustomCustomerForm

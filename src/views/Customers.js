import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import useDocumentTitle from '../utils/hooks/useDocumentTitle'
import storeStyles from '../styles/Store.module.css'
import CustomCustomerForm from '../components/CustomCustomerForm'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading'
import { fetchCustomersFailure, fetchCustomersRequest, fetchCustomersSuccess } from '../redux/actions/fetchCustomersAction'
import { deleteCustomer } from '../redux/actions/customerCRUDAction'
import { updateFormFunction } from '../redux/actions/formFunctionAction'
import isUserAuth from '../utils/customFunctions/isUserAuth'
import { useNavigate } from 'react-router-dom'

const Customers = () => {

  useDocumentTitle('VOID JEWELLERY - Our Customers')

  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuth(isUserAuth())
  }, [isAuth])

  useEffect(() => {
    // fetching customers details from server and saving  in redux store 

    dispatch(fetchCustomersRequest());
    fetch("http://localhost:666/users").then(response => {
      return response.json()
    }).then(responseData => {
      const customersData = responseData;
      dispatch(fetchCustomersSuccess(customersData))
    }).catch(error => {
      dispatch(fetchCustomersFailure(error))
    })
  }, [dispatch])


  // fetching existing customers data from redux store 
  const customersData = useSelector(state => state.fetchCustomers.customers)
  const loadingStatus = useSelector(state => state.fetchCustomers.loading)

  const handleUpdate = (customerData) => {
    // handling update event if user is autherized
    if (isAuth) {

      // changing form function from create to update 
      dispatch(updateFormFunction(customerData))
    }
    else {

      // if user is not autherized the navigate to sign up page 
      alert('Please signUp/login first!!');
      navigate('/account/sign_up')
    }

  }

  const handleDelete = (customerData) => {
    // handling delete event if user is autherized
    if (isAuth) {
      const useConfirmation = window.confirm(`Are you sure wanted to delete ${customerData.firstName}'s data!`);
      if (useConfirmation)

        // sent data to store for remove this particular customer 
        dispatch(deleteCustomer(customerData));
    }
    else {

      // if user is not autherized the navigate to sign up page 
      alert('Please signUp/login first!!');
      navigate('/account/sign_up')
    }

  }

  return (
    <>

      {/* navbar component  */}
      <NavBar />

      {/* main section  */}
      <section className={`container mt-5 p-4 ${storeStyles.productContainer}`}>


        <div className="row">

          {/* form section */}
          <div className="col-12 col-lg-4">

            {/* custom form component  */}
            <CustomCustomerForm />
          </div>

          {/* customer table section  */}
          <div className="col-12 col-lg-8">
            <div className="container-fluid table-responsive my-5 ">
              {(loadingStatus) ? <Loading /> :
                <table className="table  table align-middle fs-6 table-dark table-striped">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Address</th>
                      <th scope="col">Email</th>
                      <th scope='col'>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      customersData.map((each) => {
                        return (<tr key={each.id} >
                          <th scope="row">{each.id}</th>
                          <td>{each.firstName + " " + each.lastName}</td>
                          <td>{each.address}</td>
                          <td>{each.email}</td>
                          <td > <div className='d-flex  justify-content-center align-items-center'><button className='btn btn-warning mx-1' type="button" onClick={() => handleUpdate(each)}>UPDATE</button>  <button className='btn btn-danger mx-1' onClick={() => handleDelete(each)} type="button ">DELETE</button></div></td>
                        </tr>)
                      })

                    }

                  </tbody>
                </table>
              }
              <hr />
            </div>
          </div>

        </div>
      </section>

      {/* footer component  */}
      <Footer />
    </>
  )
}

export default Customers

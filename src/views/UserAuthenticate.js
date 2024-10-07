import React from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import storeStyles from '../styles/Store.module.css'
import { Outlet } from 'react-router-dom'

const UserAuthenticate = () => {

  return (
    <>
      {/* navbar component  */}
      <NavBar />

      {/* main section  */}
      <section className={`container mt-5 p-4 ${storeStyles.productContainer}`}>

        {/* Login component or signUp component based on routes  */}
        <Outlet />

      </section>

      {/* footer component  */}
      <Footer />
    </>
  )
}

export default UserAuthenticate

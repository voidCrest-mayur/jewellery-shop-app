import React from 'react'
import styles from '../styles/NavBar.module.css'
import { Link } from 'react-router-dom'
import useDocumentTitle from '../utils/hooks/useDocumentTitle'

const Error = () => {

  useDocumentTitle('Page Not Found')

  return (
    <div className="container vh-100 d-flex   flex-column justify-content-center align-items-center ">
        <h1 style={{fontSize:"10vw", color:"#ffce53"}}>Page Not Found</h1>
        <h3 style={{fontSize:"2vw", color:"#ffce53"}}>We couldn't find the page you were looking for. Perhaps it doesn't exist?</h3>
        <div className="d-flex w-50 my-4 justify-content-around  align-items-center">
            <Link className={` ${styles.customNavLink}`} to={"/"}>Home</Link>
            <Link  className={` ${styles.customNavLink}`} to={"/store"}>Store</Link>
            <Link  className={` ${styles.customNavLink}`} to={"/customers"}>Customers</Link>
        </div>
      </div>
  )
}

export default Error

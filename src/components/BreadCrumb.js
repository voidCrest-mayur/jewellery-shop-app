import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/BreadCrumb.module.css'

const BreadCrumb = ({ currentNavTitle, previousNavTitle, previousNavLink }) => {
  return (

    <nav className={` d-flex flex-column mt-4 justify-content-center text-capitalize align-items-center  ${styles.breadCrumbContainer}`} aria-label="breadcrumb" >
      <h1 className='display-3 '>{currentNavTitle}</h1>
      <ol className="breadcrumb">
        <li className="breadcrumb-item text-capitalize">< Link className='text-decoration-none' to={`${previousNavLink}`}>{previousNavTitle}</Link></li>
        <li className="breadcrumb-item text-capitalize" aria-current="page">{currentNavTitle}</li>
      </ol>
    </nav>


  )
}

export default BreadCrumb

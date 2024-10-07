import React from 'react'
import styles from '../styles/Footer.module.css'

const Footer = () => {

  return (
    <footer className={`container-fluid mt-5 ${styles.footerFormat}`}>
      <div className='w-100 text-center'>
        <h5 className='fs-5'>
          Copyright &copy; 2023 Void Jewellery
        </h5>
      </div>
    </footer>

  )
}

export default Footer

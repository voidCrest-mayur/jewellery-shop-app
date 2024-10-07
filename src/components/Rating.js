import React from 'react'
import styles from '../styles/Rating.module.css'

const Rating = ({ rate }) => {

    return (
        <>

            {/* showing rating based on given rating  */}
            <span className='text-light mx-1 font-monospace'>{rate}</span>
            <div className={`w-50 ${styles.Stars}`} style={{ '--rating': rate }} aria-label="Rating of this product is 2.3 out of 5."></div>

        </>

    )
}

export default Rating

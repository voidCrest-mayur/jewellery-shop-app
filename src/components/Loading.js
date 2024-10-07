import React from 'react'
import styles from '../styles/Loading.module.css'

const Loading = () => {
    return (
        <div className={`container ${styles.alignment}`}>
            <div>
                <div className={`spinner-grow mx-2 ${styles.loadingColor}`} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <div className={`spinner-grow mx-2 ${styles.loadingColor}`} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <div className={`spinner-grow mx-2 ${styles.loadingColor}`} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <div className={`spinner-grow mx-2 ${styles.loadingColor}`} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    )
}

export default Loading

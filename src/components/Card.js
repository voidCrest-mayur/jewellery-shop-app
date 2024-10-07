import React from 'react'
import styles from '../styles/Card.module.css'
import { Link } from 'react-router-dom'
import discountPrice from '../utils/customFunctions/discountPrice'

const Card = ({ productId, productTitle, productCategory, productImageUrl, productPrice, productDiscount }) => {

  return (
    <div className={`card position-relative   ${styles.cardBody}`} >

      {/* card image  */}
      <div className={`${styles.cardImage} rounded-0   card-img-top`}>
        <img src={productImageUrl} className=" rounded-0  img-fluid " alt={`${productTitle}-img`} />
      </div>

      {/* card on image icons  */}
      {/* Note: this feature is still in progress */}
      <div className={`m-2 ${styles.optionsIcon}`}>
        <div className=' rounded-circle'   >
          <button type="button" className='btn m-0 p-0 border-0' title="View product" data-bs-placement="left">
            <span className=" text-light d-inline-block m-1 p-1  fs-5 fw-light material-symbols-outlined"  >
              shopping_bag
            </span>
          </button>

        </div>
      </div>


      {/* products discount view if only there is discount of product available */}
      {(Math.floor(productDiscount) > 0) ?
        <div className={`m-2 position-absolute top-0 start-0  ${styles.discountIcon}`}>
          <div className=' rounded-circle '   >
            <p className='text-light p-1  fs-6'>-{Math.floor(productDiscount)}%</p>
          </div>
        </div> : ''}

      {/* card body  */}
      <div className="card-body">
        <Link className='nav-link' to={`/store/${productId}`}>
          <p className={`card-title ${styles.cardCategory}`}>{productCategory}</p>
          <h2 className={` ${styles.cardName}`}>{productTitle}</h2>
          {
            (Math.floor(productDiscount) > 0) ? <>
              <p className={`${styles.cardPrice} `}>${discountPrice(productPrice, productDiscount)}</p>
              <p className={`${styles.cardPrice} text-decoration-line-through`}>${productPrice}</p></> :
              <p className={`${styles.cardPrice}`}>${productPrice}</p>
          }
        </Link >

      </div>
    </div>

  )
}


export default Card

import React from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import styles from '../styles/Cart.module.css'
import storeStyles from '../styles/Store.module.css'
import useDocumentTitle from '../utils/hooks/useDocumentTitle'
import { useDispatch, useSelector } from 'react-redux'
import { getTotalCartPrice, removeProductFromCart, updateProductFromCart } from '../redux/actions/cartProductsAction'



const Cart = () => {
  useDocumentTitle('VOID JEWELLERY - Cart')
  const dispatch = useDispatch();
  const cartProducts = useSelector(state => state.cartProcucts.cartProducts);
  const cartTotalPrice = useSelector(state=>state.cartProcucts.totalCartPrice);


  const handleQuantityIncrease = (product) => {
    
    if (product.productQuantity < 5) {
      const updatedProduct = {...product,price:(product.price+product.initPrice), productQuantity:(product.productQuantity+1)}
      dispatch(updateProductFromCart(updatedProduct));
      dispatch(getTotalCartPrice())
    }
    else {
      alert('Maximum order limit is only 5 unit in one time!')
    }
  }
  const handleQuantityDecrease = (product) => {
   
    if(product.productQuantity>1){ 
      const updatedProduct = {...product,price:(product.price-product.initPrice), productQuantity:(product.productQuantity-1)}
      dispatch(updateProductFromCart(updatedProduct));
      dispatch(getTotalCartPrice())
    }
  }

  const handleProductRemove =(product)=>{
    dispatch(removeProductFromCart(product))
    dispatch(getTotalCartPrice())
  }
  return (
    <>
      <NavBar />

      <section className={`container mt-5 p-2 ${storeStyles.productContainer}`}>
        
        <div className="row">
          {(cartProducts.length!==0)?
          <div className="col-md-10 col-11 mx-auto">
            <div className="row my-5 gx-4">
              {/* left side div  */}
              <div className="col-md-12 col-lg-8 col-11  mx-auto main_cart mb-lg-0 mb-5 shadow">
                <div className={`card  p-4 ${styles.cardBody}`}>
                    <h2 className="py-4 font-weight-bold">Cart ({cartProducts.length} items)</h2>
                     {cartProducts.map((product) => {
                      
                      return (
                        <div  key={product.id}>
                      <div className="row  ">
                        {/* cart image div  */}
                        <div className={`col-md-5  col-11 mx-auto  d-flex 
                            justify-content-center align-items-center  bg-light shadow ${styles.product_img}`}>
                          <img src={product.thumbnail} className="img-fluid object-fit-fill" alt="productImg" />
                        </div>

                        {/* cart product details  */}
                        <div className="col-md-7 col-11 mx-auto px-4 mt-2">


                          <div className="row  ">
                            {/* product name   */}
                            <div className={`col-12 col-md-6 ${styles.cartTitle}`}>
                              <h1 className=" fs-5 text-md-start text-center mb-2">{product.title}</h1>
                              <p className="mb-2">{product.category}</p>
                            </div>  

                            {/* product quntity  */}
                            <div className="col-12  col-md-6">
                              <ul className={`pagination  justify-content-center justify-content-md-end ${styles.set_quantity} `}>
                                <li className={`page-item ${styles.pageItem}`}>
                                  <button className={` page-link ${styles.pageLink}`} onClick={() => { handleQuantityDecrease(product) }}>
                                    <span className="material-symbols-outlined">
                                      remove
                                    </span>
                                  </button></li>
                                <li className={` page-item ${styles.pageItem}`}>
                                  <input type="text" name="" className="page-link w-100 itemValBox" value={product.productQuantity} id="textBox"
                                    disabled />
                                </li>
                                <li className={` page-item ${styles.pageItem}`}>
                                  <button className={` page-link ${styles.pageLink}`} onClick={() => { handleQuantityIncrease(product) }}>
                                    <span className="material-symbols-outlined">
                                      add
                                    </span>
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </div>
                         

                          {/* product price and another details  */}
                          <div className="row mt-4 mt-md-0">
                            <div className={`col-9 col-md-6 d-flex justify-content-between ${styles.removeWish}`}>
                              <button className="btn page-link" onClick={()=>handleProductRemove(product)} data-bs-toggle="tooltip" data-bs-placement="bottom" title="REMOVE ITEM"><span className="material-symbols-outlined">delete</span>
                              </button>

                            </div>
                            <div className={`col-3 col-md-6 d-flex pt-2  justify-content-md-end justify-content-center align-items-center ${styles.priceMoney}`}>
                              <h3>$<span >{product.price}</span></h3>
                            </div>
                          </div>
                        </div>
                       
                      </div>
                       <hr className='text-white' /></div>
                      )})}
                </div>
                
              </div>

              {/* right side div  */}
              <div className="col-md-12 col-lg-4 col-11 mx-auto mt-lg-0 mt-md-5">
                <div className={`right_side p-3 shadow ${styles.cardBody}`}>
                  <h2 className="product_name mb-5 fs-4">The Total Amount Of</h2>
                  <div className="price_indiv d-flex justify-content-between">
                    <p>Product amount</p>
                    <p>$<span id="productAmount">{cartTotalPrice}</span>.00</p>
                  </div>
                  <div className="price_indiv d-flex justify-content-between">
                    <p>Shipping Charge</p>
                    <p>$<span id="shippingAmount">50</span>.0</p>
                  </div>
                  <hr />
                  <div className="total-amt d-flex justify-content-between font-weight-bold">
                    <p>The total amount of (including GST)</p>
                    <p>$<span id="total_cart_amt">{cartTotalPrice+50}</span>.00</p>
                  </div>

                  <button className={`btn fs-6 mx-auto  text-uppercase ${storeStyles.myBtn}`}>Checkout</button>
                </div>
                <div className={`mt-3 shadow p-3  ${styles.cardBody} `}>
                  <div className="mt-1">
                    <h2 className="mb-4 fs-4"> Expected delivery date</h2>
                    <p>Expected by December 5th 2023</p>
                  </div>
                </div>
              </div>
            </div>
          </div>:<h2 className='col-md-11 col-12 text-center mx-auto'>No items in the cart</h2>}
        </div>
      </section >

      <Footer />
    </>
  )
}

export default Cart

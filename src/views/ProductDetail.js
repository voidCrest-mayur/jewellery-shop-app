import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Loading from '../components/Loading'
import Footer from '../components/Footer'
import styles from '../styles/ProductDetail.module.css'
import storeStyles from '../styles/Store.module.css'
import useDocumentTitle from '../utils/hooks/useDocumentTitle'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Rating from '../components/Rating'
import BreadCrumb from '../components/BreadCrumb'
import discountPrice from '../utils/customFunctions/discountPrice'
import { addProductToCart, getTotalCartPrice } from '../redux/actions/cartProductsAction'
import { fetchSelectedProductFailure, fetchSelectedProductRequest, fetchSelectedProductSuccess } from '../redux/actions/fetchSelectedProductAction'
import isUserAuth from '../utils/customFunctions/isUserAuth'




const ProductDetail = () => {

    useDocumentTitle('VOID JEWELLERY - productDetails')

    const urlParams = useParams();
    const dispatch = useDispatch();
    const [isActive, setIsActive] = useState(undefined);
    const [mainImg, setMainImg] = useState('');
    const [isProdcutAdded, setIsProductAdded] = useState(false);
    const [isAuth, setIsAuth] = useState(false)
    const navigate = useNavigate();


    useEffect(() => {
        // fetching particular product by its id and saving in another state

        dispatch(fetchSelectedProductRequest())
        fetch(`http://localhost:3333/products/${urlParams.id}`).then(response => {
            return response.json()
        }).then(responseData => {
            const productsData = responseData;
            console.log(productsData)
            dispatch(fetchSelectedProductSuccess(productsData))

        }).catch(error => {
            dispatch(fetchSelectedProductFailure(error))
        })

    }, [dispatch, urlParams])

    useEffect(() => {
        // setting value in isAuth to check if use is autherized or not 

        setIsAuth(isUserAuth())
    }, [isAuth])


    // fetching selected product details from redux store 
    const currentProduct = useSelector(state => state.selectedProduct.product)

    // fetching cart products details from redux store 
    const cartProcucts = useSelector(state => state.cartProcucts.cartProducts)


    const handleAddToCart = (product) => {
        // handling how to product add in the cart if user is autherized

        if (isAuth) {
            const isProductInCart = cartProcucts.filter(each => {
                return each.id === currentProduct.id
            }).length !== 0
            if (!isProductInCart) {

                // if products is not in the cart then save this product detail into cart state in redux store with adding additional properties

                const cartProduct = { ...product, price: discountPrice(product.price, product.discountPercentage), productQuantity: 1 }
                dispatch(addProductToCart(cartProduct));
                dispatch(getTotalCartPrice());
                setIsProductAdded(true);
            }
            else {
                setIsProductAdded(false)
                alert("This product is already in your cart!!")
            }
        }
        else {
            // if user is not autherized the navigate to sign up page 
            alert('Please signUp/login first!!');
            navigate('/account/sign_up')
        }
    }

    const setFrontImg = (url, key) => {
        // handle display image on hover event 

        setMainImg(url);
        setIsActive(key);
    }

    return (
        <>

            {/* navbar component*/}
            <NavBar />
            
            {/* custom breadcrumb component for routing   */}
            <BreadCrumb currentNavTitle={currentProduct.title} previousNavTitle={'Store'} previousNavLink={'/store'} />

            {/* main section  */}
            <section className={`container mt-5 p-4 ${storeStyles.productContainer}`}>
                {
                    currentProduct.length === 0 ? <Loading /> :

                        <div className='container-fluid text-light  my-4'>

                            {/* notify if product added in cart  */}
                            {(isProdcutAdded) ?
                                <div className="alert alert-success alert-dismissible fade show" role="alert">
                                    <strong>Thanks!</strong> Your Product has added in cart.
                                    <button type="button" className="btn-close " data-bs-dismiss="alert" aria-label="Close"></button>
                                </div> : ''}

                            <div className=" mt-5 pb-5 row">


                                {/* for laptop view  */}
                                <div className="col-2 d-none  d-lg-block ">
                                    <ul className={`${styles["list-group"]}`}>
                                        {
                                            currentProduct.images.map((url, index) => {
                                                return (<li key={index} onLoad={() => setFrontImg(currentProduct.images[0], 0)} onMouseOver={() => setFrontImg(url, index)} className={
                                                    `${isActive === index ? styles.active : ''}  ${styles["list-item"]} `}>
                                                    <span className={styles["list-item-img"]}>
                                                        <img src={url} className='img-fluid img-thumbnail' alt={`${currentProduct.title}-img`} />
                                                    </span>
                                                </li>)
                                            })
                                        }


                                    </ul>

                                </div>

                                {/* main display image  */}
                                <div className='col-12 col-lg-5'>
                                    <div>

                                        <img src={mainImg} className='mx-auto rounded  img-fluid w-100' alt={`${currentProduct.title}-img`} />
                                    </div>

                                </div>

                                {/* for mobile view  */}
                                <div className="col-12 g-2 my-4 d-block d-lg-none">
                                    <ul className={`d-flex  mb-1 container    justify-content-around align-items-center ${styles["list-group"]}`}>
                                        {
                                            currentProduct.images.map((url, index) => {
                                                return (<li key={index} onLoad={() => setFrontImg(currentProduct.images[0], 0)} onClick={() => setFrontImg(url, index)} className={
                                                    `${isActive === index ? styles.active : ''}  ${styles["list-item"]}`}>
                                                    <span className={styles["list-item-img"]}>
                                                        <img src={url} className='img-fluid img-thumbnail ' alt={`${currentProduct.title}-img`} />
                                                    </span>
                                                </li>)
                                            })
                                        }
                                    </ul>
                                </div>

                                {/* product details section  */}
                                <div className='col col-lg-5 col-md-12'>
                                    <div className="product-detail-header ">
                                        <h1 className='fw-normal fs-3 product-name'>{currentProduct.title} | {currentProduct.brand}</h1>
                                        <div className='mt-2 product-rating'>
                                            <Rating rate={currentProduct.rating} />
                                        </div>

                                    </div>
                                    <hr />
                                    <div className="product-detail-mid">
                                        <div className='price-description'>
                                            {(Math.floor(currentProduct.discountPercentage) > 0) ?

                                                <span className='fs-3 mx-2 text-danger'>-{Math.floor(currentProduct.discountPercentage)}%</span> : <small style={{ fontSize: '14px' }}>M.R.P :

                                                </small>}

                                            <span className='fs-3'>{discountPrice(currentProduct.price, currentProduct.discountPercentage)}</span><small> $</small>

                                            <br />
                                            {
                                                (Math.floor(currentProduct.discountPercentage) > 0) ?
                                                    <div className='fw-light'>
                                                        <small style={{ fontSize: '14px' }}>
                                                            M.R.P : </small>
                                                        <span style={{ fontSize: '13px' }} className='text-decoration-line-through'>{currentProduct.price}
                                                        </span>
                                                        <small style={{ fontSize: '8px' }}> $</small>
                                                    </div>
                                                    : ''}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className={`${styles.productDetailBottom}`}>
                                        <h4>About this item</h4>
                                        <p>{currentProduct.description}</p>
                                    </div>
                                    <hr />
                                    <div className={`${styles.productAddToCart}`}>
                                        <button className={`btn mx-auto fs-6   ${storeStyles.myBtn}`} onClick={() => { handleAddToCart(currentProduct) }}><span>Add To Cart</span></button>
                                    </div>
                                </div>
                            </div>
                        </div>

                }
                
            </section>


            {/* footer component  */}
            <Footer />
        </>
    )
}

export default ProductDetail

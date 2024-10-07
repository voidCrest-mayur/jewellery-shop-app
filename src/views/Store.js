import React, { useEffect } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import styles from '../styles/Store.module.css'
import useDocumentTitle from '../utils/hooks/useDocumentTitle'
import { useDispatch, useSelector } from 'react-redux'
import { fetcProductsRequest, fetchProductsFailure, fetchProductsSuccess } from '../redux/actions/fetchProductsAction'
import Card from '../components/Card'
import { filterProducts, saveProducts } from '../redux/actions/filterProductsAction'
import capitalizeString from '../utils/customFunctions/capitalizeString'


const Store = () => {

  useDocumentTitle(' VOID JEWELLERY - Store')

  const dispatch = useDispatch();

  useEffect(() => {

    // run only when page load on the machine

    // fetching products from server and saving  in redux store 
    dispatch(fetcProductsRequest());
    fetch("http://localhost:3333/products").then(response => {
      return response.json()
    }).then(responseData => {
      const productsData = responseData;
      dispatch(fetchProductsSuccess(productsData))
    }).catch(error => {
      dispatch(fetchProductsFailure(error))
    })
  }, [dispatch])

  // fetching products data from redux store 
  const productsData = useSelector(state => state.fetchProducts.products);

  useEffect(() => {

    // saving productsData into another state for filteration
    dispatch(saveProducts(productsData));
  }, [dispatch, productsData])


  // fetching only filter products data on filteration from redux store 
  const selectedProduct = useSelector(state => state.filterProducts.products)

  const handleSearch = (e) => {
    // for handling the search of products 

    e.preventDefault();
    const searchWord = capitalizeString(e.target.searchProduct.value);
    if (searchWord === '') {
      dispatch(saveProducts(productsData));
    }
    else {
      dispatch(filterProducts(searchWord))
    }
    e.target.searchProduct.value = ''
  }

  const handleResetProducts = () => {
    // for handling reset the filteration by search 

    dispatch(saveProducts(productsData))
  }

  return (
    <>
      {/* navBar  component */}
      <NavBar />

      {/* main products section */}
      <section className={`container mt-5 p-4 ${styles.productContainer}`}>
        <div className='d-flex justify-content-between align-items-center'>

          {/* filter section  */}
          <div >
            <button className={`btn ${styles.myBtn}`} type="button" data-bs-toggle="offcanvas" data-bs-target="#filterBtn" aria-controls="offcanvasExample">
              <span className="mx-2  material-symbols-outlined">
                tune
              </span><p className='my-0 d-inline'>Filter</p>
            </button>

            <div className={`offcanvas ${styles.productContainer} offcanvas-start`} data-bs-backdrop="true" data-bs-scroll="true" tabIndex="-1" id="filterBtn" aria-labelledby="offcanvasExampleLabel">
              <div className="offcanvas-header">
                <h5 className="offcanvas-title fs-3 text-light" id="offcanvasExampleLabel">Filter</h5>
                <button type="button" className="btn-close bg-white bg-light btn-light" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div className="offcanvas-body">
                <form className='d-flex justify-content-between align-items-center' onSubmit={handleSearch}>
                  <input className='form-control ' type="search" name="searchProduct" id="searchProduct" />
                  <button type='submit' className={` mx-3  w-25  d-inline-block text-center fs-6   ${styles.myBtn}`}>Search</button>
                </form>
                <button type="button " className={` my-3 d-block w-25 text-center mx-auto ${styles.myBtn}`} onClick={() => { handleResetProducts() }}>Reset</button>
              </div>
            </div>
          </div>
          <p className={`text-light ${styles.filterInfo}`}>Showing {selectedProduct.length} of {productsData.length} results</p>
        </div>

        {/* products cards section  */}
        <div className='mt-4 row'>
          {selectedProduct.length !== 0 ?
            selectedProduct.map((eachProduct) => {
              return (<div key={eachProduct.id} className="col-6 col-lg-3">

                {/* displaying card components based on number of products and giving props  */}

                <Card productId={eachProduct.id} productTitle={eachProduct.title} productCategory={eachProduct.category} productImageUrl={eachProduct.thumbnail} productPrice={eachProduct.price} productDiscount={eachProduct.discountPercentage} />
              </div>)
            }) :
            <div className='col-12'><h1 className='text-center'>No Products Found</h1></div>

          }
        </div>


      </section>

      {/* footer component */}
      <Footer />
    </>
  )
}

export default Store

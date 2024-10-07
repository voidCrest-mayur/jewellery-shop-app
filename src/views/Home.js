import React from 'react'
import styles from '../styles/Home.module.css'
import NavBar from '../components/NavBar'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import useDocumentTitle from '../utils/hooks/useDocumentTitle'


const Home = () => {
    useDocumentTitle('VOID JEWELLERY - Home');
    return (
        <>

            {/* navBar component */}
            <NavBar />

            {/* front banner section  */}
            <section className='container-fluid mt-5'>
                <div className={`row  ${styles.banner} `}>
                    <div className={`col-12 col-lg-12 ${styles.bannerOverLayer}`}>
                        <img className={`img-fluid object-fit-fill  `} src="/resources/images/home/banner.jpg" alt="banner-pic" />
                        <div className={`row  ${styles.bannerText}`}>
                            <div className='d-none d-lg-block col-6'></div>
                            <div className='col-12  col-lg-6'>
                                <h1 className='display-1'>HIM & HER</h1>
                                <h5 className='fs-3'>Love Collection</h5>
                                <p className='fs-6 text-light'>Exclusive diamond rings for couples and lovers.</p>
                                <Link className={` mt-5 btn ${styles.myBtn}`} to={'/store'} >SHOP NOW</Link>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* middle page sections */}
            <section className='container-fluid mt-5'>
                <div className={`row  ${styles.imageSections}`}>
                    <div className='col-4 d-none d-lg-block'>
                        <div className='shadow-lg position-relative h-100 '>

                            <img className='img-fluid h-100 ' src="/resources/images/home/picTwo.jpg" alt="page-img" />
                            <div className={`row  ${styles.imageSectionText}`}>
                                <div className='col-12'>
                                    <h1 className='text-wrap fs-3 text-center'>Diamond Earrings</h1>

                                    <p className='fs-6 text-center'>Lorem ipsum dolor sit amet, adipiscing elit</p>
                                    <Link className={` mx-auto d-block w-75 mt-4 btn ${styles.myBtn}`} to={'/store'} >$200 - BUY NOW
                                    </Link>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className='col-11  col-lg-8'>
                        <div className='shadow-lg position-relative h-100 '>
                            <img className='img-fluid  h-100 ' src="/resources/images/home/picThree.jpg" alt="page-img" />
                            <div className={`row  ${styles.imageSectionText}`}>
                                <div className='col-12  d-flex flex-column  align-items-end justify-content-end'>
                                    <h1 className='text-wrap text-end'>GIVE HER THE BEST THING SHE DESERVES</h1>

                                    <Link className={`d-block  mt-5 btn ${styles.myBtn}`} to={'/store'} >SHOP NOW</Link>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* middle page sections */}
            <section className='container-fluid mt-5  '>
                <div className={`row  ${styles.imageSections} `}>
                    <div className='col-11  col-lg-8'>
                        <div className='shadow-lg position-relative  h-100'>
                            <img className='img-fluid  h-100 w-100' src="/resources/images/home/picOne.jpg" alt="page-img" />
                            <div className={`row  ${styles.imageSectionText}`}>
                                <div className='col-12  d-flex flex-column  align-items-start justify-content-start'>
                                    <h1 className='text-wrap text-start'>FOR HIM</h1>
                                    <p className='fs-6 mt-3'>Exclusive diamond rings & chain for gold loving men</p>
                                    <Link className={`d-block  mt-5 btn ${styles.myBtn}`} to={'/store'} >SHOP NOW</Link>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='col-4 d-none d-lg-block'>
                        <div className='shadow-lg  position-relative h-100'>
                            <img className='img-fluid h-100 w-100' src="/resources/images/home/picFive.jpg" alt="page-img" />
                            <div className={`row bottom-100 top-50  ${styles.imageSectionText} `}>
                                <div className='col-12 '>
                                    <h1 className='text-wrap fs-3 text-center'>Everything You Need For The Best Look You Wish</h1>

                                    <Link className={`mx-auto d-block w-50 mt-5 btn ${styles.myBtn}`} to={'/store'} >SHOP NOW</Link>
                                </div>

                            </div>
                        </div>
                    </div>


                </div>
            </section>


            {/* footer  component */}
            <Footer />
        </>
    )
}

export default Home

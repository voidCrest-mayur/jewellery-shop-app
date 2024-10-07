import React, { useEffect, useState } from 'react'
import styles from '../styles/NavBar.module.css'
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import isUserAuth from '../utils/customFunctions/isUserAuth';

const NavBar = () => {

    // fetch cart details from redux store 
    const cartProducts = useSelector(state => state.cartProcucts.cartProducts);
    const cartTotalPrice = useSelector(state => state.cartProcucts.totalCartPrice);


    const [authUser, setAuthUser] = useState();
    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        // taking details of user if user is autherized or not 

        setIsAuth(isUserAuth())
        if (isAuth) {
            let user = JSON.parse(window.sessionStorage.getItem('token'))
            setAuthUser(user.name.split(' ')[0])

        }
    }, [isAuth])


    const handleLogOut = () => {
        // handling log out 

        window.sessionStorage.clear();
        window.location.reload();

    }

    return (
        <>
            <nav className={`navbar mt-lg-4 navbar-expand-lg  ${styles.navBarColor}  `}>
                <div className="container-fluid">

                    {/* app logo  */}
                    <div className={`navbar-brand rounded-circle  ${styles.brandLogo}  nav-Link`} to={'/'}>
                        <img className={`  img-fluid object-fit-fill `} alt='brand-logo' src='/resources/images/brandLogo.png' />
                    </div>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse  navbar-collapse" id="navbarText">

                        {/* navbar links */}
                        <ul className={`navbar-nav  me-auto mb-2 mb-lg-0"`}>
                            <li className="nav-item">
                                <NavLink className={`nav-link ${styles.customNavLink}`}
                                    style={
                                        ({ isActive }) => {
                                            return isActive ? { color: "#ffce53" } : {};
                                        }
                                    } to={"/"}>Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={`nav-link ${styles.customNavLink}`}
                                    style={
                                        ({ isActive }) => {
                                            return isActive ? { color: "#ffce53" } : {};
                                        }
                                    } to={"/store"}>Store</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={`nav-link ${styles.customNavLink}`}
                                    style={
                                        ({ isActive }) => {
                                            return isActive ? { color: "#ffce53" } : {};
                                        }
                                    } to={"/customers"}>Customers</NavLink>
                            </li>
                        </ul>


                        {/* nav bar right side section */}
                        {(isAuth) ? 
                        <>

                            {/* <p className={`navbar-text my-2 ${styles.navCartInfo}`}></p> */}
                            <span className={`navbar-text nav-item dropdown  ${styles.navCartInfo}`}>
                                <span className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {authUser}
                                </span>
                                <ul className={`text-decoration-none dropdown-menu navbar-text bg-transparent text-light`} >
                                    <li><span role='button' onClick={() => { handleLogOut() }}>Log out</span></li>
                                </ul>
                            </span>


                        </>
                        : 
                        <NavLink className={`navbar-text  ${styles.navCartInfo}`} to='/account/sign_up'>
                                <span className='' id='cartItemCount'>SignUp/Login</span>
                            </NavLink>
                            }
                        {
                        // cart show only if user is autherized
                        (isAuth) ? 
                        <Link className={`navbar-text  ${styles.navCartInfo}`} to='/cart'>
                            Cart/$<span className='mx-1' id='cartPrice'>{(cartTotalPrice !== 0) ? cartTotalPrice + 50 : 0}.00</span>
                            <span className=" material-symbols-outlined">
                                shopping_bag
                            </span>
                            <span className='mb-2' id='cartItemCount'>{cartProducts.length}</span>

                        </Link> : ''}

                    </div>
                </div>
            </nav>
        </>
    )

}

export default NavBar

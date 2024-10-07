import React, { Suspense } from 'react';
import './App.css';
import Loading from './components/Loading';
import { Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Customers from './views/Customers';
import Error from './views/Error';
import ProductDetail from './views/ProductDetail';
import Cart from './views/Cart';
import UserAuthenticate from './views/UserAuthenticate';
import SignUP from './components/SignUP';
import Login from './components/Login';


//  Lazy loding for Store page  
const Store = React.lazy(() => import("./views/Store"));

function App() {
  return (
    <>

      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/store' element={<Store />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/account' element={<UserAuthenticate />} >
            <Route path='sign_up' element={<SignUP />} />
            <Route path='login' element={<Login />} />
          </Route>
          <Route path='/store/:id' element={<ProductDetail />}></Route>
          <Route path='/customers' element={<Customers />} />
          <Route path='*' element={<Error />} />

        </Routes>
      </Suspense>
    </>
  );
}

export default App;

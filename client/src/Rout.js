import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home.js'
import Product from './components/Product.js'
import Cart from './components/Cart.js'
import Contact from './components/Contact.js'
import Register from './pages/Register.js'
import Login from './pages/Login.js'
import AdminLogin from './pages/AdminLogin.js'

const Rout = ({product, setProduct, detail, view, close, setClose, cart, setCart, addtocart}) => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home detail={detail} view={view} close={close} setClose={setClose} addtocart={addtocart}/>}/>
        <Route path='/product' element={<Product product={product} setProduct={setProduct} detail={detail} view={view} close={close} setClose={setClose} addtocart={addtocart}/>} />
        <Route path='/cart' element={<Cart cart={cart} setCart={setCart} />}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/admin' element={<AdminLogin/>}/>
      </Routes>
    </>
  )
}

export default Rout

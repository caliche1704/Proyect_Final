import React, {useState} from 'react';
import Nav from './components/Nav.js';
import { BrowserRouter } from 'react-router-dom'; 
import Rout from './Rout.js';
import Footer from './components/Footer.js';
import ProductDetail from './components/ProductDetail.js';

const App = () => {
  //add to cart
  const [cart, setCart] = useState([])
  //product detail
  const [close, setClose] = useState(false)
  const [detail, setDetail] = useState([])
  //filter product
  const [product, setProduct] = useState(ProductDetail); 
  const searchbtn = (product) =>
  {
    const change = ProductDetail.filter((x) => {
      return x.Cat === product
    })
    setProduct(change)
  } 
  //product detail 
  const view = (product) =>
  {
    setDetail([{...product}])
    setClose(true)
  }
  // add to cart
  const addtocart = (product) =>
  {
    const exist = cart.find((x) => 
    {
      return x.id === product.id
    })
    if(exist)
    {
      alert("Este producto ya está en el carrito")
    }
    else
    {
      setCart([...cart, {...product, qty:1}])
      alert("Este producto ha sido agregado al carrito")
    }
  }
  console.log(cart)
  return (
    <>
    <BrowserRouter>
     <Nav searchbtn={searchbtn} />
     <Rout product={product} setProduct={setProduct} detail={detail} view={view} close={close} setClose={setClose} cart={cart} setCart={setCart} addtocart={addtocart}/>
     <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App


import React from 'react'

import { MdClose } from "react-icons/md";
import { Link } from 'react-router-dom';
import '../cart.css'

const Cart = ({cart, setCart}) => {
  //incremento qty
  const incqty = (product) =>
  {
    const exsit = cart.find((x) =>
    {
      return x.id === product.id
    })
    setCart(cart.map((curElm) => 
    {
      return curElm.id === product.id ? {...exsit, qty: exsit.qty + 1} : curElm
    }))
  }
  // decremento qty
  const decqty = (product) =>
  {
    if (product.qty >= 1){
      const exsit = cart.find((x) =>
    {
      return x.id === product.id
    })
    setCart(cart.map((curElm) => 
    {
      return curElm.id === product.id ? {...exsit, qty: exsit.qty - 1} : curElm
    }))
    }
  }
  // remover producto 
  const removeproduct = (product) => 
  {
    const exsit = cart.find((x) =>
    {
      return x.id === product.id
    })
    if(exsit.qty > 0)
    {
      setCart(cart.filter((x) => 
      {
        return x.id !== product.id
      }))
    }
  }
  // precio total
  const Totalprice = cart.reduce((price, item) => price + item.qty * item.Price, 0)
  return (
    <>
      <div className='cart-container'>
        {cart.length === 0 &&
          <div className='emptycart'>
            <h2 className='empty'>Tú carrito está vacío</h2>
            <Link to='/product' className='emptybtn'>Compra ahora</Link>
          </div>
         }
        <div className='contant'>
            {
                cart.map((curElm) => 
                {
                    return(
                        <div className='cart_item' key={curElm.id}>
                            <div className='img_box'>
                                <img src={curElm.Img} alt={curElm.Title}></img>
                            </div>
                            <div className='detail'>
                              <div className='info'>
                                <h4>{curElm.Cat}</h4>
                                <h3>{curElm.Title}</h3>
                                <p>Precio: ${curElm.Price}</p>
                                <div className='qty'>
                                  <button className='decqty' onClick={() => decqty(curElm)}>-</button>
                                  <input type='text' value={curElm.qty}></input>
                                  <button className='incqty' onClick={() => incqty(curElm)}>+</button>
                                </div> 
                                <h4 className='subtotal'>sub total: ${curElm.Price * curElm.qty}.000</h4>
                              </div>
                                <div className='close'>
                                 <button onClick={() => removeproduct(curElm)}><MdClose/></button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        {
          cart.length > 0 && 
          <>
           <h2 className='totalprice'> TOTAL: ${Totalprice}.000</h2>
           <button className='checkout'>Checkout</button>
          </>
        }
      </div>
    </>
  )
}

export default Cart

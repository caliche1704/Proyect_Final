import React from 'react'
import { HiShoppingBag } from "react-icons/hi2";
import { IoIosEye } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { FaRegWindowClose } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";

import ProductDetail from './ProductDetail';
import '../product.css'; 

const Product = ({product, setProduct, detail, view, close, setClose, addtocart}) => {

    const { loginWithRedirect, isAuthenticated } = useAuth0();
    const filtterproduct = (product) => 
    {
        const update = ProductDetail.filter((x) => 
        {
           return x.Cat === product;
        })
        setProduct(update); 
    }
    const AllProducts = () =>
    {
        setProduct(ProductDetail)
    }
  return (
    <>
    {
      close ?
      <div className='product_detail'>
        <div className='container'>
            <button className='closebtn' onClick={() => setClose(false)}><FaRegWindowClose/></button>
            {
                detail.map((curElm) =>
                {
                    return(
                        <div className='productbox'>
                            <div className='img-box'>
                                <img src={curElm.Img} alt={curElm.Title}></img>
                            </div>
                            <div className='detail'>
                                <h4>{curElm.Cat}</h4>
                                <h2>{curElm.Title}</h2>
                                <p>La mejor calidad de las prendas las encuentras en God's Plan, camisetas oversize, tela fría y slim
                                    <br/> Contamos con prendas fabricadas 100% en colombia, los mejores precios y confiabilidad asegurada 
                                </p>
                                <h3>${curElm.Price}</h3>
                                <button onClick={() => addtocart (curElm)}>Añadir al carrito</button>
                            </div>
                        </div>
                    )   
                })
            }
        </div>
      </div> : null
    }
      <div className='products'>
        <h2># Productos</h2>
        <p>Inicio . Productos</p>
        <div className='container'>
            <div className='filter'>
                <div className='categories'>
                    <h3>Categorías</h3>
                    <ul>
                        <li onClick={() => AllProducts ()}>Todos</li>
                        <li onClick={() => filtterproduct ("Drop uno")}>First Drop</li>
                        <li onClick={() => filtterproduct ("G-Drop")}>G-Drop</li>
                        <li onClick={() => filtterproduct ("Gorras")}>Gorras</li>
                    </ul>
                </div>
            </div>
            <div className='productbox'>
                <div className='content'>
                    {
                        product.map((curElm) => {
                            return(
                                <>
                                    <div className='box' key={curElm.id}>
                                        <div className='img_box'>
                                            <img src={curElm.Img} alt={curElm.Title}></img>
                                        </div>
                                        <div className='detail'>
                                            <p>{curElm.Cat}</p>
                                            <h3>{curElm.Title}</h3>
                                            <h4>${curElm.Price}</h4>
                                        </div>
                                        <div className='icon'>
                                            <ul>
                                            {
                                                isAuthenticated ?
                                                <li onClick={() => addtocart (curElm)}><HiShoppingBag/></li>
                                                :
                                                <li onClick={() => loginWithRedirect()}><HiShoppingBag/></li>
                                            }
                                                <li onClick={() => view (curElm)}><IoIosEye/></li>
                                                <li><FaRegHeart/></li>
                                            </ul> 
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Product

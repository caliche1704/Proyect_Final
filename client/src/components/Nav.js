import React, { useEffect, useState } from 'react'
import { FaTruckArrowRight } from "react-icons/fa6";
import { FaHeartCircleCheck } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { GiExitDoor } from "react-icons/gi";
import { GiEntryDoor } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';
import '../nav.css'; 
import axios from 'axios';

const Nav = ({searchbtn}) => {
    const [search, setSearch] = useState(); 
    const [auth, setAuth] = useState(false); 
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');

    axios.defaults.withCredentials = true; 
    
    useEffect(() => {
        axios.get('http://localhost:5000')
        .then(res => {
          if(res.data.Status === "Success") {
            setAuth(true)
            setName(res.data.name);
          }else{
            setAuth(false)
            setMessage(res.data.Error)
          }
        })
        .then(err => console.log(err)); 
    }, [])

    const handleDelete = () => {
        axios.get('http://localhost:5000/logout')
        .then(res => {
            window.location.reload(true);
        }).catch(err => console.log(err));
    }


  return (
    <>
        <div className='all-nav'>
        <div className='free'>
            <div className='icon'>
              <FaTruckArrowRight/>
            </div>
             <p>Envío <span>GRATIS</span> despúes de 3 productos !!</p>
     </div>
     <div className='main-header'>
        <div className='container'>
            <div className='logo'>
                <img src='../img/logod.png' alt='logo'></img>
            </div>
           
            <div className='search_box'>
                <input type='text' value={search} placeholder='Busca por categoría' autoComplete='off' onChange={(e) => setSearch(e.target.value)}></input>
                <button  onClick={() => searchbtn (search)}><FaSearch/></button>
            </div>
            <div className='icon'>
            {
                    auth &&
                    (
                        <div className='account'>
                           <Link to='/register'className='user_icon'>
                              <FaUser/>
                           </Link>
                       <p>Hola, {name}!!</p>
                        </div>
                    )
            } 
                    <Link to="/" className='link'><FaHeartCircleCheck/></Link>
                    <Link to="/cart" className='link'><FaShoppingCart/></Link>
            </div>
        </div>
     </div>
     <div className='header'>
        <div className='container'>
            <div className='nav'>
              <ul>
                  <li>
                     <Link to='/' className='link'>Inicio</Link>
                  </li>
                  <li>
                     <Link to='/product' className='link'>Productos</Link>
                  </li>
                  <li>
                     <Link to='/about' className='link'>Acerca de</Link>
                  </li>
                  <li>
                     <Link to='/contact' className='link'>Contactanos</Link>
                  </li>
              </ul>
            </div>
            <div className='authorized'> 
                {
                    auth ? 
                    <button className='logout' onClick={handleDelete}><p>Cierra Sesión</p><GiExitDoor/></button> 
                    :
                    <Link to='/login' className='login'><p>Inicia Sesión</p><GiEntryDoor/></Link>
                }
            </div>
        </div>
    </div>
        </div>
    </>
  )
}

export default Nav;

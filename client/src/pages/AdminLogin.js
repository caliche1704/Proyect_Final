import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
    const [values, setValues] = useState({
        adminUser: '',
        adminPassword: ''
    })
    const navigate = useNavigate()
    axios.defaults.withCredentials = true; 
    const handleSubmit = (event) => {
        event.preventDefault(); 
        axios.post('http://localhost:5000/admin', values)
        .then(res => {
            if(res.data.Status === "Success"){
                navigate('/')
            } else {
                alert(res.data.Error); 
            }
        })
        .then(err => console.log(err)); 
    }
    
  return (
    <>
       <div className='register'>
        <div className='container-register'>
        <div className='info'>
          <img src='../img/logod.png' alt='logo'></img>
          <h1>Bienvenido Admin!</h1>
          <h3>Inicia sesión</h3>
        </div>
        <form onSubmit={handleSubmit}> 
            <label className='cont' htmlFor='adminUser'>Administrador</label>
            <input className='controls' type='text' id='adminUser' autoComplete='off'
             onChange={e => setValues({...values, adminUser: e.target.value})}></input>
            <label className='cont' htmlFor='adminPassword'>Contraseña</label>
            <input className='controls' type='password' id='adminPassword' autoComplete='off'
              onChange={e => setValues({...values, adminPassword: e.target.value})}></input>
            <button className='init' type='submit'>Iniciar sesión</button>
            <p>¿Aún no tienes cuenta?</p>
            <Link  to='/register' className='link'>Registrate</Link>
        </form>
        </div>
      </div>
    </>
  )
}

export default AdminLogin

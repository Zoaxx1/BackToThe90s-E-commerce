import React, { } from 'react'
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/ShopCart.css";

const Cartel = () => {
    const jefe = 'https://cutt.ly/YfbB5w4'


    return (
        <div className='contenedor-cartel'>
            <div className='boton-navegar-u'>
                <Link to={'/products'}>
                    <button type='button' className='btn btn-success'>SEGUIR NAVEGANDO</button>
                </Link>
            </div>
                <img src={jefe} className='imagen-el-jefe'/>
        </div>
    )
}

export default Cartel
import React from 'react'
import { Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/filterOrders.css"

const FilterOrder = ({setFilter, filter, userName}) => {

    const handlerOnChangeFilter = (e) =>{
        setFilter({
            ...filter,
            [e.target.name]:e.target.value
        })
    }

    return(
        <div className='filtrado'>
            <div className='volver'>
                <Link to='/me'>
                    <button type="button" class="btn btn-success ">
                        <i class="fas fa-arrow-left fa-2x"/>
                    </button>
                </Link>
            </div>
            <div>
                <h2 className='filtrar userName'>{userName}</h2>
            </div>
            <div className='filterBox'>
                <div>
                    <h3 className='filtrar'>Filtrar por: </h3>
                </div>
                <div>
                    <ul className='botones'>               
                        <button className={filter.creada ? "btn btn-info" : "btn btn-secondary"} 
                        name='creada' value={filter.creada ? '' : 'creada'} 
                        onClick={handlerOnChangeFilter}>Creada</button>

                        <button className={filter.cancelada ? "btn btn-danger" : "btn btn-secondary"} 
                        name='cancelada' value={filter.cancelada ? '' : 'cancelada'} 
                        onClick={handlerOnChangeFilter}>Cancelada</button>

                        <button className={filter.procesando ? "btn btn-primary" : "btn btn-secondary"}
                        name='procesando' value={filter.procesando ? '' : 'procesando'} 
                        onClick={handlerOnChangeFilter}>Procesada</button>

                        <button className={filter.completa ? "btn btn-success" : "btn btn-secondary"} 
                        name='completa' value={filter.completa ? '' : 'completa'} 
                        onClick={handlerOnChangeFilter}>Completa</button>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default FilterOrder
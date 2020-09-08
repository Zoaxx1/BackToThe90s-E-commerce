import React, {useState, useEffect} from 'react'
import { useParams, Redirect, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CardOrder from './CardsOrder'
import { getOrderByUserId } from '../../redux/actions'
import FilterOrder from '../userLogin/suppliers/FilterOrders'

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/userOrders.css"

const UserOrders = ()=>{
    const dispatch = useDispatch()
    const {id} = useParams()
    const userActive = useSelector(state => state.user)
    const orders = useSelector(state => state.ordersUser)
    const userName = orders[0] && orders[0].user.name + ' ' + orders[0].user.surname
    const [change, setChangeState] = useState('')
    const [filter, setFilter] = useState({
        cancelada: 'cancelada',
        procesando: 'procesando',
        creada: 'creada',
        completa: 'completa'
    })


    const validacionDeEstados = (product) => {
        return (product.state === filter.cancelada 
                || product.state === filter.procesando 
                || product.state === filter.completa 
                || product.state === filter.creada)
    }

    const sortCards = () =>{
        var cards = orders.sort(( a , b ) => a.state > b.state && -1)
        
        return cards.map((product) => {
            if (validacionDeEstados(product)) {
                return (<CardOrder {...{ product, setChangeState }} />);
            }
        })  
    }    

    useEffect(()=>{
        dispatch(getOrderByUserId(id))
        setChangeState('')
    }, [change])

    return(
        <div>
            {typeof userActive !== 'object'  && <Redirect to='/'/>}
            <div className='filter'>
                <FilterOrder {...{ setFilter, filter, userName }}></FilterOrder>
            </div>
            <div className='marginTop'>
                {orders.length && sortCards()}
            </div>
        </div>
    )
}

export default UserOrders
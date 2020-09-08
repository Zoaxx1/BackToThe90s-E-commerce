import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { putOrderById, postSendEmail } from '../../redux/actions'

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/CardsOrder.css";

const Cards = (props) => {
  const dispatch = useDispatch()
  const userActive = useSelector((state) => state.user);
  const product = props.product
  const detalle = props.product.products[0];
  const [state, setState] = useState('')
  const parseDate = (oldDate) => {
    return new Date(oldDate).toLocaleString("es", {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleOnChangeState = (e) => {
    setState(e.target.value)
  }

  const putState = async () => {
    try {
      var prod = product
      prod.state = state
      dispatch(putOrderById(product.id, product))
      props.setChangeState(state)
      if(state === 'completa'){
        const sendEmail = {
          text: 'Su producto esta en camino, llegará el próximo miércoles, el código de seguimiento es 43334ADV',
          email: product.user.email
        }
        dispatch(postSendEmail(sendEmail))
      }      
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className="cardOrder" id={product.state === "cancelada" && "off"}>
      {typeof userActive !== 'object' && <Redirect to='/'/>}
      <div className="row no-gutters">
        <div className="col-md-4 imagen-order">
          <img
            src={detalle && detalle.img}
            className="card-img"
            alt={detalle ? "..." : "no hay imagen"}
          />
          {userActive && userActive.access === 'User' && product.state === 'completa' &&
            (<div class="valoracion">
              <Link to={`/reviews/${detalle.id}`}>
                <button type="button" class="btn btn-success">
                  Opina sobre el producto
              </button>
              </Link>
            </div>)}
        </div>
        <div className="col-md-8">
          <div className="details">
            {typeof userActive !== 'object' && userActive.access !== 'Admin' &&
            <div className="boton-volver-a-comprar">
              <Link to={`/product/${product.id}`}>
                <button className="btn btn-primary">VOLVER A COMPRAR </button>
              </Link>
            </div>}
            <h5 className="card-text">{detalle ? detalle.name : "s/n"}</h5>
            <hr className="my-2" />
            <p className="card-text date">{parseDate(product.createdAt)}</p>
            <hr className="my-2" />
            <p className="card-text estado">Estado: {product.state}</p>
            <hr className="my-2" />
            <p className="card-text">Cantidad: {product.quantity}</p>
            <hr className="my-2" />
            <p className="card-text">${" " + product.price}</p>

{/*/////////////////Buttons to Cancel / Send-Email / Check this order /////////////////*/}
            {userActive && userActive.access === 'Admin' &&
              <div>
                {product.state && <button className="btn btn-danger mr-2" onClick={handleOnChangeState} value='cancelada' disabled={product.state === 'cancelada'}><i class="fas fa-times" style={{color: 'white'}}/></button>}
                {product.state && <button className="btn btn-info mr-2" onClick={handleOnChangeState} value='procesando' disabled={product.state === 'procesando'}><i class="fas fa-shipping-fast" style={{color: 'white'}}/></button>}
                {product.state && <button className="btn btn-success mt-2" onClick={handleOnChangeState} value='completa' disabled={product.state === 'completa'}><i class="fas fa-check-double" style={{color: 'white'}}/></button>}
                <button className="btn btn-primary" onClick={putState}>Aceptar</button>
              </div>}
              
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;

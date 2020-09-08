import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Cards from "./CardsOrder";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";

// STYLES
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/Order.css";

const Order = () => {
  const dispatch = useDispatch();
  const productsCart = useSelector((state) => state.orders);
  const userActive = useSelector((state) => state.user);

  const getProductsFormUser = async (id) => {
    dispatch(actions.getProductsOfUser(id));
  };

  const getAllOrders = async () => {
    await dispatch(actions.getAllOrders());
  };

  useEffect(() => {
    if(typeof userActive === 'object'){
      if (userActive.access === "Admin") getAllOrders();
    else getProductsFormUser(userActive.id);
    }    
  }, []);

  return (
    <div className="jumbotron order">
      {(typeof userActive !== 'object' || (userActive.access !== 'User' && userActive.access !== 'Admin')) && 
      (<Redirect to='/'></Redirect>)}
      <div className="containerOrder">
        {productsCart.length ? (
          productsCart.map((product) => {
            return <Cards {...product} />;
          })
        ) : (
          <h1>No tenés ninguna orden</h1>
        )}
      </div>
      <div className="info">
        {userActive ? <h4>Hola {userActive.name}!</h4> : <h4>Guest</h4>}
        <hr className="my-4" />
        <Link to="/form" className="nav-link text-light">
          <button type="button" className="btn btn-primary">
            VENDER PRODUCTO
          </button>
        </Link>
        <hr className="my-4" />
        <Link to="/form" className="nav-link text-light">
          <button type="button" className="btn btn-primary">
            EDITAR USUARIO
          </button>
        </Link>
        <hr className="my-4" />
        <Link to="/form" className="nav-link text-light">
          <button type="button" className="btn btn-primary">
            CAMBIAR CONTRASEÑA
          </button>
        </Link>
        <hr className="my-4" />
        <Link to="/form" className="nav-link text-light">
          <button type="button" className="btn btn-primary">
            ELIMINAR USUARIO
          </button>
        </Link>        
      </div>
    </div>
  );
};

export default Order;

import React, { Fragment, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";

import Cards from "../order/CardsOrder";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/profile.css";
import CardUser from "../order/CardsUser";

const Profile = () => {
  const dispatch = useDispatch();
  const productsCart = useSelector((state) => state.orders);
  const users = useSelector(state => state.users)
  const userActive = useSelector((state) => state.user);  
  const [changeState, setChangeState] = useState('')

  const getProductsFormUser = async (id) => {
    dispatch(actions.getProductsOfUser(id));
  };

  const getAllOrders = async () => {
    dispatch(actions.getAllOrders());
  };

  var getAllUsers = () => {
    dispatch(actions.getUsers());
  };

  const sortCards = () =>{
    var cards = productsCart.sort(function( a , b ) {
      return a.state > b.state && -1
    })

    return cards.map((product) => {
          return (<Cards {...{ product, setChangeState }} />);
    })  
}

  useEffect(() => {
    if (typeof userActive === "object") {
      if (userActive.access === "Admin") getAllOrders();
      else getProductsFormUser(userActive.id);
    }
    getAllUsers()
    dispatch(actions.userLoginGet());
    setChangeState('')
  }, [changeState]);

  return (
    <Fragment>
      <div className="contenedor-principal-order">
        {(typeof userActive !== 'object' || (userActive.access !== 'User' && userActive.access !== 'Admin')) &&
          (<Redirect to='/'></Redirect>)}
        <div className="contenedor-menu-user">
          <div className="contenido-menu-user">
            <div className="titulo-menu-user">
              <i className="fas fa-bars fa-2x icono-menu"></i>
              <h4 className="titulo-menu">Menu</h4>
            </div>
            <div className="separador"></div>
            {userActive && userActive.access === "User" &&
              (<div className="cont-menu">
                  <i class="fas fa-shopping-bag icono-menu-u"></i>
                  <h3 className="titulo-compra">Compras</h3>
              </div>)}
            {userActive && userActive.access === "Admin" && (
              <div className="cont-menu">
                <i class="fas fa-store-alt icono-menu-u"></i>
                <h3 className="titulo-compra">Ventas</h3>
                
              </div>
            )}
            <div className="separador"></div>
          </div>
        </div>
        <div className="contenedor-order-me">
          <div className="content-order">
            {userActive && userActive.access !== 'Admin' ? 

           ( productsCart.length ? (sortCards()) : (
              <h3 className="titulo-order-me">
                No tenés ninguna orden de compra...
              </h3>
            )):

              (users.map(user => {
                if(user.access === 'User'){
                  return <CardUser {...{user}}/>
                }                
              }))
          }
          </div>
        </div>
        <div className="contenedor-user-me">
          {userActive ? <h4>Hola {userActive.name}!</h4> : <h4>Guest</h4>}

          {userActive && userActive.access === "Admin" && (
            <div>
              <hr className="my-4" />
              <Link to="/form" className="nav-link text-light">
                <button type="button" className="btn btn-primary">
                  VENDER PRODUCTO
                </button>
              </Link>
            </div>
          )}
          <hr className="my-4" />
          <Link to="/editprofile" className="nav-link text-light">
            <button type="button" className="btn btn-primary edit">
              EDITAR USUARIO
            </button>
          </Link>
          <hr className="my-4" />
          <Link to="/editpassword" className="nav-link text-light">
            <button type="button" className="btn btn-primary edit">
              CAMBIAR CONTRASEÑA
            </button>
          </Link>
          <hr className="my-4" />
          <Link to="/deleteuser" className="nav-link text-light">
            <button type="button" className="btn btn-primary edit">
              ELIMINAR USUARIO
            </button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;

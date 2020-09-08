import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cards from "./CardsShopCart";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/ShopCart.css";

const ShopCart = ({ setChangeProd }) => {
  var getStorage = window.localStorage
  var getProducts = getStorage.getItem('guestCart')
  var [productCards, setProductsCards] = useState([])
  const dispatch = useDispatch();
  const productsCart = useSelector((state) => state.cart);
  const userActive = useSelector((state) => state.user);
  let contador = 0;
  const [userIngress, setUser] = useState({
    email: "",
    password: "",
  });
  const [changeCart, setChangeCart] = useState("");

  const getProductsOfCart = (id) => {
    dispatch(actions.getProductsOfCart(id));
  };

  const getGuestProductsOfCart = () => {
    var prods
    if (getProducts) {
      prods = JSON.parse(getProducts)
      setProductsCards(prods)
    } else setProductsCards([])
  }


  useEffect(() => {
    /* userActive ? getProductsOfCart(userActive.id) : getGuestProductsOfCart(); */
    if (userActive) {
      getProductsOfCart(userActive.id)
    } else getGuestProductsOfCart()
    setChangeCart("");
  }, [changeCart]);

  return (
    <div className="jumbotron shopCart">
      <div className='contenedor-del-contenedor'>
        {productsCart.length || productCards.length ? (
          <div className='contenedor-de-info'>
            <div className="productsContainer">
              {/*-----------------------------------------------------------------------------------*/}
              {userActive ?
                //////IF THE USER IS LOG IN//////

                productsCart.length ? (
                  <div>
                    <div className='contenedor-info-cart'>
                      <div>
                        <i class="fas fa-camera fa-2x"></i>
                      </div>
                      <div className= "contenedor-prod-s">
                        <strong>PRODUCTO</strong>
                      </div>
                      <div className= "contenedor-prod-s">
                        <strong>CANT.</strong>
                      </div>
                      <div className= "contenedor-prod-s">
                        <strong>$ SUBTOT.</strong>
                      </div>
                    </div>
                    {productsCart.map((scart) => {
                      return <Cards {...{ scart, setChangeCart, setChangeProd }}></Cards>;
                    })}
                    <div className='agregar-productos'>
                      <Link to={'/products'}>
                        <button className='btn btn-primary'>
                          Agregar más productos
                        </button>
                      </Link>
                    </div>
                  </div>
                ) :
                  <h3 id="vacio">El carrito esta vacío</h3>
                :
                //////IF THE USER IS NOT LOG IN//////
                //////WE PRINT THE LOCALSTORAGE PRODUCTS//////
                productCards.length ? (
                  <div>
                    <div className='contenedor-info-cart'>
                      <div>
                        <i class="fas fa-camera fa-2x"></i>
                      </div>
                      <div className= "contenedor-prod-s">
                        <strong>PRODUCTO</strong>
                      </div>
                      <div className= "contenedor-prod-s">
                        <strong>CANT.</strong>
                      </div>
                      <div className= "contenedor-prod-s">
                        <strong>$ SUBTOT.</strong>
                      </div>
                    </div>
                    {productCards.map((scart) => {
                      return <Cards {...{ scart, setChangeCart, setChangeProd }}></Cards>;
                    })}
                  </div>
                ) : (
                    <div className='productsContainer-u'>
                      <div className='cart-vacio-u'>
                        <div className='cont-vacio-u'>
                          <h2 id="vacio">¡AÚN NO HAY ITEMS EN EL CARRITO!</h2>
                          <div className='carrito-i-u'><i class="fas fa-cart-arrow-down fa-6x" style={{ color: 'rgb(194, 189, 189)' }}></i></div>
                          <p>Continúa eligiendo productos aquí:</p>
                          <div className='boton-navegar-u'>
                            <Link to={'/products'}>
                              <button type='button' className='btn btn-success'>SEGUIR NAVEGANDO</button>
                            </Link>
                          </div>
                        </div>
                        <hr className='my-4' />
                      </div>
                    </div>

                  )
              }
              {/*-----------------------------------------------------------------------------------*/}
            </div>
            <div className="card border-success mb-3 info" style={{ width: "18rem" }}>
              <div className="card-header bg-transparent">
                <h3>Mi carrito</h3>
              </div>
              <div className="card-body text-success">
                {/*-----------------------------------------------------------------------------------*/}
                {userActive ?
                  //////IF THE USER IS LOG IN//////
                  productsCart.length &&
                  productsCart.map((product) => {
                    contador += product.price;
                    return (
                      <div className="tiket">
                        <div className='productos-agregados'>
                          <label>
                            <strong>{typeof product.products[0] == "object" &&
                              product.products[0].name}</strong> x
                        <strong>{product.quantity}</strong>
                          </label>
                          <label>
                            <strong>$ {typeof product.products[0] == "object" && product.price}</strong>
                          </label>
                        </div>
                      </div>
                    );
                  }) :
                  //////IF THE USER IS NOT LOGGED IN//////
                  //////WE USE THE LOCAL STORAGE//////
                  productCards.length &&
                  productCards.map((product) => {
                    contador += product.price;
                    return (
                      <div className="tiket">
                        <div className='productos-agregados'>
                          <label>
                            <strong>{product.name}</strong> x
                      <strong>{product.quantity}</strong>
                          </label>
                          <label>
                            <strong>$ {product.price}</strong>
                          </label>
                        </div>
                      </div>
                    );
                  })}
                {/*-----------------------------------------------------------------------------------*/}
                <p className="card-text"></p>
              </div>
              <div className='total-productos'>
                <strong>Total:</strong><strong>$ {contador}</strong>
              </div>
              <div className="card-footer bg-transparent">
                <div className="sendbutton">
                 {userActive ?
                 <Link to={'/orders'}>
                    <button type="button" className="btn btn-success botones-comprar">
                      CONTINUAR
                  </button>
                  </Link>:
                  <Link to={'/login'}>
                    <button type="button" className="btn btn-info botones-comprar"
                      data-toggle="modal" data-target="#exampleModal">
                      Ingresá para continuar
                    </button>
                  </Link>
                  }
                </div>
              </div>
            </div>
          </div>
        ) : (
            <div>
              <div className='cart-vacio'>
                <div className='cont-vacio'>
                  <h2 id="vacio">¡AÚN NO HAY ITEMS EN EL CARRITO!</h2>
                  <div className='carrito-i'><i class="fas fa-cart-arrow-down fa-6x" style={{ color: 'rgb(194, 189, 189)' }}></i></div>
                  <p>Continúa eligiendo productos aquí:</p>
                  <div className='boton-navegar'>
                    <Link to={'/products'}>
                      <button type='button' className='btn btn-success'>SEGUIR NAVEGANDO</button>
                    </Link>
                  </div>
                </div>
                <hr className='my-4' />
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default ShopCart;

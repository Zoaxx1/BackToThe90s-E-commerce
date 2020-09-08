import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import SearchBar from "./search/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { userLogout, getProductsOfCart } from "../../redux/actions";

import "./styles/NavBar.css";
import "bootstrap/dist/css/bootstrap.min.css";

const NavBar = () => {
  const dispatch = useDispatch();
  const userActive = useSelector((state) => state.user);
  const [back, setBack] = useState(false);

  //--------------------------
  //NOTIFICACION DEL CARRITO |
  var guestCartNotiffString = window.localStorage.getItem("guestCart");
  const guestCartNotiff = guestCartNotiffString && JSON.parse(guestCartNotiffString);
  const userCartNotiff = useSelector((state) => state.cart);
  const notif = userActive
    ? userCartNotiff.length || ""
    : (guestCartNotiff && guestCartNotiff.length) || "";
  //-------------------------

  const logOut = () => {
    dispatch(userLogout());
    setBack(true);
  };

  useEffect(()=>{
    if(userActive){
      dispatch(getProductsOfCart(userActive.id))
    }
  }, [userActive])

  return (

      <div className="top">

        {/* MENU RESPONSIVE  */}

            <div className="collapse" id="navbarToggleExternalContent">
              <div className="bg-dark navegacion-p-menu p-4">
                <div className='contenedor-del-titulo-resp'>
                  <Link to="/" className="nav-link">
                    <h5 className="text-white h5 neon titulo-resp">Back to the 90's</h5>
                  </Link>  
                </div>
                <SearchBar />
                <ul className="navbar-nav ml-auto bg navegacion-menu">
                {typeof userActive !== "object" && (
                  <li className="nav-item">
                    <Link to="/login" className="nav-link text-light">
                      <h5 className="navbarTitles h6" style={{ color: "black" }}>
                        INGRESA
                      </h5>
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link to="/products" className="nav-link text-light">
                    <h5 className="navbarTitles h6" style={{ color: "black" }}>
                      CATALOGO
                    </h5>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/about" className="nav-link text-light">
                    <h5 className="navbarTitles h6" style={{ color: "black" }}>
                      ¿QUIENES SOMOS?
                    </h5>
                  </Link>
                </li>
                  {typeof userActive === "object" && (
                    <li className="nav-item mt-2">
                      <div className="dropdown">
                        <a className="btn dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                         data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <h5 className="navbarTitlesUser" style={{ color: "black" }}>
                            <i className="fas fa-user-circle" />
                          </h5>
                        </a>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                          <Link to={`/me`}>
                            <a className="dropdown-item" href="#">
                              {userActive.access == "Admin" ? "Ordenes" : "Mis ordenes"}
                            </a>
                          </Link>
                          {userActive.access == "Admin" && (
                            <Link to="/promote">
                              <a className="dropdown-item" href="#">
                                Promover User
                              </a>
                            </Link>
                          )}
                          <Link to={`/faq`}>
                          <a className="dropdown-item" href="#">
                            FAQ
                          </a>
                          </Link> 
                          <button className="dropdown-item" onClick={logOut}>
                            Salir
                          </button>
                        </div>
                      </div>
                    </li>
                    )}
                    {(!userActive || (userActive && userActive.access === 'User')) &&
                    <li className="nav-item mt-2">
                      <Link to="/shopcart" className="nav-link text-light">
                        <h5 className="navbarTitlesUser" style={{ color: "black" }}>
                          <div id="cart">
                            {notif ? (
                              <i
                                className="fas fa-shopping-cart"
                                style={{ color: 'rgb(141, 0, 248)' }}
                              />
                            ) : (
                              <i className="fas fa-shopping-cart" />
                            )}
                            <p id="notif">{notif}</p>
                          </div>
                        </h5>
                      </Link>
                    </li>}
               </ul>
              </div>
            </div>
            {/* MENU SIN RESPONSIVE  */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark color-fondo text-white borde navegador">
              <button className="navbar-toggler" type="button" 
              data-toggle="collapse" data-target="#navbarToggleExternalContent" 
              aria-controls="navbarToggleExternalContent" aria-expanded="false" 
              aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
      {back && <Redirect to="/"></Redirect>}

      <div className= "redes-resp">
          <div className= "boton-redes-resp">
            <a className="btn btn-outline-light btn-social mx-1" 
            href="https://www.facebook.com/Back-to-the-90s-110556427442912" target= "blanck">
              <i className="fab fa-fw fa-facebook-f" style={{color: 'black'}}></i></a>
            <a className="btn btn-outline-light btn-social mx-1" 
            href="https://twitter.com/to_90/" 
            target= "blanck"><i className="fab fa-fw fa-twitter" style={{color: 'black'}}></i></a>
            <a className="btn btn-outline-light btn-social mx-1" 
            href="https://www.instagram.com/back_to_the_90_.s/" 
            target= "blanck"><i className="fab fa-fw fa-instagram" style={{color: 'black'}}></i></a>
          </div>  
        </div>                        
          <Link to="/" className="nav-link">
              <h2 className="text-uppercase text-monospace font-weight-bold neon">
                Back to the 90's
              </h2>
          </Link>
        
      <div className="collapse navbar-collapse container" id="navbarTogglerDemo02">
        <ul className="navbar-nav ml-auto navegacion-p">
          {typeof userActive !== "object" && (
            <li className="nav-item">
              <Link to="/login" className="nav-link text-light mt-3">
                <h5 className="navbarTitles" style={{ color: "black" }}>
                  INGRESA
                </h5>
              </Link>
            </li>
          )}
          <li className="nav-item">
            <Link to="/products" className="nav-link text-light mt-3">
              <h5 className="navbarTitles" style={{ color: "black" }}>
                CATALOGO
              </h5>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link text-light mt-3">
              <h5 className="navbarTitles" style={{ color: "black" }}>
                ¿QUIENES SOMOS?
              </h5>
            </Link>
          </li>
          <SearchBar />
          {typeof userActive === "object" && (
            <li className="nav-item mt-2">
              <div className="dropdown">
                <a className="btn dropdown-toggle" href="#" role="button" id="dropdownMenuLink" 
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <h5 className="navbarTitlesUser" style={{ color: "black" }}>
                    <i className="fas fa-user-circle fa-2x mt-3" />
                  </h5>
                </a>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <Link to={`/me`}>
                    <a className="dropdown-item" href="#">
                      {userActive.access == "Admin" ? "Ordenes" : "Mis ordenes"}
                    </a>
                  </Link>
                  {userActive.access == "Admin" && (
                    <Link to="/promote">
                      <a className="dropdown-item" href="#">
                        Promover User
                      </a>
                    </Link>
                  )}
                  <Link to={`/faq`}>
                          <a className="dropdown-item" href="#">
                            FAQ
                          </a>
                          </Link> 
                  <button className="dropdown-item" onClick={logOut}>
                    Salir
                  </button>
                </div>
              </div>
            </li>
          )}
          <li className="nav-item"></li>
          {(!userActive || (userActive && userActive.access === 'User')) &&
            <li className="nav-item mt-2">
            <Link to="/shopcart" className="nav-link text-light mt-3">
              <h5 className="navbarTitlesUser" style={{ color: "black" }}>
                <div id="cart">
                  {notif ? (
                    <i
                      className="fas fa-shopping-cart fa-2x"
                      style={{ color: 'rgb(141, 0, 248)' }}
                    />
                  ) : (
                    <i className="fas fa-shopping-cart fa-2x" />
                  )}
                  <p id="notif">{notif}</p>
                </div>
              </h5>
            </Link>
          </li>}
        </ul>
      </div>
    </nav>
    </div>
  );
};

export default NavBar;

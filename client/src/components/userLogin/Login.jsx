import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import GoogleLogin from 'react-google-login'
import * as actions from "../../redux/actions";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/login.css";

const Login = ({ setChangeUser, setChangeProd }) => {
  const dispatch = useDispatch();
  const clientIdGoogle = '972982669881-i7vnmbj3lr104khogicl46opq520fkes.apps.googleusercontent.com'
  var guestStorage = window.localStorage;
  const userActive = useSelector((state) => state.user);
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handlerOnChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const createCount = () => {
    return <Redirect to="/user/register"></Redirect>;
  };

  const responseGoogle = (response) => {
    const { email, familyName, givenName, imageUrl, googleId } = response.profileObj

    //guestCart
    var cart = guestStorage.getItem("guestCart");
    var guestCart = JSON.parse(cart);

    const gmail = {
      access: 'User',
      name: givenName, //obtenemos el nombre de las respuesta
      surname: familyName, //obtenemos el apellido de las respuesta
      email: email, //obtenemos el email de las respuesta
      password: googleId, //seteamos una password
      img: imageUrl,
      guest: guestCart
    }
    dispatch(actions.gmailValidation(gmail))
    guestStorage.clear();
  }

  const postLogIn = () => {
    try {
      if (!login.email || !login.password) {
        alert('Complete los campos')
        return
      } else if (!/\S+@\S+\.\S+/.test(login.email)) {
        alert('el email es invalido')
        return
      }
      var cart = guestStorage.getItem("guestCart");
      var guestCart = JSON.parse(cart);
      login.guest = guestCart;
      dispatch(actions.userLogin(login));
      setChangeUser("login");
      guestStorage.clear();
    }
    catch (err) {
      console.log('estoy en el catch')
      alert(err)
    }
  };

  const handlerOnSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handlerOnSubmit}>
      {(typeof userActive === "object") && (<Redirect to="/"></Redirect>)}
      <div className="contenedor-login">
        <div className="cont-login">
          <div className="loguear">
            <h3 className="titulo-l">Back To The 90's</h3>
            <div className="icono-l">
              <i className="fas fa-user fa-4x"></i>
            </div>
            <input type="email" name="email" placeholder="Email"
              className="mb-3 input-l" onChange={handlerOnChange}/>
            <input type="password" name="password" placeholder="Password"
              className="mb-3 input-l" onChange={handlerOnChange}/>
            <div className="botones-user">
              <div className="boton-user">
                <Link to={`/user/register`}>
                  <button
                    type="button"
                    className="btn btn-primary crear"
                    onClick={createCount}>
                    Crear Cuenta
                  </button>
                </Link>
              </div>
              <div className="boton-l">
                <button type="button" className="btn btn-success ingresar" onClick={postLogIn}>
                  Ingresar
                </button>
              </div>
            </div>
            <div className='contenedor-google'>
                <GoogleLogin
                className='boton-google'
                clientId= {clientIdGoogle}
                buttonText='Ingresar con Google'
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}/>
            </div>
            <div className="olvido-contraseña">
              <Link to="/resetpassword">
                <p className="contraseña-olvido">
                  ¿Has olvidado tu contraseña?
                </p>
              </Link>{" "}
              {typeof userActive == "object" && userActive.access && (
                <Redirect to={"/"}></Redirect>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;

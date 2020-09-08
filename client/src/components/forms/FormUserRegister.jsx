import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import * as actions from "../../redux/actions";
import validate from "./supports/Validate"; //Validar si ingreso los datos requeridos

// STYLES
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/FormUserRegister.css";

const FormUserRegister = (setChangeUser) => {
  const dispatch = useDispatch();
  const userActive = useSelector(state => state.user)
  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    access: "User",
  });

  const [errors, setError] = useState({});
  const [seePass, setSee] = useState("password");
  const [log, setLog] = useState(false)

  // -------------------------CREAR USUARIO----------------------------
  const postUser = async () => {
    try {
      const verification = validate(user);
      for (var i in verification) {
        if (verification[i][verification[i].length - 1] == "*") {
          alert("Complete los datos");
          return;
        }
      }
      await dispatch(actions.postUser(user));
      setLog(true)
    } catch (err) {
      console.log(err);
    }
  };

  function seePassword() {
    if (seePass == "password") {
      setSee("text");
    } else if (seePass == "text") {
      setSee("password");
    }
  }

  function handlerOnChange(evento) {
    setError(
      validate({
        ...user,
        [evento.target.name]: evento.target.value,
      })
    );
    if (
      evento.target.name != "confirmEmail" ||
      evento.target.name != "confirmPassword"
    ) {
      setUser({
        ...user,
        [evento.target.name]: evento.target.value,
      });
    }
  }

  return (
    <div className='content-formulario'>
      {((typeof userActive === "object") || log) && (
        <Redirect to="/login"></Redirect>)}
      <h1 className='titulo-del-form'>Registro de usuario</h1>
      <div className='cont-f'>
        <form className='formulario'>
          <div className="row">
            <div className="col input-contenedor">
              <label className='label-form'>{errors.name ? <strong className='errors'>*  Nombre</strong> : 'Nombre'}</label>
              <input type="text" name='name' className="form-control input" placeholder="Nombre" onChange={handlerOnChange} id="name" required />
            </div>

            <div className="col input-contenedor">
              <label className='label-form'>{errors.surname ? <strong className='errors'>*  Apellido</strong> : 'Apellido'}</label>
              <input type="text" name='surname' className="form-control input" placeholder="Apellido" onChange={handlerOnChange} id="lastname" required />
            </div>
          </div>

          {/* EMAIL */}
          <div className="row">
            <div className="col input-contenedor">
              <label className='label-form'>{errors.email ? <strong className='errors'>*  El email debe ser válido</strong> : 'Email'}</label>
              <input type="email" name='email' className="form-control input" placeholder="Email" onChange={handlerOnChange} id="email" required />
            </div>

            <div className="col input-contenedor">
              <label className='label-form'>{errors.confirmEmail ? <strong className='errors'>*  No coincide el email</strong> : 'Confirmar Email'}</label>
              <input type="confirmEmail" name='confirmEmail' className="form-control input" placeholder="Confirmar Email" onChange={handlerOnChange} id="confirmEmail" required />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="row">
            <div className="col input-contenedor">
              <label className='label-form'>{errors.password ? <strong className='errors'>*  Una mayúscula y un número, mínimo 8 digitos</strong> : 'Contraseña'}</label>
              <input type={seePass} name='password' className="form-control input" placeholder="Password" onChange={handlerOnChange} id="password" required />
            </div>

            <div className="col input-contenedor">
              <label className='label-form'>{errors.confirmPassword ? <strong className='errors'>*  La contraseña no coincide</strong> : 'Confirmar Contraseña'}</label>
              <input type={seePass} name='confirmPassword' className="form-control iput" placeholder="Confirmar Password" onChange={handlerOnChange} id="confirmPassword" required />
            </div>
          </div>
          <p className='terminos-form'><input className='check-form' type="checkbox" />Estoy de acuerdo con 
          <Link to= "/faq"> Términos y Condiciones</Link></p>
          <div className='boton-f'>
            <button className="btn btn-success" type="submit" onClick={postUser}>Registrar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormUserRegister;

import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { postSendEmail, buyCart } from "../../redux/actions"
import Cartel from './suppliers/Cartel'


import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/userCheckout.css";

const UserCheckout = () => {
  const dispatch = useDispatch()
  const userActive = useSelector((state) => state.user);
  const [userInfo, setUserInfo] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    provincia: '',
    partido: '',
    street: '',
    onStreet: '',
    city: '',
    postal: '',
    dni: ''
  })
  const [button, setButton] = useState(false)
  const [buy, setBuy] = useState(false)

  const handlerOnChange = (e)=>{
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    })

    for(var i in userInfo){
      if(!userInfo[i]){
        return
      }
    }
    console.log(true)
    setButton(true)
  }

  const sendEmail = () => {
    const sendEmail = {
      text: 'Su compra fue procesada con éxito, en los próximos días su producto será despachado y enviaremos un código de seguimiento | IG: https://www.instagram.com/back_to_the_90_.s/ | TW: @to_90',      
      email: userActive.email
    }
    dispatch(buyCart(userActive.id))
    dispatch(postSendEmail(sendEmail))
    setBuy(true)
  }

  return (
    <div className='contenedor-checkout'>
      {!buy ? <div className='cont-check'>
        <div className='contenedor-mi-compra'>
          <h3 className='titulo-mi-compra'>MI COMPRA</h3>
        </div>
        <div className='titulo-check'>
          <p>Ingresá tus datos para efectuar la compra:</p>
        </div>
        <div className='content-formulario-user'>
          <div className='cont-f-user'>
            <form action='/send-email' method='post' className='formulario-user'>
              <div className="row">
                <div className="col input-contenedor">
                  <label className='label-form-user'>NOMBRE</label>
                  <input type="text" name='name' className="form-control input-user" 
                  placeholder="Nombre" id="name" required onChange={handlerOnChange}/>
                </div>

                <div className="col input-contenedor">
                  <label className='label-form-user'>APELLIDO</label>
                  <input type="text" name='surname' className="form-control input-user" 
                  placeholder="Apellido" id="lastname" required onChange={handlerOnChange}/>
                </div>
              </div>

              {/* EMAIL */}
              <div className="row">
                <div className="col input-contenedor-user">
                  <label className='label-form-user'>EMAIL</label>
                  <input type="email" name='email' className="form-control input-user" 
                  placeholder="Email" id="email" required onChange={handlerOnChange}/>
                </div>

                <div className="col input-contenedor-user">
                  <label className='label-form-user'>TELEFONO</label>
                  <input type="number" name='phone' className="form-control input-user" 
                  placeholder="Telefono" id="telefono" required onChange={handlerOnChange}/>
                </div>
              </div>

              {/* PASSWORD */}
              <div className="row">
                <div className="col input-contenedor-user">
                  <label className='label-form-user'>PROVINCIA</label>
                  <input type='text' name='provincia' className="form-control input-user"
                  placeholder="Provincia" id="password" required onChange={handlerOnChange}/>
                </div>

                <div className="col input-contenedor-user">
                  <label className='label-form-user'>PARTIDO</label>
                  <input type='text' name='partido' className="form-control input-user"
                  placeholder="Partido" id="confirmPassword" required onChange={handlerOnChange}/>
                </div>
              </div>

              <div className="row">
                <div className="col input-contenedor-user">
                  <label className='label-form-user'>CALLE Y NRO.</label>
                  <input type='text' name='street' className="form-control input-user"
                   placeholder="Calle y nro." id="password" required onChange={handlerOnChange}/>
                </div>
              </div>

              <div className="row">
                <div className="col input-contenedor-user">
                  <label className='label-form-user'>ENTRE CALLES</label>
                  <input type='text' name='onStreet' className="form-control input-user" 
                  placeholder="Entre calles" id="password" required onChange={handlerOnChange}/>
                </div>
              </div>

              <div className="row">
                <div className="col input-contenedor-user">
                  <label className='label-form-user'>LOCALIDAD</label>
                  <input type='text' name='city' className="form-control input-user" 
                  placeholder="Localidad" id="password" required onChange={handlerOnChange}/>
                </div>

                <div className="col input-contenedor-user">
                  <label className='label-form-user'>CÓDIGO POSTAL</label>
                  <input type='number' name='postal' className="form-control input-user" 
                  placeholder="Código postal" id="confirmPassword" required onChange={handlerOnChange}/>
                </div>

                <div className="col input-contenedor-user">
                  <label className='label-form-user'>DNI</label>
                  <input type='number' name='dni' className="form-control input-user" 
                  placeholder="Dni" id="confirmPassword" required onChange={handlerOnChange}/>
                </div>
              </div>
              <div className='boton-realizar-pago'>                
              </div>
              <div className='contenedor-metodos'> 
              {typeof userActive == "object" ? ( 
              <div>             
                  <p className='parrafo-envio'>
                    1. Forma de envío.
                  </p>  
                <div className='contenedor-envio'>
                  <p>
                    <ul>
                    <input type="checkbox"/> Retiro en sucursal <br/> 
                    <input type="checkbox"/> Envío por correo privado. <i class="fas fa-shipping-fast" style={{color: 'white'}}></i> 
                    </ul>
                  </p>
                </div>
                <p className='parrafo-pago'>
                    2. Método de pago.
                  </p>
                <div className='contenedor-pago'>
                  <p>
                    <ul>
                    <input type="checkbox"/> Pago en efectivo. <i class="far fa-money-bill-alt" style={{color: 'white'}}></i> <br/>
                    <input type="checkbox"/> Pago con tarjeta de crédito. <i class="fas  fa-credit-card" style={{color: 'white'}}></i> <br/>
                    <input type="checkbox"/> Transferencia bancaria. <i class="fas fa-university" style={{color: 'white'}}></i>
                    </ul>
                  </p>
                </div>
                </div>  
              ) : (
                <div>
                <p className='parrafo-envio'>
                    1. Forma de envío.
                  </p>
                <div className='contenedor-envio'>
                    <ul>
                    <input type="checkbox" disabled/> Retiro en sucursal <br/> 
                    <input type="checkbox" disabled/> Envío por correo privado. <i class="fas fa-shipping-fast" style={{color: 'white'}}></i> 
                    </ul>
                </div>
                <p className='parrafo-pago'>
                    2. Método de pago.
                  </p>
                <div className='contenedor-pago'>                  
                    <ul>
                    <input type="checkbox" disabled/> Pago en efectivo. <i className="far fa-money-bill-alt" style={{color: 'white'}}></i> <br/>
                    <input type="checkbox" disabled/> Pago con tarjeta de crédito. <i className="fas  fa-credit-card" style={{color: 'white'}}></i> <br/>
                    <input type="checkbox" disabled/> Transferencia bancaria. <i className="fas fa-university" style={{color: 'white'}}></i>
                    </ul>                  
                </div>
                </div>
                )}
              </div>  
              <div className='boton-realizar-pago'>
                  <button type='button' className='btn btn-danger boton-pago' 
                  onClick={sendEmail} disabled={button}>
                    REALIZAR PAGO
                  </button>
                
              </div>                      
            </form>
          </div>
        </div>
      </div> :
        <Cartel></Cartel>
      }
    </div >
  )
}

export default UserCheckout;


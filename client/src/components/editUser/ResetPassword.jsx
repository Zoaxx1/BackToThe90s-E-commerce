import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Redirect } from "react-router-dom";
import {getIdFromEmail, putPasswordUser} from "../../redux/actions"
import './styles/resetPassword.css'

const ResetPassword = () => {
    const dispatch = useDispatch()
    //get the user id to reset the password
    const emialId = useSelector(state => state.idResetPassword)
    //state from the email
    const [email, setEmail] = useState({
      email: ""
    });
    //state from the newPassword
    const [newPassword , setNewPassword] = useState({
      newPassword: "",
      confirmPassword: ""
    })
    //state to redirect
    const [passwordChange, setPasswordChange] = useState(false)
    
////////// TO UPDATE THE EMAIL STATE //////////
    const handlerOnChangeEmail = (e) => {
        setEmail({
            email: e.target.value,
        });
    };

////////// TO UPDATE THE NEW PASSWORD //////////
    const handlerOnChangeNewPassword = (e) => {
        setNewPassword({
            ...newPassword,
            id: emialId,
            [e.target.name]: e.target.value,
        });
    };

////////// TO CONFIRM THE NEW PASSWORD //////////
    const validateMatch = () => {
      if(newPassword.confirmPassword === newPassword.newPassword) 
          return 'input-l'
      return 'input-l border border-danger'
    }

////////// GET THE EMAIL FROM THE USER //////////    
    const getEmail = ()=>{
        dispatch(getIdFromEmail(email))
    }

////////// RESET PASSWORD //////////
    const resetPasswordUser = ()=>{
      if(newPassword.confirmPassword === newPassword.newPassword){
          dispatch(putPasswordUser(emialId, newPassword))
          alert('contraseña editada con éxito')
          setPasswordChange(true)
        } else alert('los campos son distintos')
    }

    return(
        <form>
          {/*If passwordChange is true Redirect to the Login*/}
          {passwordChange && <Redirect to="/login"/>}
          <div className="contenedor-login">
            <div className="cont-login">
              <div className="loguear">
                <h3 className="titulo-l">Back To The 90's</h3>
              <div className="icono-l">
              <i className="fas fa-user fa-4x"></i>
            </div>
              <input type="email" name="email"
                placeholder="Email" className="mb-3 input-l"
                onChange={handlerOnChangeEmail}/>
              {/*If emailId is a number show all this*/}
              {Number.isInteger(emialId) && 
              <div>
                <input type="password" name="newPassword"
                  placeholder="New Password" className={validateMatch()} value={newPassword.newPassword}
                  onChange={handlerOnChangeNewPassword}/>
                <input type="password" name="confirmPassword"
                  placeholder="Confirm Password"  className={validateMatch()} value={newPassword.confirmPassword} 
                  onChange={handlerOnChangeNewPassword}/>
              </div>
              }
            <div className="botones-user">
              <div className="boton-l">
                {!Number.isInteger(emialId) 
                  ? <button type="button" className="btn btn-primary ingresar" onClick={getEmail}>
                      Confirmar Email
                    </button>
                  : <button type="button" className="btn btn-primary ingresar" onClick={() => resetPasswordUser(emialId)}>
                      Cambiar Contraseña
                    </button>}
              </div>              
            </div>
          </div>
        </div>
      </div>
    </form>
    )
}

export default ResetPassword
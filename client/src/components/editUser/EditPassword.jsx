import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {putPasswordUser} from "../../redux/actions"
import { Redirect } from 'react-router-dom'
import './styles/resetPassword.css'

const EditPassword = () => {
    const dispatch = useDispatch()
    const userActive = useSelector(state => state.user)
    const [password, setPassword] = useState({
        password: "",
        newPassword: ""
    });
    const [changePassword, setChangePassword] = useState(false)

    const handlerOnChangePassword = (e) => {
        setPassword({
            ...password,
            [e.target.name]: e.target.value,
        });
    };

    const changeProfile = ()=>{
        dispatch(putPasswordUser(userActive.id, password))
        setChangePassword(true)
    }

    return(
        <form>
          {(typeof userActive !== "object" || (userActive.access !== 'User' && userActive.access !== 'Admin')) && (
        <Redirect to="/"></Redirect>)}
            {changePassword && <Redirect to='/me'></Redirect>}
      <div className="contenedor-login">
        <div className="cont-login">
          <div className="loguear">
            <h3 className="titulo-l">Back To The 90's</h3>
            <div className="icono-l">
              <i className="fas fa-user fa-4x"></i>
            </div>
            <div className= 'input-edit-user'>
              <input type="password" name="password"
                placeholder="Contraseña Antigua" className="mb-3 input-l"
                onChange={handlerOnChangePassword}/>
              <input type="password" name="newPassword"
                placeholder="Nueva Contraseña" className="mb-3 input-l"
                onChange={handlerOnChangePassword}/>
            </div>
            <div className="botones-user">
              <div className="boton-l">
                <button type="button" className="btn btn-primary ingresar" onClick={changeProfile}>
                    Cambiar Contraseña
                  </button>
              </div>              
            </div>
          </div>
        </div>
      </div>
    </form>
    )
}

export default EditPassword
import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {deleteUser, userLogout} from "../../redux/actions"
import './styles/resetPassword.css'

const DeleteUser = () => {
    const dispatch = useDispatch()
    const userActive = useSelector(state => state.user)
    const [deleteUserr, setDeleteUser] = useState(false)
    const [back, setBack] = useState(false)

    const DelUser = ()=>{
        setDeleteUser(!back)
    }

    const Back = ()=>{
        const id = userActive.id
        dispatch(userLogout(userActive.id))
        dispatch(deleteUser(id))
        setBack(true)
    }

    return(
        <form>
          {(typeof userActive !== "object" || (userActive.access !== 'User' && userActive.access !== 'Admin')) && (
        <Redirect to="/"></Redirect>)}
            {back && <Redirect to='/'></Redirect>}
      <div className="contenedor-login">
        <div className="cont-login-d">
          <div className="loguear">
            <h3 className="titulo-l">Back To The 90's</h3>
            <div className="icono-l">
              <i className="fas fa-user fa-4x"></i>
            </div>
              </div>
            <div className="botones-user">
              <div className="boton-l-d">
                <button type="button" className="btn btn-danger eliminar" onClick={DelUser}>
                    Eliminar Cuenta
                </button>
                {deleteUserr && 
                    <div>
                        <button type="button" className="btn btn-danger ingresar" onClick={Back}>
                            SI
                        </button>
                        <button type="button" className="btn btn-danger ingresar" onClick={DelUser}>
                            NO
                        </button>
                    </div>
                }
              </div>              
            </div>
          </div>
        </div>
    </form>
    )
}

export default DeleteUser
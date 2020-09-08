import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {putUser, userLoginGet} from "../../redux/actions"
import { Redirect } from 'react-router-dom'
import './styles/resetPassword.css'

const EditUser = () => {
    const dispatch = useDispatch()
    const userActive = useSelector(state => state.user)
    //state from the profile user
    const [profile, setProfile] = useState({
        name: "",
        surname: ""
    });
    //update the profile
    const [changeUser, setChangeUser] = useState(false)

    //set state to the profile
    const handlerOnChangeProfile = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        });
    };

    const changeProfile = ()=>{
        dispatch(putUser(userActive.id, profile))
        setChangeUser(true)
    }

    return(
        <form>
          {(typeof userActive !== "object") && (<Redirect to="/"></Redirect>)}
            {changeUser && <Redirect to='/me'></Redirect>}
      <div className="contenedor-login">
        <div className="cont-login">
          <div className="loguear">
            <h3 className="titulo-l">Back To The 90's</h3>
            <div className="icono-l">
              <i className="fas fa-user fa-4x"></i>
            </div>
            <div className= 'editUser'>
                <h4>{userActive.name + ' '}</h4>
                <h4>{' ' + userActive.surname}</h4>
            </div>
            <div className= 'input-edit-user'>
              <input type="text" name="name"
                placeholder="Nombre" className="mb-3 input-l"
                onChange={handlerOnChangeProfile}/>
              
              <input type="text" name="surname"
                placeholder="Apellido" className="mb-3 input-l"
                onChange={handlerOnChangeProfile}/>
            </div>
            <div className="botones-user">
              <div className="boton-l">
                <button type="button" className="btn btn-primary ingresar" onClick={changeProfile}>
                    Cambiar Nombre
                  </button>
              </div>              
            </div>
          </div>
        </div>
      </div>
    </form>
    )
}

export default EditUser
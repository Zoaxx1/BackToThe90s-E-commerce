import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userPromote, deleteUser, putPasswordUser } from "../../redux/actions";
import "bootstrap/dist/css/bootstrap.min.css";
import './styles/cardspromote.css';
import ResetPassword from "../editUser/ResetPassword";

const CardsPromote = (props) => {
  const dispatch = useDispatch();
  const [promoteUser, setPromoteUser] = useState(false);
  const [eliminarUser, setEliminarUser] = useState(false);
  const [ressetPassUser, setRessPass] = useState(false)

  const prom = () => {
    setPromoteUser(!promoteUser);
  };

  const eliminar = () => {
    setEliminarUser(!eliminarUser);
  };

  const ressPass = () => {
    setRessPass(!ressetPassUser)
  }

  const promote = () => {
    if (props.userActive.access == "Admin") {
      dispatch(userPromote(props.user.id));
      props.setUsers("change");
    } else {
      alert("Usted no es admin!");
    }
  };

  const deleteUserr = () => {
    if (props.userActive.access == "Admin") {
      dispatch(deleteUser(props.user.id));
      props.setUsers("delete");
    } else {
      alert("Usted no es admin!");
    }
  };  

  const ressetPassword = () => {
    const password = {
      newPassword: props.user.name + '90'
    }
    dispatch(putPasswordUser(props.user.id, password))
    props.setUsers("ressPass")
  }

  return (
    <div className="contenedor-cards-promote">
      <div className="card-body">
        <h5 className="card-title"> Usuario </h5>
        <p className="card-text parrafo-promote">
          <strong>Nombre: </strong>
          {props.user.name}{" "}
        </p>
        <p className="card-text parrafo-promote">
          <strong>Apellido: </strong>
          {props.user.surname}
        </p>
        <p className="card-text parrafo-promote">
          <strong>Privilegio: </strong>
          {props.user.access}
        </p>
        {props.user.access !== "Admin" && (
          <div>
            <button type="button" className="btn btn-success boton-promote" onClick={prom}>
              PROMOVER
            </button>
            <button type="button" className="btn btn-danger boton-promote" onClick={eliminar}>
              ELIMINAR
            </button>
            <button type="button" className="btn btn-primary boton-promote" onClick={ressPass}>
            RESETEAR PASSWORD
            </button>
          </div>
        )}
        {promoteUser && (
          <div>
            Esta seguro que desea promoverlo?
            <button onClick={promote}>SI</button>
            <button onClick={prom}>NO</button>
          </div>
        )}
        {eliminarUser && (
          <div>
            Esta seguro que desea elimarlo?
            <button onClick={deleteUserr}>SI</button>
            <button onClick={eliminar}>NO</button>
          </div>
        )}
        {ressetPassUser && (
          <div>
            Esta seguro que desea resetear la password?
            <button onClick={ressetPassword}>SI</button>
            <button onClick={ressPass}>NO</button>
          </div>
        )}
      </div>
    </div>
  );
};
export default CardsPromote;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import Buttons from "./supports/Buttons";
import * as actions from "../../redux/actions";

// STYLES
import "bootstrap/dist/css/bootstrap.min.css";

const FormCategory = (props) => {
  const dispatch = useDispatch();
  const userActive = useSelector(state => state.user)
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });
  const [getId, setGetId] = useState(0);

  // -------------------------POST CATEGORIA----------------------------
  const postCategory = async () => {
    try {
      dispatch(actions.postCategories(category));
      await props.setChangeCat("post");
      alert("Se guardó correctamente");
    } catch (err) {
      console.log(err.message);
    }
  };

  // -------------------------EDITAR CATEGORIA----------------------------
  const putCategory = async () => {
    try {
      dispatch(actions.putCategories(getId, category));
      await props.setChangeCat("put");
      alert("Se actualizó correctamente");
    } catch (err) {
      console.log(err.message);
    }
  };

  // -------------------------ELIMINAR CATEGORIA----------------------------
  const deleteCategory = async () => {
    try {
      dispatch(actions.deleteCategories(getId));
      await props.setChangeCat("del");
      alert("Se borró correctamente");
      window.location.reload();
    } catch (err) {
      console.log(err.message);
    }
  };

  function handlerOnChange(evento) {
    setCategory({
      ...category,
      [evento.target.name]: evento.target.value,
    });
  }

  function handlerOnChangeDelete(evento) {
    setGetId(evento.target.value);
  }

  function handleClick(e) {
    e.preventDefault();
  }

  return (
    <div className="container container-form">
      {(typeof userActive !== "object" || userActive.access !== "Admin") && (
        <Redirect to="/"></Redirect>
      )}
      <Link to="/form">
        <br />
        <button className="btn btn-dark">Volver al producto</button>
      </Link>
      <br />
      <br />
        <div className="container">
          <h1>Categoría</h1>
        </div>
        <form onSubmit={handleClick}>
        <div className="form-col container">
          <div className="form-group col-md-6">
            <label>Nombre de Categoría</label>
            <input placeholder="Nombre de la categoría" type="text"
              className="form-control" name="name" onChange={handlerOnChange}/>
          </div>
          <div className="form-group col-md-3">
            <label>Categoría</label>
            <select className="form-control" name="category" onChange={handlerOnChangeDelete}>
              <option selected={true} disabled="disabled">
                Seleccionar categoría...
              </option>
              {/* MAPEAMOS EL ARRAY CATEGORY PARA QUE SE PUEDAN LISTAR LAS CATEGORÍAS */}
              {/*Cuando realizamos un put, post o delete hay que esperar que se actualize
                            el estado por lo que no es un array por un momento y tirara un error debido al
                            map, entonces si no es un Array no se envia pero cuando lo sea si*/}
              {Array.isArray(props.categories) &&
                props.categories.map((i) => {
                  return <option value={i.id}>{i.name}</option>;
                })}
            </select>
          </div>
        </div>
      </form>
      <br />
      <Buttons
        {...{ post: postCategory, put: putCategory, del: deleteCategory }}
      />
    </div>
  );
};

export default FormCategory;

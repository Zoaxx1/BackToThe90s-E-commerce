import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, Redirect } from "react-router-dom";
import { Multiselect } from "multiselect-react-dropdown";
import * as actions from "../../redux/actions";
// STYLES
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/Form.css";
import { useRef } from "react";

const Form = (props) => {
  const { idProd } = useParams();
  const multiselectRef = useRef();
  const dispatch = useDispatch();
  const estadoInicial = {
    name: "",
    price: "",
    stock: "",
    description: "",
    img: "",
    category: "",
  };
  const productById = useSelector((state) => state.productByID);
  const userActive = useSelector((state) => state.user);
  const [product, setProduct] = useState(estadoInicial);

  // -------------------------AGREGAR PRODUCTO----------------------------
  const postProduct = async () => {
    try {
      dispatch(actions.postProduct(product));
      await props.setChangeProd("post");
      props.setChangeProd("postProd");
      setProduct(estadoInicial);
    } catch (err) {
      console.log(err.message);
    }
  };

  // -------------------------EDITAR PRODUCTO----------------------------
  const verificationPut = () => {
    var completeProduct = product;
    for (var i in completeProduct) {
      if (completeProduct[i] == "") {
        completeProduct = {
          ...completeProduct,
          [i]: productById[i],
        };
      }
    }
    setProduct(completeProduct);
  };

  const exeTwoF = () => {
    verificationPut();
    resetSelectField();
  }

  const putProduct = async () => {
    try {
      dispatch(actions.putProduct(idProd, product));
      await props.setChangeProd("put");
      alert("Se actualizó");
    } catch (err) {
      console.log(err.message);
    }
  };

  const twoFunctionPutReset =  () => {
    putProduct();
    resetSelectField();
  }

////////////////////////////// HANDLER ON CHANGE //////////////////////////////

  function handlerOnChange(evento) {
    setProduct({
      ...product,
      [evento.target.name]: evento.target.value,
    });
  }

  //En esta función se pasa la imagen a Base64
  //En la base de datos lo guardaremos como un Blob
  //y cuando hagamos un get del Blob nos lo devolvera
  //como lo parseamos en esta función
  function handlerOnChangeImg(evento) {
    var file = evento.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
      setProduct({
        ...product,
        img: reader.result,
      });
    };
    reader.readAsDataURL(file);
  }

  function handlerOnChangeCategory(evento) {
    const idArray = evento.map((e) => {
      return e.id;
    });
    setProduct({
      ...product,
      category: idArray,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    e.target.reset();
  }

//////////////////////////////////////////////////////////////////////////////////////////

  function resetSelectField() {
    multiselectRef.current.resetSelectedValues();
  };

  useEffect(() => {
    if (idProd) {
      dispatch(actions.getProductById(idProd));
      dispatch(actions.getRelationsCategoriesById(idProd));
    }
  }, []);

  return (
    <div className="container container-form">
      {(typeof userActive !== "object" || userActive.access !== "Admin") && (
        <Redirect to="/"></Redirect>
      )}
      {userActive && userActive.access == "Admin" && (
        <Link to="/formcategory">
          <br />
          <button className="btn btn-dark">Insertar Categoría</button>
        </Link>
      )}
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <div className="container">
          <h1>Ficha del Producto</h1>
        </div>
        <div className="form-col container">
          {/*###########################-> NOMBRE DEL PRODUCTO <-###########################*/}
          <div className="form-group col-md-6">
            <label>Nombre del Producto</label>
            <input placeholder={idProd ? productById.name : "Nombre del producto"}
              type="text" className="form-control" name="name"
              onChange={handlerOnChange} value={product.name}/>
          </div>
          {/*###########################-> PRECIO <-###########################*/}
          <div className="form-group col-md-2">
            <label>Precio</label>
            <input placeholder={idProd ? productById.price : "Precio"}
              type="number" className="form-control" name="price"
              onChange={handlerOnChange} value={product.price}/>
          </div>
          {/*###########################-> CANTIDAD <-###########################*/}
          <div className="form-group col-md-2">
            <label>Cantidad Actual</label>
            <input placeholder={idProd ? productById.stock : "Cantidad"}
              type="number" min="0" className="form-control"
              name="stock" onChange={handlerOnChange} value={product.stock}/>
          </div>
        </div>
        <div className="form-col container">
          {/*###########################-> DESCRIPCIÓN <-###########################*/}
          <div className="form-group col-md-10">
            <label>Descripción del Producto</label>
            <input
              placeholder={
                idProd ? productById.description : "Descripción del producto"
              }
              type="text area" className="form-control"  name="description"
              onChange={handlerOnChange} value={product.description}/>
          </div>
          {/*###########################-> IMAGEN <-###########################*/}
          <div className="container">
            <p className="mb-2">
              Subí un archivo de imagen: <br />
              <input type="file" id="file"  accept=".jpg"  name="img"
                onChange={handlerOnChangeImg}/>
            </p>
            {product.img ? (
              <img src={product.img} width="150px" height="150px"></img>
            ) : (
              idProd && (
                <img src={productById.img} width="150px" height="150px"></img>
              )
            )}
          </div>
          {/*###########################-> CATEGORÍA <-###########################*/}
          <div className="form-group col-md-6">
            <label>Categoría</label>
            {Array.isArray(props.categories) && (
              <Multiselect
                options={props.categories}
                displayValue="name"
                onSelect={handlerOnChangeCategory}
                onRemove={handlerOnChangeCategory}
                ref={multiselectRef}/>
            )}
          </div>
          {/*###########################-> BOTONES <-###########################*/}
          <div className="d-flex mb-2 ml-3">
            {!idProd ? ( //SI no tiene Id producto
              //BOTON AGREGAR
              <div className="mr-2">
                <button type="button" className="btn btn-primary carrito"
                  data-toggle="modal" data-target="#exampleModal" onClick={exeTwoF}>
                  Agregar
                </button>
                <div className="modal fade" id="exampleModal" tabindex="-1" 
                aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Desea Agregar este producto?
                        </h5>
                        <button type="button" className="close"
                          data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-success"
                          data-dismiss="modal" onClick={postProduct}>
                          SI
                        </button>
                        <button type="button" className="btn btn-danger" data-dismiss="modal">
                          NO
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div> //BOTON EDITAR
            ) : (
              <div className="mr-2">
                <button type="button" className="btn btn-primary carrito"
                  data-toggle="modal" data-target="#exampleModal" onClick={exeTwoF}>
                  Editar
                </button>
                <div className="modal fade" id="exampleModal" tabindex="-1"
                  aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Desea Editar este producto?
                        </h5>
                        <button type="button" className="close"
                          data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-success"
                          data-dismiss="modal" onClick={twoFunctionPutReset}>
                          SI
                        </button>
                        <button type="button" className="btn btn-danger" data-dismiss="modal">
                          NO
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/*##################################################################*/}
        </div>
      </form>
    </div>
  );
};

export default Form;

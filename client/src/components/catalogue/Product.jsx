import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import CardReview from "../reviews/CardReview";
import * as actions from "../../redux/actions";
// IMPORT STYLES
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/Product.css";

// USANDO HOOK CREAMOS UN COMPONENTE PRODUCT, LE PASAMOS SUS PROPS Y POR EL ESTADO.
const Product = ({ setChangeProd }) => {
  var guestStorage = window.localStorage;
  const { id } = useParams();
  const dispatch = useDispatch();
  var prod = useSelector((state) => state.productByID);
  const reviews = useSelector((state) => state.reviews);
  const userActive = useSelector((state) => state.user);
  const [change, setChange] = useState("");

  const [product, setProduct] = useState({
    productId: id,
    quantity: 1,
    price: 0,
  });

  //-----------------------------------------
  //         PROMEDIO DE ESTRELLAS
  //-----------------------------------------
  const promedioReview = () => {
    var promedio = 0;
    for (var i in reviews) {
      promedio += parseInt(reviews[i].qualification);
    }
    return Math.floor(promedio / reviews.length);
  };

  //-----------------------------------------
  // FUNCION PARA TRAER STRING CON ESTRELLAS
  //-----------------------------------------
  const starQualification = (num) => {
    var stars = "";
    for (var i = 0; i < num; i++) {
      stars += "★";
    }
    return stars;
  };

  //-----------------------------------------
  //         GET DE PRODUCTOS
  //-----------------------------------------
  const getProduct = async () => {
    try {
      dispatch(actions.getProductById(id));
    } catch (err) {
      console.log(err.message);
    }
  };

  //-----------------------------------------
  //          GET DE REVIEWS
  //-----------------------------------------
  const getReview = async () => {
    try {
      dispatch(actions.getReview(id));
    } catch (err) {
      console.log(err.message);
    }
  };

  //-----------------------------------------
  //          CARRITO DE GUEST
  //-----------------------------------------
  const postLocalStorage = async () => {
    var guest = guestStorage.getItem("guestCart");
    var idGuest = parseInt(guestStorage.getItem("id"));
    if (!idGuest) {
      idGuest = 0;
    }
    var addItem = [];
    if (guest) {
      addItem = JSON.parse(guest);
    }
    var item = {
      idGuest: idGuest,
      name: prod.name,
      img: prod.img,
      quantity: product.quantity,
      price: product.price,
      productId: id,
      stock: prod.stock,
      originalPrice: prod.price 
    };
    addItem.push(item);
    guestStorage.setItem("guestCart", JSON.stringify(addItem));
    guestStorage.setItem("id", idGuest + 1);
    var newStock = {
      stock: prod.stock - product.quantity,
    };
    dispatch(actions.putQuantityOfProduct(id, newStock));
    setChange("stockCambiado");
    setChangeProd("stockCambiado");
  };

  //-----------------------------------------
  //          POST PRODUCT TO CART
  //-----------------------------------------
  const postProductToCart = async () => {
    try {
      var idPost = userActive.id;

      if (product.quantity > prod.stock || product.quantity < 0) {
        alert("Por favor seleccione una cantidad optima");
        return;
      }
      var newStock = {
        stock: prod.stock - product.quantity,
      };
      dispatch(actions.postProductToCart(idPost, product));
      dispatch(actions.putQuantityOfProduct(id, newStock));
      setChange("stockCambiado");
      setChangeProd("stockCambiado");
    } catch (err) {
      console.log(err.message);
    }
  };

  const handlerOnChange = (e) => {
    setProduct({
      ...product,
      quantity: e.target.value,
      price: prod.price * e.target.value,
    });
  };

  const verify = () => {
    if (!product.price) {
      setProduct({
        ...product,
        price: prod.price,
      });
    }
  };

  useEffect(() => {
    getProduct();
    getReview();
    setChange("");
  }, [change]);

  // CREAMOS DIVS CON CLASES DE BOOTSTRAP Y ESTILOS PROPIOS
  return (
    <div className="jumbotron container contenedor" id='productos-c'>
      <div className="botonera">
        <div className="editar">
          {userActive && userActive.access == "Admin" && (
            <Link to={`/form/${prod.id}`}>
              <button type="button" class="btn btn-primary ">
                <i class="far fa-edit fa-2x"></i>
              </button>
            </Link>
          )}
        </div>
        <div className="volver">
          <Link to={`/products`}>
            <button type="button" class="btn btn-success ">
              <i class="fas fa-arrow-left fa-2x"></i>
            </button>
          </Link>
        </div>
      </div>
      <h1
        className="titulo-prod"
        style={{ textDecoration: "none", color: "white" }}
      >
        {prod.name}
      </h1>
      <div className="contenedor-imagenes">
        <img src={prod.img} className="imagen-p" />
      </div>
      <p className="lead mt-4 mb-4 parrafo-desc" style={{ color: "white" }}>
        {prod.description}
      </p>
      <hr className="my-4" />
      <div className="container contenedor-info ml-5">
        <p className="precioP p-2" style={{ color: "white" }}>
          Precio: $ {prod.price}
        </p>
       {prod.stock ? <p className="precioP p-2" style={{ color: "white" }}>
          Stock: {prod.stock}
        </p>: <p className="precioP p-2" style={{ color: "white" }}>NO HAY STOCK</p>}

        {/* CLASIFICACIÓN DE ESTRELLAS */}
      </div>
      <div className="agrupar-bot">
        {((!userActive || (userActive && userActive.access === 'User')) && prod.stock) && 
        <div className="cantidad-prod">
          <input id="cantidad" placeholder="Cantidad" type="number"
            name="quantity" min="1" max={prod.stock} onChange={handlerOnChange}/>
        </div>}
        <div>
          {(!userActive || (userActive && userActive.access === 'User')) &&
          <button type="button" className="btn btn-success carrito"
            data-toggle="modal" data-target="#exampleModal" onClick={verify}>
            Agregar al carrito
          </button>}
          <div className="modal fade" id="exampleModal" tabindex="-1"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Su compra
                  </h5>
                  <button type="button" className="close" 
                  data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div id="imagenModal">
                    <img src={prod.img} className="imagen-modal text-center"/>
                  </div>
                  <p className="lead mt-4 mb-4 parrafo-desc" style={{ color: "black" }}>
                    {prod.description}
                  </p>
                  <p className="precioP p-2" style={{ color: "black" }}>
                    Precio: $ {prod.price * product.quantity}
                  </p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-danger" data-dismiss="modal">
                    Cerrar
                  </button>
                  <button type="button" className="btn btn-success" data-dismiss="modal"
                    onClick={userActive ? postProductToCart : postLocalStorage}>
                    Comprar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card card-review">
        <div className="title-subtitle">
          <h2 className="review-title">Opiniones sobre el producto</h2>
          {reviews.length ? (
            <div className="promedio-opiniones">
              <h3 className="review-subtitle">Promedio de opiniones:</h3>
              <p className="stars">{starQualification(promedioReview())}</p>
            </div>
          ) : (
            <br />
          )}
        </div>
        <div className="no-opinion">
          {reviews.length ? (
            reviews.map((revPost) => {
              return <CardReview {...{ revPost, starQualification }} />;
            })
          ) : (
            <h4 className="no-review">No hay opiniones todavia</h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;

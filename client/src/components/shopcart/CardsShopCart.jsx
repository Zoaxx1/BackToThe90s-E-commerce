import React, {useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";


import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/CardsShopCart.css";

const Cards = ({ scart, setChangeProd, setChangeCart }) => {
  const dispatch = useDispatch();
  const userActive = useSelector((state) => state.user)
  let eliminar = { ...scart, state: "cancelada" };
  var guestStorage = window.localStorage
  var product
  if(Array.isArray(scart.products)){
    product = scart.products[0];
  } 
  else {
    product = scart;
  }

  const [prodCart, setProdCard] = useState({
    productId: product.id,
    quantity: 1,
    price: 0,
  });

   //-----------------------------------------
  //          PUT PRODUCT TO CART
  //-----------------------------------------

  const putQuantityOfProduct = () => {
      if (prodCart.quantity > product.stock || prodCart.quantity < 0) {
        alert("Se cambió la cantidad correctamente");
        return;
      }
      var nuevoStock = {
        stock: product.stock - prodCart.quantity,
      };

      var updateOrder = {
        price: (product.price * prodCart.quantity),
        quantity: prodCart.quantity,
        orderId: scart.id
      }

      dispatch(actions.putQuantityOfOrder(userActive.id, updateOrder ))
      dispatch(actions.putQuantityOfProduct(product.id, nuevoStock));
      setChangeCart('product cambiado');
      setChangeProd('product cambiado')
  };

  const putQuantityLocalStorage = () => {
     
    if (prodCart.quantity > product.stock || prodCart.quantity < 0) {
      alert("Se cambió la cantidad correctamente");
      return;
    }

    var nuevoStock = {
      stock: product.stock - prodCart.quantity,
    };

    var prod = JSON.parse(guestStorage.getItem('guestCart')) 
    var prodStorage = prod.map((p) => {
      if( p.idGuest == product.idGuest ) {
        p.quantity = prodCart.quantity
        p.price = p.originalPrice * prodCart.quantity 
      }
      return p;
    } )
    guestStorage.setItem('guestCart', JSON.stringify(prodStorage))
    
    dispatch(actions.putQuantityOfProduct(product.productId, nuevoStock));
    setChangeCart('producto cambiado');
    setChangeProd('producto cambiado')
  };

  

  const cancelarProducto =  () => {
    var nuevoStock = {
      stock: product.stock 
    }

    if(scart.id){
      nuevoStock.stock = product.stock + scart.quantity
      dispatch(actions.putOrderById(scart.id, eliminar)); 
      dispatch(actions.putQuantityOfProduct(product.id, nuevoStock));
    } else {
      var guest = JSON.parse(guestStorage.getItem('guestCart'))
      var quiteProd = guest.filter(g => {
        return g.idGuest !== product.idGuest
      })
      guestStorage.setItem('guestCart', JSON.stringify(quiteProd))
      dispatch(actions.putQuantityOfProduct(product.productId, nuevoStock));
    }     
    
    setChangeCart('producto eliminado');
    setChangeProd('producto eliminado')
  }

  const handlerOnChange = (e) => {
    setProdCard({
      ...prodCart,
      quantity: e.target.value,
      price: product.price * e.target.value,
    });
  };

  return (
    <div className='contenedor-principal-cart'>
    <div className=" mb-3 cardShop">
      <div className="row no-gutters">
        <div className="col-md-3">
          <img src={typeof product == "object" ? product.img : "#"}
            className="card-img orderimage" alt="..." id="imgCard"/>
        </div>
        <div id="contentCard">
          <div className="details">
            <h6 className="card-text">
            <strong>{typeof product == "object" && product.name}</strong>
            </h6>
            <hr className="my-3" />
            <div className='agrupar-cant'>
            <p className="card-text cantidad-producto"><strong>Cantidad:</strong>{scart.quantity}</p>
            <div>
            <input className='input-cantidad' id="cantidad-cart" type="number" name="quantity" min="1" max={product.stock} onChange={handlerOnChange}/>
            </div>
            <div className='boton-aplicar ml-2'>
              <button className='btn btn-success' type='button' onClick={ userActive ? putQuantityOfProduct : putQuantityLocalStorage}><i className="fas fa-check-double" style={{color: 'white'}}/></button>
            </div> 
            </div>
            <div className='contenedor-total-precio'>
            <p className="card-text"><strong className='total-precio'>${scart.price}</strong></p>
            </div>
          </div>
          <hr className="my-3" />
        </div>
        <button type="button" className="btn btn-danger boton-x"
        id="closeButton" onClick={cancelarProducto}>
          X
        </button>
      </div>
    </div>
    </div>
  );
};


export default Cards;

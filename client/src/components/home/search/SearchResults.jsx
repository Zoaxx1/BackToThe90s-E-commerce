import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Product from "../../catalogue/ProductCard";
import * as actions from "../../../redux/actions";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/Results.css";

const SearchBar = () => {
  const dispatch = useDispatch();
  const userActive = useSelector(state => state.user)
  const products = useSelector((state) => state);
  const input = useLocation();

  const getSearch = async () => {
    try {
      if (input.search !== "") {
        dispatch(actions.getSearch(input.search));
      } else {
        dispatch(actions.getProducts());
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getSearch();
  }, [input.search]);
  //Cuando se produzca un cambio en el input.search se ejecutara
  //el useEffect

  const filter = () => {
    if (products.filterProducts.length) {
      return products.filterProducts.map((card) => {
        if(card.stock > 0){
          return <Product {...{card, userActive}}></Product>;
        }
      });
    } else {
      return products.products.map((card) => {
        if(card.stock > 0){
          return <Product {...{card, userActive}}></Product>;
        }
      });
    }
  };

  return (
    //si se modifica el ultimo numero se modifican la
    //cantidad de cards en un fila, que en este caso son 3 por fila
    <Fragment>
      {!products.filterProducts.length && (
        <p className="parrafo">
          SU BUSQUEDA NO FUE ENCONTRADA, QUIZA LE INTERESEN ESTOS PRODUCTOS ;
        </p>
      )}
      <div className="catalogueProducts p-3 mb-2 bg-info">
        {/*Container CardProducts*/}
        <div className="row row-cols-1 row-cols-md-4 containerProducts">
          {filter()}
        </div>
      </div>
    </Fragment>
  )
}

export default SearchBar;

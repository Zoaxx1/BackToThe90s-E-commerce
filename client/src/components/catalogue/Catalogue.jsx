import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getRelationsById, getAllReviews, getRelations } from "../../redux/actions";
import Product from "./ProductCard";
import Pagination from "./supports/Pagination";
import information from "./supports/Information"
import logo from './supports/logoh.png';

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/Catalog.css";

const Catalogue = ({ prod, categories, setChangeProd }) => {
  //Dispatch the actions
  const dispatch = useDispatch();
  //useParams is from react-rout-dom and get the params 
  const { idCat } = useParams();
  //all reviews from the products
  const allReviews = useSelector(state => state.allReviews);
  //all relations product - category
  //Ej.: idProduct: 1    idCategory: [2,3]
  const allRelations = useSelector(state => state.allRelations);
  //Array from products with have the same category in your relation
  const relations = useSelector((state) => state.relations);
  //User active three values: undefined, User, Admin
  const userActive = useSelector((state) => state.user);

  ///////////////////////Paginación////////////////////////////////
  const [currentPage, setCurrentPage] = useState(1);
  const [productByPage] = useState(12);

  const totalProducts = prod.length
  const lastProduct = productByPage * currentPage;
  const firstProduct = lastProduct - productByPage;
  const currentsProducts = prod.slice(firstProduct, lastProduct);

  const changePage = page => setCurrentPage(page);
  ////////////////////////////////////////////////////////////////  

  //GET REVIEWS
  const getAllReviewsToProducts = async () => {
    dispatch(getAllReviews())
  }

  //GET RELATIONS
  const getAllRelations = async () => {
    dispatch(getRelations())
  }

  useEffect(() => {
    //if idCat is true, get all products with the same idCat (id category)
    idCat && dispatch(getRelationsById(idCat));
    getAllReviewsToProducts();
    getAllRelations();
  }, [idCat]);

  return (
    //si se modifica el último numero se modifican la
    //cantidad de cards en un fila, que en este caso son 3 por fila
    <Fragment>
      <div className="catalogues">
        <div className="contenedor-categorias">
          <Link to="/products">
            <button type="button" className="btn btn-dark link-categoria-all">
              Todas las categorías
            </button>
          </Link>
          {/*Link to back to view all ProductCards*/}
          <div className="ordenada-categorias">
            <ul className="lista-des">

{/*///////////////////////// List of Categorys to search /////////////////////////*/}
              {categories.map((category) => {
                return (
                  <li className="mb-1 categoria-cat">
                    <Link style={{ textDecoration: "none", color: "black" }}
                      to={`/products/${category.id}`}>
                      <strong>
                        <i className="fas fa-angle-right derecha"></i>
                      </strong>{" "}
                      {category.name}{" "}
                    </Link>
                  </li>
                );
              })}

            </ul>
          </div>
          <div className='contenedor-imagen-h'>
              <a href="https://www.soyhenry.com/" target='blank'><img src={logo} alt="" className='logo-henry'/></a>
          </div>
          <div>
            <p className='parrafo-h'>Invertimos en tu educación</p>
          </div>
        </div>
{/*///////////////////////// Container CardProducts /////////////////////////*/}
      <div className='contenedor-principal-productos'>  
        <div className="contenedor-productos-catalogo">
          {!idCat ? ( //If the idCat is undefined
            Array.isArray(currentsProducts) &&
            currentsProducts.map((card) => {
              const {reviewsPorcentage, productCategories, admin} = information(card, categories, userActive, allRelations, allReviews)
              //If the stock is more less or equal to 0 not showing, except if you are the admi
              if (card.stock > 0 || admin) {
                return (
                  <Product {...{ card, setChangeProd, userActive, reviewsPorcentage, productCategories }}></Product>
                );
              }
            })
          ) : 
          //Else if idCat not undefined
          relations.length ? ( 
            relations.map((card) => {
              //Si el category no es undefined se imprime esto
              const {reviewsPorcentage, productCategories, admin} = information(card, categories, userActive, allRelations, allReviews)
              //If the stock is more less or equal to 0 not showing, except if you are the admi
              if (card.stock >= 0 || admin) {
                return (
                  <Product {...{ card, setChangeProd, userActive, reviewsPorcentage, productCategories }}></Product>
                );
              }
            })
          ) :
          //If not exist any product to this category show this message
          <p className="parrafoCAT">No hay productos para esta categorÍa</p>
        }
{/*/////////////////////////////////// PAGINATION ///////////////////////////////////*/}
        </div>
        <div className='paginacion-caja'>
              <div className='paginacion-catalogo'>
                <Pagination {...{ totalProducts, productByPage, changePage, currentPage }} />
              </div>
          </div>
        </div>  
      </div>
          
    </Fragment>
  );
};

export default Catalogue;

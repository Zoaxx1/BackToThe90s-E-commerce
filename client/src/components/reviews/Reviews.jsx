import React, { useState, useEffect } from "react";
import * as actions from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/Reviews.css";

const Reviews = ({setChangeProd}) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const product = useSelector((state) => state.productByID);
  const userActive = useSelector((state) => state.user);
  const [reviews, setReviews] = useState({
    qualification: "",
    opinion: "",
    userId: userActive.id,
  });

  function handlerOnChange(event) {
    setReviews({
      ...reviews,
      [event.target.name]: event.target.value,
    });
  }

  const postReview = () => {
    try {
      dispatch(actions.postReview(id, reviews));
      setChangeProd('review')
      alert("Gracias por su opinión!");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(actions.getProductById(id));
  }, []);

  return (
    <div className="cont-p">
      {(typeof userActive !== "object") && (
        <Redirect to="/" />)}
      <div className="volver-a-product">
        <Link to={`/product/:id`}>
          <button type="button" class="btn btn-success ">
            <i class="fas fa-arrow-left fa-2x"></i>
          </button>
        </Link>
      </div>
      <div className="container-review">
        <h1>Deja tu opinion</h1>
        <div className="container-imagen">
          <img className="imagen-review" src={product.img} />
        </div>
        <div className="valoracion">
          <input id="radio1" type="radio" name="qualification" value="5" onChange={handlerOnChange} />
          <label for="radio1">★</label>
          <input id="radio2" type="radio" name="qualification" value="4" onChange={handlerOnChange} />
          <label for="radio2">★</label>
          <input id="radio3" type="radio" name="qualification" value="3" onChange={handlerOnChange} />
          <label for="radio3">★</label>
          <input id="radio4" type="radio" name="qualification" value="2" onChange={handlerOnChange} />
          <label for="radio4">★</label>
          <input id="radio5" type="radio" name="qualification" value="1" onChange={handlerOnChange} />
          <label for="radio5">★</label>
        </div>
        <div className="review">
          <textarea className="review-opinion" cols="50" rows="5" placeholder="Deja tu opinión aquí..." name="opinion" onChange={handlerOnChange} />
        </div>
        <div className="botones">
          <Link to={`/product/${id}`} >
            <button type="button" className="btn btn-success" onClick={postReview}>Aceptar</button>
          </Link>
          <Link to={`/product/${id}`} >
            <button type="button" className="btn btn-danger">Cancelar</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Reviews;

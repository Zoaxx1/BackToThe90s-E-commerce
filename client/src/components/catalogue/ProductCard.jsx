import React, {useEffect} from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../redux/actions'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/ProductCard.css';


const Product = (props) => {
    const dispatch = useDispatch()
    const { reviewsPorcentage } = props
    const { id, name, price, stock, img } = props.card
    const { productCategories } = props
    var productCategory = useSelector(state => state.relationsCategories)
    var { description } = props.card
    //limit the description
    description = description.length > 25 ?
        description.substr(0, 25) + '...' :
        description;

    //-----------------------------------------
    //         PROMEDIO DE ESTRELLAS
    //-----------------------------------------
    const promedioReview= () => {
        var promedio= 0;
        for (var i in reviewsPorcentage) {
            promedio += parseInt(reviewsPorcentage[i].qualification)
        }
        return Math.floor(promedio/reviewsPorcentage.length)
    }
    
    //-----------------------------------------
    // FUNCION PARA TRAER STRING CON ESTRELLAS
    //-----------------------------------------
    const starQualification = (num) =>{
        var stars = ''
        for(var i = 0; i < num; i++){
            stars +=  '★'   
        }
        return stars
    }


    // -------------------------ELIMINAR PRODUCTO----------------------------

    const deleteProduct =  () => {
        try {
        dispatch(actions.deleteProduct(id))
        alert('se borró el producto')
        props.setChangeProd('del')
        } catch (err) {
            console.log(err.message);
        }
    };

    // useEffect(()=> {
    //     dispatch(actions.getRelationsCategoriesById(id))
    // },[]) 

    return (
        <div>
            <div className="col mb-4">
                <div className="card-body cb">
                    {props.userActive && props.userActive.access == 'Admin' && 
                    <div className="mr-2 deleteButton">                 
                        <button type="button" className="btn btn-danger carrito" data-toggle="modal" data-target="#exampleModal" onClick={deleteProduct}>
                            <i className="fas fa-times-circle"></i>
                        </button>
                    </div>}
                    <div className= "imagenprincipal">
                        <img src={img} className="card-img principalimg" />
                    </div>
                    <Link to={`/product/${id}`} style={{ textDecoration: 'none', color: 'white' }}>
                        <h3 className="card-title">{name}</h3>
                        <p className="card-text">{description}</p>
                        <hr style={{ color: 'white' }} className="my-2"></hr>
                        <h6 className='renderizados'>Precio: $ {price}</h6>
                        <h6 className='renderizados'>Stock: {!!stock ? stock : 'NO HAY'}</h6>
                        <h6 className='renderizados'>Categoria: {productCategories && productCategories.map(pc => {if (pc){ return pc + ' '} })}</h6>
                        <h6 className='stars'>{reviewsPorcentage && starQualification(promedioReview()) }</h6>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Product;


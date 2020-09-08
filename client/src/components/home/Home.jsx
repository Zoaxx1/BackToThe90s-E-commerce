import React from 'react';

import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Home.css';


const Home = () => {

    return (
        <div className= "cont-p">
            <h1 className="title-p">Back to the 90's</h1>
            <hr className="my-4" />
            <p className='lead cont-sect'>Bienvenidos a la tienda mas grande de los años 90's. Aca vas a encontrar de todo <br /> Se libre de navegar por nuestra web, encontra lo que buscas, lo llevas y revivis tu infancia!</p>
            <div className=' boton-mas'>
                <Link to='/products'>
                    <button type="button" className="btn btn-success boton-ir">Vamos alla!</button>
                </Link>
            </div>

            {/* CAROUSEL */}

            <div id="carouselExampleCaptions" className="carousel slide car-principal" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                    <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
                    <li data-target="#carouselExampleCaptions" data-slide-to="3"></li>
                </ol>
                <div className="carousel-inner car-imagenes">
                    <div className="carousel-item active ">
                        <img src="https://cutt.ly/Pd3fKHK" className="d-block justify-content-center imagen-c" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                          <h5 className= "carousel-h5">Electronica y videojuegos</h5>                          
                            <p className= "carousel-p">Revivi el 8-BIT en la version que prefieras</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="https://cutt.ly/OfpoInF" className="d-block imagen-c" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h5 className="carousel-h5">Indumentaria</h5>
                            <p className="carousel-p">¿De verdad teniamos tan mal gusto?</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="https://cutt.ly/yfpoA1f" className="d-block imagen-c" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h5 className= "carousel-h5">Musica</h5>
                            <p className= "carousel-p">Vas a volver a bailar, y nunca vas a parar...</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="https://cutt.ly/vfpoHqW" className="d-block imagen-t" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h5 className="carousel-h5">Golosinas</h5>
                            <p className="carousel-p">El sabor de tu infancia!</p>
                        </div>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        </div>
    )
}

export default Home;


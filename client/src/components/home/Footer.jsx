import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/Home.css";

const Footer = () => {
  return (
    <div className="border-gradient">
      <footer className="page-footer font-small blue pt-4">
        <div className="container-fluid text-center text-md-left">
          <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
              <h5 className="text-uppercase titulo-footer">Back to the 90's</h5>
              <p className="parrafo-footer">
                La tienda #1 en merchandising de los 90's, a precios de los
                90's!
              </p>
            </div>
            <hr className="clearfix w-100 d-md-none pb-3" />
            <div className="col-md-6 mb-md-0 mb-6 links-footer">
              <ul className="list-unstyled">
                <li>
                  <Link to="/user/register" className="text-light-f"
                  className="link-footer" style={{ color: "white" }}>
                      Ingresa
                  </Link>
                </li>
                <li>
                  <Link to="/products" className=" text-light-f"
                  className="link-footer" style={{ color: "white" }}>
                      Catalogo
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-light-f"
                  className="link-footer" style={{ color: "white" }}>
                      ¿Quienes somos?
                  </Link>
                </li>
                <li>
                <Link to={`/faq`} className="text-light-f"
                className="link-footer" style={{ color: "white" }}>
                      FAQ
                </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className= "redes">
          <h5 className="text-uppercase titulo-footer">Buscanos en las redes!</h5>
          <div className= "boton-redes">
            {/*FACEBOOK*/}
            <a className="btn btn-outline-light btn-social mx-1" 
            href="https://www.facebook.com/Back-to-the-90s-110556427442912" 
            target= "blanck"><i className="fab fa-fw fa-facebook-f"></i></a>
            {/*TWITTER*/}
            <a className="btn btn-outline-light btn-social mx-1" 
            href="https://twitter.com/to_90/" 
            target= "blanck"><i className="fab fa-fw fa-twitter"></i></a>
            {/*INSTAGRAM*/}
            <a className="btn btn-outline-light btn-social mx-1" 
            href="https://www.instagram.com/back_to_the_90_.s/" 
            target= "blanck"><i className="fab fa-fw fa-instagram"></i></a>
          </div>
        </div>
        <div className="footer-copyright text-center py-3">
          © 2020 Red Hot Chilli Henry's y
          <a href="https://www.soyhenry.com/" target= "blanck"> SoyHenry.com</a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

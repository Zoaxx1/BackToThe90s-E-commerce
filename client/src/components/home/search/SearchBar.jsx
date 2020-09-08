import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/SearchBar.css";


//f es la función pasada por props que se conectará con redux en el futuro
const SearchBar = () => {
    //tiene un estado inicial
    const [input, setInput] = useState('');

    //Si input no es un string vacio te permite ir al Link
    const validate = ()=>{
        if(input !== ''){
            return <Link to={'/search?query=' + input} ><i className="fas fa-search ml-2 mr-2 fa-2x"></i></Link>
        }
        else{
            return <i className="fas fa-search ml-2 mr-2 fa-2x"></i>
        }
    }

    const handleChange = (event) => {
        setInput(event.target.value);
    }

    return (
        <nav className="navbar navbartext-white">
            <form className="form-inline searchBar">
                <div className= "input">
                    <input placeholder= "Escriba aquí" className="search-input form-control" type='text' onChange={handleChange}/>
                </div>
                <div className="boton-search">
                    {validate()}                    
                </div>
            </form>
        </nav>
    )
}

export default SearchBar;

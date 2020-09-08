import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";

const Buttons = ({post, put, del, handleClick})=>{
    return(
        <div className="d-flex mb-2 ml-3">
            <div className="mr-2">
                <button className="btn btn-success" onClick={post}>
                Guardar
                </button>
            </div>
            <div className="mr-2">
                <button className="btn btn-primary" onClick={put}>
                Editar
                </button>
            </div>
            <div className="mr-2">
                <button className="btn btn-danger" onClick={del}>
                Eliminar
                </button>
            </div>
        </div>
  )
}

export default Buttons

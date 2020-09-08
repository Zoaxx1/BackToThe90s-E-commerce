import React from 'react'
import { Link } from 'react-router-dom'

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/CardsUser.css"

const CardUser = (props) => {
    const user = props.user

    return(
        <div className="cardOrder tarjeta" >
            <Link to={"/orders/user/" + user.id} className='link'>
                <div>
                    <h5 className='usuario'>
                        {' Usuario: ' +  user.name}
                    </h5>
                </div>
                <div>
                    <h5 className='usuario'>{user.access}</h5>
                </div>
            </Link >
        </div>
    )
}

export default CardUser
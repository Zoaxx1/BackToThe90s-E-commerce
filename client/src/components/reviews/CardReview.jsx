import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/CardReview.css"

//---------------------------------
//        PARSEO DE DATE          |
//---------------------------------
const parseDate = (oldDate) => {
    return new Date(oldDate).toLocaleString("es", {
        "weekday": "long",
        "month": "long",
        "day": "numeric",
        "hour": "2-digit",
        "minute": "2-digit"
    });
}


const CardReview= ({ revPost, starQualification}) => {
    return (
        <div className= "each-review tarjetaReview">
            <div>
                <p className= "stars">{starQualification(revPost.qualification)}</p>
                <p className= "review-p-opinion">{revPost.opinion}</p>
            </div>
            <p className= "review-p-name">{revPost.userName}</p>
            <p className= "review-p-date">{parseDate(revPost.createdAt)}</p>       
            <hr className='my-4'/>
        </div>    
    )
}

export default CardReview;
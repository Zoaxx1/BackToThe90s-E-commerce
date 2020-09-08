import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

const Pagination = ({ totalProducts, productByPage, changePage, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalProducts / productByPage); i++) {
        pageNumbers.push(i);
    }

    const inRange = (cb, op) => {
        if (op) currentPage < pageNumbers.length && cb()
        else currentPage > 1 && cb()
    }

    const colorActive = (number)=>{
        return 'page-link' + ((currentPage === number) ? ' bg-dark text-light' : '')
    }


    return (
        <nav>
            <ul className="pagination justify-content-center">
                <li className="page-item">
                    <a onClick={() => inRange(() => changePage(currentPage - 1), 0)} className="page-link bg-dark">
                        <i class="fas fa-step-backward text-light"/>
                    </a>
                </li>
                {pageNumbers && pageNumbers.map(number => (
                    <li class='page-item'>
                        <a class={colorActive(number)} onClick={() => changePage(number)}>
                            { number }
                        </a>
                    </li>
                ))}
                <li className="page-item">
                    <a onClick={() => inRange(() => changePage(currentPage + 1), 1)} className="page-link bg-dark">
                        <i class="fas fa-step-forward text-light"/>
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination;
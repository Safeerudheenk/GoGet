import React from 'react';
import './Product.css';
import GradeIcon from '@material-ui/icons/Grade';
import { Link } from 'react-router-dom';



function Product(props) {
  
    return (
        <div className="product">
            <div className="product__info">
            <Link  style = {{textDecoration:'none'}}
            to= {`/product/${props.id}`} >
            <p className="product__info__name" >{props.title}</p>
            
            <p className="product__price">
                <small>$</small>
                <strong>{props.price}</strong>
            </p>
            <div className="product__rating" >
                {
                    Array(props.rating)
                    .fill()
                    .map((_) => (
                        <p><GradeIcon/> </p>
                    ))
                }
            </div>
            </Link>
            </div>
            <img src={props.image} />
            <Link to= {`/product/${props.id}`} >
             <button  
              >Add to cart</button>
             </Link>
           
        </div>
    )
}

export default Product

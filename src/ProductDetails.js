import React, { useEffect, useState } from 'react';
import Header from './Header';
import './ProductDetails.css';
import GradeIcon from '@material-ui/icons/Grade';
import { useDispatch, useSelector } from 'react-redux';
import {getProductDetails} from './actions/productActions'

function ProductDetails(props) {
    const proID = props.match.params.id;
    console.log(proID)
    const dispatch  = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const productDetails = useSelector (state => state.productDetails)
    const {error , loading, product} = productDetails;
    
    useEffect (() => {
        dispatch(getProductDetails(proID));
    },[dispatch, proID]);
    console.log(product);
    const addToCartHandler = () => {
        props.history.push(`/cart/${proID} ? quantity = ${quantity}`)
    }

    return loading ? <div>loading</div> 
    :error ?<div>{error}</div>: (    
        <div className="productDetails">
            <Header/>
            <div className="productDetails__section" >
              <div className="productDetails__image">
                  <img src={product.image}  />
              </div>
              <div className="productDetails__info">
              <ul>
                         <li>
                         <h1>{product.name}</h1>
                         </li>
                         <li>
                            ${product.price}
                         </li>
                         <li>
                          rating: {product.rating}
                         </li>
                         <li>
                             {product.description}
                         </li>
                     </ul>
                     <div className="productDetais__subtotal">
                     <div className="addToCart card card__body" >

                         <div className="availability" >
                             <p>
                                 Availability:
                             </p>
                         {product.countInStock !==0 ?
                         <span className="inStock">In Stock</span>
                         : <span className="outOfStock" >Out of Stock </span>
                          }

                         </div>
                         <div className="quantity">
                             <p>
                                 Quantity: 
                             </p>
                             <select className="select"
                              value={quantity}
                               onChange={(e) => setQuantity(e.target.value)} >
                              
                                  { 
                                   [...Array(product.countInStock).keys()].map( x => (
                                       <option value={x+1} >{x+1}</option>
                                   )) 
                                  }
                        
                   </select>
                         </div>
                         {product.countInStock >0 && (
                            <button
                            onClick={addToCartHandler}
                            >Add to Cart
                          </button>                            
                         )
                         }

        
                 </div>
                 </div>
                 </div>
                  </div>
            </div>
            
            
            
            
                 


            
    )
}

export default ProductDetails;

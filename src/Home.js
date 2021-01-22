import React, { useEffect} from 'react';
import './Home.css'
import Product from './Product';
import Header from './Header';
import {useSelector, useDispatch} from 'react-redux';
import { listProducts } from './actions/productActions';


function Home() {
  const productList = useSelector (state => state.productList);
    const {loading, error , products} = productList;
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(listProducts());
    },[dispatch])
    return loading ? <div>Loading</div> :
    error ? <div>{error}</div> :(
        
        <div className="home">
          <Header/>
            <img
            className="home__image"
            src="./Home.jpg"
           />


     <div className="home__row">
     {
              products.map(product =>
                
                <Product
                title={product.name}
                image={product.image}
                rating={product.rating}
                price={product.price}
                id = {product._id}
                />
                )
          }

      </div>
        </div>
    )
}

export default Home;
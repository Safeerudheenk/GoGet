import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import { generateRazorPayReducer, orderCreateReducer, orderDetailsReducer, orderListReducer, orderPayReducer } from './reducers/orderReducers';
import {productListReducer, productDetailsReducer} from './reducers/productReducers'
import { userDetailsReducer, userSigninReducer, userSignupReducer, userUpdateProfileReducer } from './reducers/userReducers';

const initialState = {
    userSignin: {
        userInfo:localStorage.getItem('userInfo') ?
        JSON.parse(localStorage.getItem('userInfo')):null
    },
    cart:{
        cartItems:localStorage.getItem('cartItems')? 
        JSON.parse(localStorage.getItem('cartItems')):[],

        shippingAddress:localStorage.getItem('shippingAddress')?
        JSON.parse(localStorage.getItem('shippingAddress')):{},

        paymentMethod:'RazorPay'
    }
};

const reducer = combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    cart:cartReducer,
    userSignin:userSigninReducer,
    userSignup:userSignupReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    orderPay:orderPayReducer,
    orderList:orderListReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  ||compose
 
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))

export default store;
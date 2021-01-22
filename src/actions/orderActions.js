import axios from "axios";
import { CART_EMPTY } from "../constants/cartConstants";
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_ITEMS_LIST_FAIL, ORDER_ITEMS_LIST_REQUEST, ORDER_ITEMS_LIST_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_RAZORPAY_FAIL, ORDER_RAZORPAY_REQUEST, ORDER_RAZORPAY_SUCCESS } from "../constants/orderConstants"


export const createOrder = (order) => async (dispatch) => {
    dispatch ({type:ORDER_CREATE_REQUEST, payload: order});
    try {
        const {data}  = await axios.post('/api/orders/', order);
        dispatch({type:ORDER_CREATE_SUCCESS, payload: data.order});
        dispatch({type:CART_EMPTY});
        localStorage.removeItem('cartItems');
    }catch(error){
        dispatch({
            type:ORDER_CREATE_FAIL,
            payload:error.response && error.response.data.message ?
            error.response.data.message
            :error.message
        })
    }
}


export const detailsOrder = (orderId) =>async (dispatch) => {
    dispatch({type:ORDER_DETAILS_REQUEST, payload:orderId});
    try{
        const {data} = await axios.get(`/api/orders/${orderId}`)
        dispatch({type:ORDER_DETAILS_SUCCESS, payload:data})
    }catch(error){
        dispatch({
            type:ORDER_DETAILS_FAIL,
            payload:error.response && error.response.data.message ?
            error.response.data.message
            :error.message
        })
    }
}

export const payOrder = (order, paymentResult) => async (dispatch) => {
    dispatch({type:ORDER_PAY_REQUEST, payload:{order, paymentResult}});
    try{
        const {data} = await axios.put(`/api/orders/${order._id}/pay`, paymentResult);
        dispatch({type:ORDER_PAY_SUCCESS, payload:data});
    }catch(error){
        dispatch({
            type:ORDER_PAY_FAIL,
            payload:error.response && error.response.data.message ?
            error.response.data.message
            :error.message
        })
    }
}

export const listOrders = (user) => async(dispatch, getState) => {
    dispatch({type:ORDER_ITEMS_LIST_REQUEST});
    try{
        const {data} = await axios.get(`/api/orders/list/${user}`)
        dispatch ({type:ORDER_ITEMS_LIST_SUCCESS, payload:data})
    }catch(error){
        dispatch({
            type:ORDER_ITEMS_LIST_FAIL,
            payload:error.response && error.response.data.message ?
            error.response.data.message
            :error.message
        })
    }
}
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_RESET, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_ITEMS_LIST_FAIL, ORDER_ITEMS_LIST_REQUEST, ORDER_ITEMS_LIST_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_RAZORPAY_FAIL, ORDER_RAZORPAY_REQUEST, ORDER_RAZORPAY_SUCCESS } from "../constants/orderConstants";

export const orderCreateReducer = (state = {}, action) => {
    switch (action.type){
        case ORDER_CREATE_REQUEST:
            return {loading:true}
        case ORDER_CREATE_SUCCESS:
            return {loading:false, success:true, order:action.payload}
        case ORDER_CREATE_FAIL:
            return { loading:false, error: action.payload}
        case ORDER_CREATE_RESET:
            return {};
        default:
            return state;
    }
}

export const orderDetailsReducer = (state = {loading:true}, action) => {
    switch(action.type){
        case ORDER_DETAILS_REQUEST:
            return {loading:true};
        case ORDER_DETAILS_SUCCESS:
            return {loading:false, order:action.payload};
        case ORDER_DETAILS_FAIL:
            return {loading:false, error:action.payload};
        default:
            return state;
    }
}


export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return {Loading:true};
        case ORDER_PAY_SUCCESS:
            return {Loading:false, success:true};
        case ORDER_PAY_FAIL:
            return {loading:false, error:action.payload};
        default:
            return state;
    }
}

export const orderListReducer = (state = {orders:[]}, action) => {
    switch (action.type){
        case ORDER_ITEMS_LIST_REQUEST:
            return {loading:true};
        case ORDER_ITEMS_LIST_SUCCESS:
            return {loading:false, orders:action.payload};
        case ORDER_ITEMS_LIST_FAIL:
            return {loading:false, error:action.payload};
        default:
            return state;
    }
}
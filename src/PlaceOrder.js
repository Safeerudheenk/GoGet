import React, {useEffect} from 'react';
import Header from './Header';
import CheckoutSteps from './CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux';
import './PlaceOrder.css';
import { createOrder } from './actions/orderActions';
import { ORDER_CREATE_RESET } from './constants/orderConstants';



function PlaceOrder(props) {
    const cart = useSelector(state =>  state.cart);
    if(!cart.paymentMethod){
        props.history.push('/payment');
    }
    const orderCreate = useSelector((state) => state.orderCreate);
    const {loading, success, error, order} = orderCreate;

    const toPrice = (num) => Number(num.toFixed(2));  //4.3423 => "4.34" => 4.34
    cart.itemsPrice = toPrice(cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0));
    cart.deliveryCharge = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
    cart.totalPrice = cart.itemsPrice + cart.deliveryCharge;
    const dispatch = useDispatch();
    const userSignin = useSelector((state) => state.userSignin);
    const {userInfo} = userSignin;
    const placeOrderHandler = (e) => {
        e.preventDefault();
        dispatch(createOrder({...cart, orderItems:cart.cartItems, user:userInfo._id}))
    }

    useEffect (() => {
        if(success){
            props.history.push(`/order/${order._id}`);
            dispatch({type:ORDER_CREATE_RESET});
        }
    },[success, dispatch, props.history, order]);
     
    return (
        <div className="placeOrder" >
            <Header/>
            <CheckoutSteps step1 step2 step3 step4 />
            <div className="row__top" >
                <div className="row__top1">
                <div className="col__2" >
                    <ul>
                      <li>
                          <div className="card card__body" >
                              <h2>Shipping</h2>
                              <p>
                                  <strong>Name: </strong>{cart.shippingAddress.fullName}<br/>
                                  <strong>Address: </strong>{cart.shippingAddress.address},
                                  {cart.shippingAddress.city},{cart.shippingAddress.pincode},
                                  {cart.shippingAddress.state}
                              </p>
                          </div>
                      </li>
                      <li>
                          <div className="card card__body">
                              <h2>payment</h2>
                              <p>
                                  <strong>Method: </strong> {cart.paymentMethod}
                              </p>
                          </div>
                      </li>
                      <li>
                          <div className="card card__body" >
                              <h2>Order Items</h2>
                              {cart.cartItems.map((item) =>(
                              <div key={item.product} className="placeOrder__cartItem">
                              <img className="cardBody__image" src={item.image} alt="image" />
                              <div>
                              <h4>{item.name}</h4>
                              </div>
                              <div>
                              <h4 className="item-price">{item.quantity} x ${item.price} = ${item.quantity * item.price}</h4>
                             </div>
                             </div>
                              ))}
                          </div>
                      </li>
                    </ul>
                </div>
                </div>
                <div className="row__top2">
                <div className="col__1" >
                    <div className="card card__body" >
                        <ul>
                            <li>
                                <h2>Order Summary</h2>
                            </li>
                            <li>
                                <div className="row" >
                                    <div>Items</div>
                                    <div>${cart.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row" >
                                    <div>Delivery charge</div>
                                    <div>${cart.deliveryCharge.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row" >
                                    <div> <strong>Order Total</strong></div>
                                    <div><strong>${cart.totalPrice.toFixed(2)}</strong></div>
                                </div>
                            </li>
                            <li>
                                <button className="card__button" type="button"
                                disabled={cart.cartItems.length === 0}
                                onClick={placeOrderHandler}
                                 >
                                    Place Order
                                </button>
                                { error && <div>{error}</div>}
                                {loading && <div>loading</div>}
                            </li>
                        </ul>
                    </div>
                </div>
                </div>
            </div>

        </div>
    )
}

export default PlaceOrder

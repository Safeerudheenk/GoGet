import React, {useEffect, useState} from 'react';
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';
import './PlaceOrder.css';
import { detailsOrder, generateRazorPay, payOrder } from './actions/orderActions';
import axios from 'axios';
import {PayPalButton} from 'react-paypal-button-v2';


function Order(props) {
    const dispatch = useDispatch();
    const orderId = props.match.params.id;
    const [sdkReady, setSdkReady] = useState(false);
    const orderDetails = useSelector((state) => state.orderDetails);
    const {order, loading, error} = orderDetails;
    const orderPay = useSelector((state) => state.orderPay);
    const {error:errorPay, success:successPay, loading:loadingPay } = orderPay;
    useEffect(() => {
        const addPayPal = async () => {
            const {data} = await axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type="text/javascript";
            script.src=`http://www.paypal.com/sdk/js?client-id=${data}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            }
            document.body.appendChild(script);
        }
        if(!order || successPay || (order && order._id !==orderId)){
            dispatch(detailsOrder(orderId)); 
        }else{
            if(!order.isPaid){
                if(!window.paypal){
                    addPayPal()
                }else{
                    setSdkReady(true);
                }
            }
        }
        
    },[dispatch,order, sdkReady, orderId]);

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(order, paymentResult));
    }
    
    return loading ? <div>Loading...</div>:
    error? <div>{error}</div>:(
        <div className="placeOrder" >
            <Header/>
            <span><strong>Order</strong>{order._id}</span>
            <div className="row__top" >
                <div className="row__top1">
                <div className="col__2" >
                    <ul>
                      <li>
                          <div className="card card__body" >
                              <h2>Shipping</h2>
                              <p>
                                  <strong>Name: </strong>{order.shippingAddress.fullName}<br/>
                                  <strong>Address: </strong>{order.shippingAddress.address},
                                  {order.shippingAddress.city},{order.shippingAddress.pincode},
                                  {order.shippingAddress.state}
                              </p>
                              {order.deliveredAt ? <div className="status__1" >Delivered at{order.deliveredAt}</div>
                              :<div className="status__2" >Not delivered</div>
                              }
                          </div>
                      </li>
                      <li>
                          <div className="card card__body">
                              <h2>payment</h2>
                              <p>
                                  <strong>Method: </strong> {order.paymentMethod}
                                  {order.isPaid ? <div className="status__1" >Paid at {order.paidAt}</div>
                                  :<div className="status__2" >Not Paid</div>
                                  }
                              </p>
                          </div>
                      </li>
                      <li>
                          <div className="card card__body" >
                              <h2>Order Items</h2>
                              {order.orderItems.map((item) =>(
                              <div key={item.product} className="placeOrder__cartItem">
                              <img className="cardBody__image" src={item.image}  alt="image" />
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
                                    <div>${order.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row" >
                                    <div>Delivery charge</div>
                                    <div>${order.deliveryCharge.toFixed(2)}</div>
                                </div>
                            </li>
                        
                            <li>
                                <div className="row" >
                                    <div> <strong>Order Total</strong></div>
                                    <div><strong>${order.totalPrice.toFixed(2)}</strong></div>
                                </div>
                            </li>
                            <li>
                                {
                                    !order.isPaid && (
                                        <li>
                                            {!sdkReady ? <div>loading</div>:
                                            (   
                                                <>
                                                {loadingPay && <div>{loadingPay}</div>}
                                                {errorPay && <div>{errorPay}</div>}
                                                <PayPalButton
                                                 amount={order.totalPrice} 
                                                 onSuccess = {successPaymentHandler}>

                                                </PayPalButton>
                                                </>
                                            )
                                 } 
                                  </li>
                                    )
                                }
                               
                            </li>
                        </ul>
                    </div>
                </div>
                </div>
            </div>

        </div>
    )
}

export default Order

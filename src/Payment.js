import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { savePaymentMethod } from './actions/cartActions';
import CheckoutSteps from './CheckoutSteps';
import Header from './Header';
import './Payment.css';

function Payment(props) {
    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart;
    if(!shippingAddress.address){
        props.history.push('/shipping');
    }
    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    const dispatch = useDispatch();
    const submitHandler = (e)=> {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        props.history.push('/placeorder');
    }
    return (
        <div>
            <Header/>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <form className="form" onSubmit={submitHandler} >
                <div>
                   <h1> Payment</h1>
                </div>
                <div >
                    <div className="form__input"  >
                        <div>
                        <input type='radio'
                        id="paypal"
                        name="paymentMethod"
                        value="PayPal"
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        ></input>
                        <label htmlFor="paypal">PayPal</label>
                        </div>


                       <div>
                        <input type='radio'
                        id="cod"
                        name="paymentMethod"
                        value="COD"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        ></input>
                        <label htmlFor="cod">Cash On Delivery</label>
                        </div>
                    </div>
                    <div>
                        <button
                        className="payment__btn"
                         type="submit">
                        Continue</button>
                    </div>   
                </div>
            </form>
        </div>
    )
}

export default Payment

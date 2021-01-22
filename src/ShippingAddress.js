import React, {useState} from 'react'
import CheckoutSteps from './CheckoutSteps';
import './ShippingAddress.css';
import {useDispatch, useSelector} from 'react-redux';
import { saveShippingAddress } from './actions/cartActions';
import Header from './Header';

function ShippingAddress(props) {
    const userSignin = useSelector (state => state.userSignin);
    const {userInfo} = userSignin;
    const cart = useSelector (state =>  state.cart);
    const {shippingAddress}  = cart;
    if(!userInfo){
        props.history.push('/signin');
    }
    const [fullName, setfullName] = useState(shippingAddress.fullName);
    const [address, setAddress] = useState(shippingAddress.address);
    const [mobileNumber, setMobileNumber] = useState(shippingAddress.mobileNumber);
    const [city, setCity] = useState(shippingAddress.city);
    const [pincode, setPincode] = useState(shippingAddress.pincode);
    const [state, setState] = useState(shippingAddress.state);

    const dispatch = useDispatch ();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({fullName, address, mobileNumber, city, pincode, state}));
        props.history.push('/payment');
    }
    
    return (
        <div className="shippingAddress">
            <Header/>
            <CheckoutSteps step1 step2  />
            <form className="form" 
            onSubmit={submitHandler}
             >
                <div>
                    <h1>Shipping Address</h1>
                </div>
                <div>
                    <label htmlFor="fullName">Full Name</label>
                    <input placeholder="Enter your full Name here"
                     id="fullName"
                     value={fullName}
                    onChange= {(e) => setfullName(e.target.value)}
                    required>
                    </input>  
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input placeholder="Enter your address here"
                     id="address"
                     value={address}
                    onChange= {(e) => setAddress(e.target.value)}
                    required>
                    </input>  
                </div>
                <div>
                    <label htmlFor="mobileNumber">Mobile Number</label>
                    <input placeholder="Enter your mobile number here"
                     id="mobileNumber"
                     value={mobileNumber}
                    onChange= {(e) => setMobileNumber(e.target.value)}
                    required>
                    </input>  
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <input placeholder="Enter your city here"
                     id="City"
                     value={city}
                    onChange= {(e) => setCity(e.target.value)}
                    required>
                    </input>  
                </div>
                <div>
                    <label htmlFor="pincode">Pin Code</label>
                    <input placeholder="Pin Code"
                     id="city"
                     value={pincode}
                    onChange= {(e) => setPincode(e.target.value)}
                    required>
                    </input>  
                </div>
                <div>
                    <label htmlFor="state">State</label>
                    <input placeholder="Enter your state here"
                     id="state"
                     value={state}
                    onChange= {(e) => setState(e.target.value)}
                    required>
                    </input>  
                </div>
                <div>
                    <label/>
                    <button className="primary" type="submit">Continue</button>
                </div>
            </form>
        </div>
    )
}

export default ShippingAddress

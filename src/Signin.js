import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Signin.css';
import Header from './Header'
import { signin } from './actions/userActions';

export default function Signin(props) {
    const [email, setEmail] = useState('');
    const [password , setPassword] =useState('');

    const dispatch = useDispatch();
    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(signin(email, password))
    }

    const userSignin = useSelector(state => state.userSignin)
    const {userInfo} = userSignin;

    const redierect = props.location.search ?
    props.location.search.split('=')[1]:'/';

    useEffect(() => {
        if(userInfo){
            props.history.push(redierect)
        }
    }, [userInfo, props.history, redierect]);

    return (
        <div>
            <Header/>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Sign In</h1>
                </div>
                <div>
                    <label >Email address</label>
                    <input type="email" id="email"
                        placeholder="enter email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label >Password</label>
                    <input type="password"
                        id="password"
                        placeholder="enter password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label />
                    <button className="primary"
                        type="submit"
                        onClick={submitHandler}
                        >Sign In</button>
                </div>
                <div>
                    <label />
                    <div>
                        New customer? {''}
                        <Link to="/signup" >Create your account</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

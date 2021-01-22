import React, {useState, useEffect} from 'react';
import './Signin.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from './actions/userActions';



function Signup(props) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const submitHandler = (e)=> {
        e.preventDefault();
        if(password !== confirmPassword){
            alert("passwords don't match");
        }else{
            dispatch(signup(name, email, password))
        }
        
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
        <div className="signup">
            <div className="signup__header">
                <h1>GoGet</h1>
            </div>
            <div className="form">
            <form className="form" onSubmit={submitHandler}>
                <div>
                
                </div>
                <div>
                    <label >Name</label>
                    <input type="text" id="name"
                        placeholder="enter name"
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
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
                    <label >Confirm Password</label>
                    <input type="password"
                        id="confirmPassword"
                        placeholder="confirm password"
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label />
                    <button className="primary"
                        type="submit"
                        >Sign Up</button>
                </div>
                <div>
                    <label />
                    <div>
                        Already have an account? {''}
                        <Link to="/signin" >login</Link>
                    </div>
                </div>
            </form>
            </div>

        </div>
    )
}

export default Signup

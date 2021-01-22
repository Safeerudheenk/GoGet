import React, {useEffect, useState} from 'react';
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux'
import { detailsUser, updateUserProfile } from './actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from './constants/userConstants';
import './Profile.css';
import {Link} from 'react-router-dom';

function Profile() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const {success : successUpdate, loading : loadingUpdate, error: errorUpdate} = userUpdateProfile;
    const userDetails = useSelector(state => state.userDetails);
    const {loading, error, user} = userDetails;
    useEffect(() => {
        if(!user){
            dispatch({type:USER_UPDATE_PROFILE_RESET})
            dispatch(detailsUser(userInfo._id));
        }else{
            setName(user.name);
            setEmail(user.email);
        }
    }, [dispatch, userInfo._id]);
    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            alert("Passwords don't match")
        }else{
            dispatch(updateUserProfile({userId:user._id, name, email, password}))
        }
    }
    return loading ? <div>Loading</div> :
    error ? <div>{error}</div> :(
        <div>
            <Header/>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>User Profile</h1>
                </div>
                <>
                {loadingUpdate && <div className="loading__status" >loading</div>}
                {errorUpdate && <div className="error__status" >{errorUpdate}</div>}
                {successUpdate && <div className="success__status" >profile updated successfully</div>}
                <div>
                    <label htmlFor="name" >Name</label>
                    <input
                    id="name"
                    type="text"
                    placeholder="Enter your name here"
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                    >
                    </input>
                </div>
                <div>
                    <label htmlFor="email" >Email</label>
                    <input
                    id="email"
                    type="email"
                    placeholder="Enter your email here"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    >
                    </input>
                </div>

                <div>
                    <label htmlFor="password" >Password</label>
                    <input
                    id="password"
                    type="password"
                    placeholder="Enter your password here"
                    onChange={(e) => setPassword(e.target.value)}
                    >
                    </input>
                </div>

                <div>
                    <label htmlFor="confirmPassword" >Confirm password</label>
                    <input
                    id="confirmPassword"
                    type="password"
                    placeholder="confirm the password you entered above"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </input>
                </div>
                <div>
                    <label/>
                    <button type="submit">Update</button>
                </div>
                <Link to="/">
                <div>
                    <label/>
                    <p className="shopping__text" >Go Shopping</p>
                </div>
                </Link>
                </>
            </form>
        </div>
    )
}

export default Profile

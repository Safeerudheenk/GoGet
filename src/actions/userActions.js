import axios from "axios";
import { USER_SIGNIN_FAIL,USER_SIGNUP_FAIL,USER_DETAILS_REQUEST, USER_DETAILS_FAIL, USER_DETAILS_SUCCESS, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL } from "../constants/userConstants"


export const signin = (email, password) => async (dispatch) => {
    dispatch({type:USER_SIGNIN_REQUEST, payload:{email, password}});
    try {
        const {data} = await axios.post('api/users/signin', {email, password});
        dispatch({type: USER_SIGNIN_SUCCESS, payload:data});
        localStorage.setItem('userInfo', JSON.stringify(data))
    }catch (error) {
        dispatch({type:USER_SIGNIN_FAIL,
            payload:
            error.response && error.response.data.message ?
            error.response.data.message
            :error.message
        })
    }
}

export const signout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    dispatch({ type: USER_SIGNOUT})
}

export const signup = (name, email, password) => async (dispatch) => {
    dispatch({type:USER_SIGNUP_REQUEST, payload:{name,email, password}});
    try {
        const {data} = await axios.post('api/users/signup', {name,email, password});
        dispatch({type: USER_SIGNUP_SUCCESS, payload:data});
        dispatch({type: USER_SIGNIN_SUCCESS, payload:data});
        localStorage.setItem('userInfo', JSON.stringify(data))
    }catch (error) {
        dispatch({type:USER_SIGNUP_FAIL,
            payload:
            error.response && error.response.data.message ?
            error.response.data.message
            :error.message
        });
    }
}

export const detailsUser = (userId) =>async (dispatch, getState) => {
    dispatch({type:USER_DETAILS_REQUEST, payload:userId});
    try {
        const {data} =await axios.get(`/api/users/${userId}`);
        dispatch({type:USER_DETAILS_SUCCESS, payload:data})
    }catch(error){
        dispatch({type:USER_DETAILS_FAIL,
            payload:
            error.response && error.response.data.message ?
            error.response.data.message
            :error.message
        });
    }
}

export const updateUserProfile = (user) => async(dispatch) => {
    dispatch({type:USER_UPDATE_PROFILE_REQUEST, payload:user});
    try{
        const {data} = await axios.put(`/api/users/profile`, user);
        dispatch({type:USER_UPDATE_PROFILE_SUCCESS, payload:data});
        dispatch({type:USER_SIGNIN_SUCCESS, payload:data});
        localStorage.setItem('userInfo', JSON.stringify(data));
    }catch(error){
        dispatch({type:USER_UPDATE_PROFILE_FAIL,
            payload:
            error.response && error.response.data.message ?
            error.response.data.message
            :error.message
        });
    }
}
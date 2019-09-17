import Axios from "axios";
import * as jwt from 'jwt-decode';
import { LOGGED_USER, LOGIN_ERROR, LOGOUT_USER } from "../actionTypes/loginActionTypes";

/* @Author [Matei Lazar] */

export const loginActionCreator = (username,password, redirectOnSucces) => {
    return dispatch => {
        return Axios
        .post("http://localhost:8080/login",
        {
        username: username,
        password: password
        }).then(res => {
            const token = res.data;
            localStorage.setItem('token',token);
            dispatch(storeUserSuccessful(jwt(token)));
            dispatch(loginError(false));
            redirectOnSucces();
        })
        .catch((err) => dispatch(loginError(true)));
    }
}

export const logoutActionCreator = () => {
    return dispatch => {
        dispatch(deleteUserSuccessful());
        localStorage.removeItem('token');
    }
}

export const storeUserSuccessful = (user) => {
    
    localStorage.setItem('user',user.id);
    return {
        type: LOGGED_USER,
        user: user
    }
}

export const deleteUserSuccessful = () => {
    localStorage.removeItem('user');
    return {
        type: LOGOUT_USER,
        user: ""
    }
}
 
export const loginError = (loginError) => {
    return {
        type:LOGIN_ERROR,
        loginError: loginError
    }
}

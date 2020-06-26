import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = authData => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
}

export const authenticate = authData => {
    debugger;
    return dispatch => {
        dispatch(authStart());
        axios.get(`/authenticate`, authData)
        .then( response => {
           console.log(response);
           //dispatch(registrationSuccess());
           const localStorage = window.localStorage;
           localStorage.setItem('username', authData.username);
        })
        .catch( error => {
            console.log(error);
            dispatch(authFail(error));
        });

    }
}


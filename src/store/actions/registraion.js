import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const registrationStart = () => {
    return {
        type: actionTypes.REGISTRATION_START
    }
}

export const registrationSuccess = authData => {
    return {
        type: actionTypes.REGISTRATION_SUCCESS,
        authData
    }
}

export const registrationFail = error => {
    return {
        type: actionTypes.REGISTRATION_FAIL,
        error
    }
}

export const register = (userData) => {
    debugger;
    return dispatch => {
        dispatch(registrationStart());
        axios.post(`/register`, userData)
        .then( response => {
           console.log(response);
           //dispatch(registrationSuccess());
           const localStorage = window.localStorage;
           localStorage.setItem('username', userData.username);
        })
        .catch( error => {
            console.log(error);
            dispatch(registrationFail(error));
        });
        
    }
}


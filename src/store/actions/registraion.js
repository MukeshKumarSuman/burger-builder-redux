import * as actionTypes from './actionTypes';
import axios from '../../axios-order';
import * as actionCreator from './auth';

export const registrationStart = () => {
    return {
        type: actionTypes.REGISTRATION_START
    }
}

export const registrationSuccess = () => {
    return {
        type: actionTypes.REGISTRATION_SUCCESS
    }
}

export const registrationFail = error => {
    return {
        type: actionTypes.REGISTRATION_FAIL,
        error
    }
}

export const setRegistrationRedirectPath = path => {
    return {
        type: actionTypes.SET_REGISTRATION_REDIRECT_PATH,
        path
    }
}

export const register = (userData) => {
    debugger;
    return dispatch => {
        dispatch(registrationStart());
        axios.post(`/register`, userData)
        .then( response => {
           actionCreator.processServerResponse(response.data, dispatch);
           dispatch(registrationSuccess());
        })
        .catch( error => {
            dispatch(registrationFail(error));
        });
        
    }
}


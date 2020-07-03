import * as actionTypes from './actionTypes';
import axios from '../../axios-order';
import * as Constants from '../../constants/constants';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = userData => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        ...userData
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
}

export const authenticate = authData => {
    return dispatch => {
        dispatch(authStart());
        axios.post(`/authenticate`, authData)
        .then( response => {
            processServerResponse(response.data, dispatch);
        })
        .catch( error => {
            dispatch(authFail(error));
        });
    }
}

export const processServerResponse = (rspData, dispatch) => {
    const username = rspData.username;
    const userData = {
        username,
        customer: rspData
    }
    const currentDate = new Date();
    const expirationdate =  new Date(currentDate.getTime() + Constants.EXPIRATION_DURATION);
    localStorage.setItem(Constants.USERNAME, username);
    localStorage.setItem(Constants.EXPIRATION_DATE, expirationdate);
    dispatch(authSuccess(userData));
    dispatch(checkAuthTimeout(Constants.EXPIRATION_DURATION)); // 1h = 3600,000 ms
}

export const logout = () => {
    localStorage.removeItem(Constants.USERNAME);
    localStorage.removeItem(Constants.EXPIRATION_DATE);
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = expiriationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expiriationTime);
    }
}

export const setAuthRedirectPath = path => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const username = localStorage.getItem(Constants.USERNAME);
        if (!username) {
            console.log('logout called');
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem(Constants.EXPIRATION_DATE));
            if (expirationDate < new Date()) {
                dispatch(logout());
            } else {
                const newExpirationTime = expirationDate.getTime() - new Date().getTime();
                dispatch(authSuccess({username}));
                dispatch(checkAuthTimeout(newExpirationTime));
            }
        }
    }
}



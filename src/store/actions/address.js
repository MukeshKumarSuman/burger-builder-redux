import * as actionTypes from './actionTypes';
import axios from '../../axios-order';
//import * as Constants from '../../constants/constants';

export const fetchAddressStart = () => {
    return {
        type: actionTypes.FETCH_ADDRESS_START
    }
}

export const fetchAddressSuccess = address => {
    return {
        type: actionTypes.FETCH_ADDRESS_SUCCESS,
        address
    }
}

export const fetchAddressFail = error => {
    return {
        type: actionTypes.FETCH_ADDRESS_FAIL,
        error
    }
}


export const getAddress = username => {
    return dispatch => {
        dispatch(fetchAddressStart());
        axios.get(`/users/${username}/address`)
        .then( response => {
            dispatch(fetchAddressSuccess(response.data));
        })
        .catch( error => {
            dispatch(fetchAddressFail(error));
        });
    }
}
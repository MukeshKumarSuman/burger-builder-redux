import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const purchaseBurgerSuccess = (orderId, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId,
        orderData
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}


export const purchaseBurgerFail = error => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error
    }
}

export const purchaseBurger = (username, order) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post(`/users/${username}/order`, order)
        .then( response => {
           console.log(response);
           dispatch(purchaseBurgerSuccess(order));
        })
        .catch( error => {
            console.log(error);
            dispatch(purchaseBurgerFail(error));
        });
    }
}

export const deleteOrder = (orderId, username = 'mukesh') => {
    return dispatch => {
        axios.delete(`/users/${username}/orders/${orderId}`)
        .then( response => {
           console.log(response);
        })
        .catch( error => {
            console.log(error);
            dispatch(purchaseBurgerFail(error));
        });
    }
}


/*
export const purchaseBurger = (username, orderId, order) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.put(`/users/${username}/orders/${orderId}`, order)
        .then( response => {
           console.log(response);
           dispatch(purchaseBurgerSuccess(orderId, order));
        })
        .catch( error => {
            console.log(error);
            dispatch(purchaseBurgerFail(error));
        });
    }
}
*/
export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error
    }
}

export const fetchOrders = (username) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get(`users/${username}/orders`).then( resp => {
            dispatch(fetchOrdersSuccess(resp.data));
        }).catch( error => dispatch(fetchOrdersFail(error)));
    }
}


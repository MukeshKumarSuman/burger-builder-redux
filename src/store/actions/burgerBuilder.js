import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const addIngredient = ingredientName => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName
    }
}

export const removeIngredient = ingredientName => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName
    }
}

export const setCustomer =  customer => {
    return {
        type: actionTypes.SET_CUSTOMER,
        customer
    }
}

export const fetchIngredientsFailed =  () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initCustomer = () => {
    return dispatch => {
        axios.get('users/mukesh')
        .then( response => {
            const order = response.data.orders.filter(order => order.status === 'CREATE')[0];
            const customer = {...response.data, order}
            dispatch(setCustomer(customer));
        }).catch( error => {
            dispatch(fetchIngredientsFailed())
        });
    }
}
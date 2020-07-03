import * as actionTypes from './actionTypes';
import axios from '../../axios-order';
import * as Constants from '../../constants/constants';

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

export const setDefaultOrderIngredients =  order => {
    return {
        type: actionTypes.SET_DEFAULT_ORDER_INGREDIENTS,
        order
    }
}

export const fetchDefaultOrderIngredientsFailed =  () => {
    return {
        type: actionTypes.FETCH_DEFAULT_ORDER_INGREDIENTS_FAILED
    }
}

export const initDefaultOrderIngredients = () => {
    return dispatch => {
        axios.get('/order')
        .then( response => {
            dispatch(setDefaultOrderIngredients(response.data));
        }).catch( error => {
            dispatch(fetchDefaultOrderIngredientsFailed())
        });
    }
}

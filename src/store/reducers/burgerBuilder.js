import * as actionTypes from '../actions/actionTypes';

const initialState = {
    order : null,
    error: false,
    building: false
}

const INGREDIENT_PRICES = {
    salad: 10,
    meat: 10,
    cheese: 10,
    bacon: 10
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                order: {
                    ...state.order,
                    ingredients: {
                        ...state.order.ingredients,
                        [action.ingredientName]: state.order.ingredients[action.ingredientName] + 1
                    },
                    price: state.order.price + INGREDIENT_PRICES[action.ingredientName]
                },
                building: true
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                order: {
                    ...state.order,
                    ingredients: {
                        ...state.order.ingredients,
                        [action.ingredientName]: state.order.ingredients[action.ingredientName] - 1
                    },
                    price: state.order.price - INGREDIENT_PRICES[action.ingredientName]
                },
                building: true
            }
        case actionTypes.SET_DEFAULT_ORDER_INGREDIENTS:
            return {
                ...state,
                order: action.order,
                error: false,
                building: false
            }
        case actionTypes.FETCH_DEFAULT_ORDER_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}
export default reducer;
/*
const initialState = {
    customer : {
        "id": '',
        "username": "",
        "name": {
            "firstName": "",
            "middleName": "",
            "lastName": ""
        },
        "address": {
            "addressLine1": "",
            "addressLine2": "",
            "city": "",
            "state": "",
            "country": "",
            "zipCode": ""
        },
        "order": {
            "id": '',
            "price": 0,
            "deliveryMethod": "",
            "ingredients": {
                "id": '',
                "salad": 0,
                "bacon": 0,
                "cheese": 0,
                "meat": 0
            }
        }
    }
}
*/
import * as actionTypes from '../actions/actionTypes';


const initialState = {
    customer : null,
    error: false
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
                customer: {
                    ...state.customer,
                    order: {
                        ...state.customer.order,
                        ingredients: {
                            ...state.customer.order.ingredients,
                            [action.ingredientName]: state.customer.order.ingredients[action.ingredientName] + 1
                        },
                        price: state.customer.order.price + INGREDIENT_PRICES[action.ingredientName]
                    }
                }
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                customer: {
                    ...state.customer,
                    order: {
                        ...state.customer.order,
                        ingredients: {
                            ...state.customer.order.ingredients,
                            [action.ingredientName]: state.customer.order.ingredients[action.ingredientName] - 1
                        },
                        price: state.customer.order.price - INGREDIENT_PRICES[action.ingredientName]
                    }
                }
            }
        case actionTypes.SET_CUSTOMER:
            return {
                ...state,
                customer: action.customer,
                error: false
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
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
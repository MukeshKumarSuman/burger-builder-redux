import * as actionTypes from '../actions/actionTypes';

const initialState = {
    username: null,
    error: null,
    loading: null,
    authRedirectPath: "/",
    customer: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true,
                error: null
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                username: action.username,
                loading: false,
                error: null,
                customer: action.customer
            }
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case  actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                username: null
            }
        case  actionTypes.SET_AUTH_REDIRECT_PATH:
            return {
                ...state,
                authRedirectPath: action.path
            }
        default:
            return state;
    }
}
export default reducer;
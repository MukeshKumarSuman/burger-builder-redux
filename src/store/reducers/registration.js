import * as actionTypes from '../actions/actionTypes';

const initialState = {
    error: null,
    loading: null,
    registrationRedirectPath: "/"
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REGISTRATION_START:
            return {
                ...state,
                loading: true,
                error: null
            }
        case actionTypes.REGISTRATION_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            }
        case actionTypes.REGISTRATION_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case  actionTypes.SET_REGISTRATION_REDIRECT_PATH:
            return {
                ...state,
                registrationRedirectPath: action.path
            }
        default:
            return state;
    }
}
export default reducer;
import * as actionTypes from '../actions/actionTypes';

const intitialState = {
    address: [],
    loading: false,
    error: null
}

const reducer = (state = intitialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ADDRESS_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: false,
                address: action.address
            }
        case actionTypes.FETCH_ADDRESS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state;
    }
}
export default reducer;
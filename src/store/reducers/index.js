import { combineReducers } from 'redux';
import burgerBuilderReducer from './burgerBuilder';
import orderReducer from './order';
import authReducer from './auth';
import registrationReducer from './registration';
import addressReducer from './address';

const reducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer,
    auth: authReducer,
    registration: registrationReducer,
    address: addressReducer
});
export default reducer;
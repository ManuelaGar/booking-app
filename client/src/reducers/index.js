import { combineReducers } from 'redux'
import { authReducer } from './auth.js'

const rootReducer = combineReducers({
    user: authReducer,
});

export default rootReducer;
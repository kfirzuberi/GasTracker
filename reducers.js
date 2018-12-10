import { combineReducers } from 'redux';
import  {globalReducer, authReducer}  from './duck/reducers'

const rootReducer = combineReducers({
  global: globalReducer,
  auth: authReducer
});

export default rootReducer;
import { combineReducers } from 'redux';
import  {globalReducer, authReducer, settingsReducer}  from './duck/reducers'
console.log(settingsReducer)
const rootReducer = combineReducers({
  global: globalReducer,
  auth: authReducer,
  settings : settingsReducer
});

export default rootReducer;
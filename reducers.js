import { combineReducers } from 'redux';
import  globalReducer  from './duck/reducers'

const rootReducer = combineReducers({
  global: globalReducer
});

export default rootReducer;
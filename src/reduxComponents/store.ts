import { createStore, combineReducers } from 'redux';
import { rootReducer } from './reducers/combineReducers';
import { composeWithDevTools } from 'redux-devtools-extension';


export const store = createStore(rootReducer, composeWithDevTools());
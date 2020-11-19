import { createStore, combineReducers } from 'redux';
import { rootReducer } from './reducers/combineReducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import {reducer} from './reducers/reducer'


export const store = createStore(reducer, composeWithDevTools());
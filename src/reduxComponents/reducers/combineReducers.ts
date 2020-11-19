import { combineReducers } from "redux";
import {reducer} from './reducer';

export const rootReducer = combineReducers({
  generalReducer: reducer
})


// giving type of reducer globally
export type RootState = ReturnType<typeof rootReducer>;

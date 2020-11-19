import { combineReducers } from "redux";
import {reducer} from './reducer';

export const rootReducer = combineReducers({
  generalReducer: reducer
})

export type RootState = ReturnType<typeof rootReducer>;

// import { types } from "@babel/core";
import * as types from '../constants/actionTypes'



const initialState = {
  // describe: ""
  // state bois goes here
  // 
  counter : 0
};

export const reducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case types.INCREMENT_COUNTER:
      console.log('working in reducer')
      return{
        ...state,
        counter: action.payload
      }






    default: 
      return state;

  }
}
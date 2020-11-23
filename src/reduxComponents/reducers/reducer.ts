// import { types } from "@babel/core";
import * as types from '../constants/actionTypes'



const initialState = {
  // describe: ""
  // state bois goes here
  // 
  counter : 0,
  fileTree: [],
  fileToView: '',
  keyOfExpect: 0,
  allData: {0:{firstInput0: 'type', testTypes:"equal", lastInput0: ''}}
};

export const reducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case types.INCREMENT_COUNTER:
      return{
        ...state,
        counter: action.payload
      };

    case types.CONSTRUCT_FILETREE:
      return {
        ...state,
        fileTree: action.payload
      };

    case types.SET_FILE_VIEW:
      return{
        ...state,
        fileToView: action.payload
      }

    case types.UPDATE_KEY:
      return{
        ...state,
        keyOfExpect: state.keyOfExpect+1
      }

    
    case types.UPDATE_DATA:
      return{
        ...state,
        allData: action.payload
      }





    default: 
      return state;

  }
}
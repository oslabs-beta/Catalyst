// import { types } from "@babel/core";
import * as types from '../constants/actionTypes'



const initialState = {
  // describe: ""
  // state bois goes here
  // 
  counter : 0,
  fileTree: [],
  fileToView: '',
  keyOfExpect: 1
};

export const reducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case types.INCREMENT_COUNTER:
      console.log('working in reducer')
      return{
        ...state,
        counter: action.payload
      };

    case types.CONSTRUCT_FILETREE:
      console.log('about to construct file');
      console.log('in reducer with directory imported', action.payload);
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






    default: 
      return state;

  }
}
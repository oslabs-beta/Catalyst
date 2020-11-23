// import { types } from "@babel/core";
import * as types from '../constants/actionTypes'



const initialState = {

  fileTree: [],
  fileToView: '',
  toggleFolder: {},
  keyOfExpect: 0,
  itStatements: {}
};

export const reducer = (state: any = initialState, action: any) => {
  switch (action.type) {

    case types.CONSTRUCT_FILETREE:
      // console.log('about to construct file');
      // console.log('in reducer with directory imported', action.payload);
      return {
        ...state,
        fileTree: action.payload
      };

    case types.SET_FILE_VIEW:
      return{
        ...state,
        fileToView: action.payload
      }

    
    case types.TOGGLE_FOLDER:
      // creating an object that will hold the file path of each directory and will toggle from T to F
      // important as we can now keep track of whether that specifc directory/filepath has been clicked or not
      const toggleFolder = {...state.toggleFolder};
      toggleFolder[action.payload] = !toggleFolder[action.payload];
      return {
        ...state,
        toggleFolder
      }


    case types.UPDATE_KEY:
      return{
        ...state,
        keyOfExpect: state.keyOfExpect+1
      }

    case types.ADD_IT_STATEMENTS: 
      console.log('we are in the reducer and this is the state.keyofexpect', state.keyOfExpect);
      console.log('this is the action.payload, should be an array:', action.payload);

      const itStatements = [...state.itStatements, action.payload];
      console.log('this is the itStatements in reducer', itStatements);

      return {
        ...state, 
        itStatements: itStatements,
        keyOfExpect: state.keyOfExpect + 1
      };



    default: 
      return state;

  }
}
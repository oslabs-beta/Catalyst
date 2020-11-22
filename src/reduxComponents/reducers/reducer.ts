// import { types } from "@babel/core";
import * as types from '../constants/actionTypes'



const initialState = {

  fileTree: [],
  fileToView: '',
  toggleFolder: {},
};

export const reducer = (state: any = initialState, action: any) => {
  switch (action.type) {

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

    
    case types.TOGGLE_FOLDER:
      // creating an object that will hold the file path of each directory and will toggle from T to F
      // important as we can now keep track of whether that specifc directory/filepath has been clicked or not
      const toggleFolder = {...state.toggleFolder};
      toggleFolder[action.payload] = !toggleFolder[action.payload];

      return {
        ...state,
        toggleFolder
      }



    default: 
      return state;

  }
}
// import { types } from "@babel/core";
import * as types from '../constants/actionTypes'



const initialState = {
<<<<<<< HEAD
  // describe: ""
  // state bois goes here
  // 
  counter : 0,
  isFolderOpen: {}
=======

>>>>>>> master
  fileTree: [],
  fileToView: '',
  keyOfExpect: 0,
  toggleFolder: {},
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

    case types.TOGGLE_FOLDER_COLLAPSE:
      const isFolderOpen = { ...state.isFolderOpen };
      isFolderOpen[action.filePath] = !isFolderOpen[action.filePath];
      return {
        ...state,
        isFolderOpen,
      };
    case types.SET_FILE_VIEW:
      return{
        ...state,
        fileToView: action.payload
      }

<<<<<<< HEAD
    case types.HIGHLIGHT_FILE:
      const isFileHighlighted = action.fileName;
      const fileName = action.fileName;
      return {
        ...state,
        isFileHighlighted,
        fileName,
      };
=======
    
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
        keyOfExpect: state.keyOfExpect + 1
      }

    
    case types.UPDATE_DATA:
      return{
        ...state,
        allData: action.payload
      }

    case types.ADD_IT_STATEMENTS:
      const itStatements = [...state.itStatements, action.payload];
      console.log('this is the itStatements in reducer', itStatements);

      return {
        ...state, 
        itStatements: itStatements,
        keyOfExpect: state.keyOfExpect + 1
      };


>>>>>>> master

    default: 
      return state;

  }
}
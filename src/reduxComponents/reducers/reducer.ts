// import { types } from "@babel/core";
import * as types from '../constants/actionTypes'



const initialState = {
  // describe: ""
  // state bois goes here
  // 
  counter : 0,
  isFolderOpen: {}
  fileTree: [],
  fileToView: ''
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

    case types.HIGHLIGHT_FILE:
      const isFileHighlighted = action.fileName;
      const fileName = action.fileName;
      return {
        ...state,
        isFileHighlighted,
        fileName,
      };

    default: 
      return state;

  }
}
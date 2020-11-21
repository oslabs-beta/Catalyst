import * as types from '../constants/actionTypes';


// interface IncrementAction {
//   type: typeof Increment_COUNTER
// };

// interface DecrementAction {
//   type: typeof DECREMENT_COUNTER
// };

// export type ActionTypes = IncrementAction | DecrementAction
//  */

 
export const SetAge = (incomingAge: any) => ({
    type: types.INCREMENT_COUNTER,
    payload :incomingAge
});


export const ConstructFileTree = (files: any) => ({
    type: types.CONSTRUCT_FILETREE,
    payload: files
});

export const SetFileView = (filePath: any) =>({
    type:types.SET_FILE_VIEW,
    payload: filePath
})
export const toggleFolderCollapse = (filePath: any) => ({
    type: types.TOGGLE_FOLDER_COLLAPSE,
    payload: filePath
  });
  
export const highlightFile = (fileName: string) => ({
    type: types.HIGHLIGHT_FILE,
    payload: fileName
  });
   
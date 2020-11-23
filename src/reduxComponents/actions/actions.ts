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

export const SetFileView = (filePath: any) => ({
    type:types.SET_FILE_VIEW,
    payload: filePath
})

export const UpdateKey = () => ({
    type: types.UPDATE_KEY,
    payload: ''
})

export const UpdateData = (data:any) => ({
    type: types.UPDATE_DATA,
    payload: data
})
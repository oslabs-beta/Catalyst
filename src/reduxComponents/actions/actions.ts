import * as types from '../constants/actionTypes';




export const ConstructFileTree = (files: []) => ({
    type: types.CONSTRUCT_FILETREE,
    payload: files
});

export const SetFileView = (filePath: string) =>({
    type:types.SET_FILE_VIEW,
    payload: filePath
});

export const ToggleFolder = (filePath: string) => ({
    type: types.TOGGLE_FOLDER,
    payload: filePath
});
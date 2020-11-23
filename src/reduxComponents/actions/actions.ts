import * as types from '../constants/actionTypes';




export const ConstructFileTree = (files: []) => ({
    type: types.CONSTRUCT_FILETREE,
    payload: files
});

export const SetFileView = (filePath: any) => ({
    type:types.SET_FILE_VIEW,
    payload: filePath
});

export const ToggleFolder = (filePath: string) => ({
    type: types.TOGGLE_FOLDER,
    payload: filePath
});

export const UpdateKey = () => ({
    type: types.UPDATE_KEY,
    payload: ''
})

export const UpdateData = (data:any) => ({
    type: types.UPDATE_DATA,
    payload: data
})

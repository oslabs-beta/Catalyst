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

export const UpdateKeyOfExpect = () => ({
    type: types.UPDATE_KEY_OF_EXPECT,
    payload: ''
});

export const UpdateData = (data:any) => ({
    type: types.UPDATE_DATA,
    payload: data
});

export const UpdateKeyOfDescribe = () => ({
    type: types.UPDATE_KEY_OF_DESCRIBE,
    payload: ''
});

export const UpdateKeyOfIt = () => ({
    type: types.UPDATE_KEY_OF_IT,
    payload: ''
});

export const UpdateItObj = (data:any) =>({
    type: types.UPDATE_IT_OBJ,
    payload: data
});

export const UpdateDescribe = (data:any) =>({
    type: types.UPDATE_DESCRIBE,
    payload: data
});

export const UpdateComponentName = (name:any) =>({
    type: types.UPDATE_COMPONENT_NAME,
    payload: name
});

export const ClearFile = () =>({
    type: types.CLEAR_FILE
});

export const deleteExpect = (data: any) => ({
    type: types.DELETE_EXPECT,
    payload: data
});

export const removeFromIt = (data: any) => ({
    type: types.REMOVE_FROM_IT,
    payload: data
});

export const SetProjectPath = (filePath: string) => ({
    type: types.SET_PROJECT_PATH,
    payload: filePath
});

export const UpdateItStatement = (data: any) => ({
    type: types.UPDATE_IT_STATEMENT, 
    payload: data
});

export const RefreshState = () => ({
    type: types.REFRESH_STATE
});

export const UpdateDescribeBoolean = (data:any) =>({
    type: types.UPDATE_DESCRIBE_BOOLEAN,
    payload: data
});

export const ViewTestCode = (data: string) => ({
    type: types.SHOW_TESTCODE,
    payload: data
});

export const RemoveTestCode = () => ({
    type: types.REMOVE_TESTCODE,
});

// import { types } from "@babel/core";
import * as types from '../constants/actionTypes'



const initialState = {

  fileTree: [],
  fileToView: '',
  keyOfExpect: 0,
  toggleFolder: {},
  expects: {},
  keyOfExpectsObj: 0,
  keyOfDescribe:0,
  describes: {},
  keyOfIt:0,
  its: {},
  keyOfItsObj: 0, 
  arrOfItStatements: [],
  componentName: '',
  componentObj: {}
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


    case types.UPDATE_KEY_OF_EXPECT:
      return{
        ...state,
        keyOfExpect: state.keyOfExpect + 1
      }

      case types.UPDATE_KEY_OF_IT:
      return{
        ...state,
        keyOfIt: state.keyOfIt + 1
      }

    
    case types.UPDATE_DATA:
      return{
        ...state,
        expects: action.payload
      }

    case types.ADD_IT_STATEMENTS:
      const itStatements = [...state.itStatements, action.payload];
      console.log('this is the itStatements in reducer', itStatements);

      return {
        ...state, 
        itStatements: itStatements,
        keyOfExpect: state.keyOfExpect + 1
      };
    
    case types.UPDATE_IT_OBJ:
      return {
        ...state,
        its: action.payload
      }

    case types.UPDATE_KEY_OF_DESCRIBE: 
    return {
      ...state,
      keyOfDescribe: state.keyOfDescribe + 1
    };

    case types.UPDATE_KEY_OF_EXPECTS_OBJ: 
    return {
      ...state, 
      keyOfExpectsObj: state.keyOfExpectsObj + 1
    };

    case types.UPDATE_KEY_OF_ITS_OBJ: 
    return {
      ...state, 
      keyOfItsObj: state.keyOfItsObj + 1
    };

    case types.UPDATE_DESCRIBE:
      return{
        ...state,
        describe: action.payload
      }

      
      case types.UPDATE_COMPONENT_NAME:
        return{
          ...state,
          componentObj: action.payload
        }
        

        default: 
      return state;
    
  }
}
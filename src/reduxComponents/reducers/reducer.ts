import * as types from '../constants/actionTypes';



const initialState = {
  fileTree: [],
  fileToView: '',
  toggleFolder: {},
  filePathOfProject: '',
  generatedTestCode: '',
  
  describes: {},
  its: {},
  expects: {},
  
  keyOfDescribe:0,
  keyOfIt:0,
  keyOfExpect: 0,
  componentObj: {},
  itInputObj: {},

  describePropBoolean:{},
  codeViewer: false,
  codeViewerChecker: true,
};

export const reducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    
    case types.CONSTRUCT_FILETREE:
      return {
        ...state,
        fileTree: action.payload
      };

    case types.SET_FILE_VIEW:
      return {
        ...state,
        codeViewer: true,
        fileToView: action.payload,
        codeViewerChecker: true
      };
    
    case types.TOGGLE_FOLDER:
      // creating an object that will hold the file path of each directory and will toggle from T to F
      // important as we can now keep track of whether that specifc directory/filepath has been clicked or not
      const toggleFolder = {...state.toggleFolder};
      toggleFolder[action.payload] = !toggleFolder[action.payload];
      return {
        ...state,
        toggleFolder
      };


    case types.UPDATE_KEY_OF_EXPECT:
      return {
        ...state,
        keyOfExpect: state.keyOfExpect + 1
      };

      case types.UPDATE_KEY_OF_IT:
      return {
        ...state,
        keyOfIt: state.keyOfIt + 1
      };

    
    case types.UPDATE_DATA:
      return {
        ...state,
        expects: action.payload
      };


    case types.UPDATE_IT_OBJ:
      return {
        ...state,
        its: action.payload
      };

    case types.UPDATE_KEY_OF_DESCRIBE: 
    return {
      ...state,
      keyOfDescribe: state.keyOfDescribe + 1
    };

    case types.UPDATE_DESCRIBE:
      return {
        ...state,
        describes: action.payload
      };

      
    case types.UPDATE_COMPONENT_NAME:
      return {
        ...state,
        componentObj: action.payload
      };
        
    case types.UPDATE_IT_STATEMENT:
          return {
            ...state,
            itInputObj: action.payload
          };


    case types.CLEAR_FILE:
      return {
        ...state,
        codeViewer: false,
        codeViewerChecker: false,
        fileToView: ''
      };

    case types.DELETE_EXPECT:
      let expects = state.expects;
      let id = action.payload.toString();
      delete expects[`${id}`];
      return {
        ...state,
        expects
      };
    
    case types.REMOVE_FROM_IT:
      
      return {
        ...state
      };

    case types.SET_PROJECT_PATH:
    return {
      ...state,
      filePathOfProject: action.payload
    };

    case types.REFRESH_STATE:
      return {
        fileTree: [],
        fileToView: '',
        toggleFolder: {},
        filePathOfProject: '',
        generatedTestCode: '',
        
        describes: {},
        its: {},
        expects: {},
        
        keyOfDescribe:0,
        keyOfIt:0,
        keyOfExpect: 0,
        componentObj: {},
        itInputObj: {},
        describePropBoolean:{},
        codeViewer: false,
        codeViewerChecker: true,
      };
    
    case types.UPDATE_DESCRIBE_BOOLEAN:
      return {
        ...state,
        describePropBoolean: action.payload
      };

    case types.SHOW_TESTCODE:
      return {
        ...state,
        codeViewer: true,
        codeViewerChecker: false,
        generatedTestCode: action.payload,
      };

    case types.REMOVE_TESTCODE:
      return {
        ...state,
        codeViewer: false,
        codeViewerChecker: true,
        generatedTestCode: '',
      };

    default: 
      return state;
    
  };
};

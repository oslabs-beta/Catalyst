import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as electronFs from 'fs';
import { SetFileView, ToggleFolder } from '../reduxComponents/actions/actions';
import FILE_ICONS from '../icons/icons'; 



export const FileTree: React.FC = () => {
  const dispatch = useDispatch();
  // obtains the filetree from the store
  const fileTree = useSelector((state: any) => state.fileTree);
  // obtains the folder status from the store
  const isOpen = useSelector((state:any) => state.toggleFolder);
  // dispatches an action to set the file that will be viewed
  const setFileInRedux = (checker:any) => dispatch(SetFileView(checker));
   // dispatches an action to set the folder to open or not
  const toggleFolder = (filePath: string) => dispatch(ToggleFolder(filePath));

  // onclick function to set invoke the function to dispatch an action
  function setFileView(event:any){
    // file path is saved as the id of the button
    setFileInRedux(event.target.id);
  };

  // func will strip extension ending from files which will be used as the key for the imported object that holds images for 
  // those specific file icons
  const extensionGrabber = (ext:string) => {
    if (ext.split('.')[1] === undefined) {
      return 'folder';
    }
    if (ext.split('.')[ext.split('.').length - 1].includes('babel')) {
      return 'babel';
    }
    return ext.split('.')[ext.split('.').length - 1];
  };

  // sending filepath to reducer to keep track of which folder is clicked on. if set to a global state then it will 
  // toggle true and false on each click of the directory
  const handleToggle = (filePath:string) => {
    toggleFolder(filePath);
  }

  const traverseFileTree = (files: []) => {
    return (
      <ul className = "FileTree" > 
        {files.map((file: any, id: number) => {

          const extension = extensionGrabber(file.name);
          const checker = electronFs.statSync(file.filepath);

          if(checker.isDirectory()){

            return (
              <li key={id}>
                <span className='directory' key={id} onClick={() => handleToggle(file.filepath)}><span>{FILE_ICONS[extension]}</span>{file.name}</span>
                  {isOpen[file.filepath] && traverseFileTree(file.children)}
              </li>
            )
          }

          else{
            return (
              <li key={id}>
                <a onClick ={setFileView} id = {file.filepath} key={id}><span id='icon'>{FILE_ICONS[extension]}</span>{file.name}</a>
                  {file.children.length > 0 && traverseFileTree(file.children)}
              </li>
            )
          }
          
        })}

      </ul>
      
    )
  };

  return (
    fileTree ? traverseFileTree(fileTree) : <React.Fragment></React.Fragment>
  )

};




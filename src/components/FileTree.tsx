import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import * as electronFs from 'fs';
import { SetFileView } from '../reduxComponents/actions/actions';

export const FileTree: React.FC = () => {
  const dispatch = useDispatch()
  // obtains the filetree from the store
  const fileTree = useSelector((state:any) => state.fileTree)
  // dispatches an action to set the file that will be viewed
  const setFileInRedux = (checker:any) => dispatch(SetFileView(checker))

  // onclick function to set invoke the function to dispatch an action
  function setFileView(event:any){
    // file path is saved as the id of the button
    setFileInRedux(event.target.id)
  }

  const traverseFileTree = (files: any) => {
    return (
      <ul className = "FileTree"> 
        {files.map((file: any, id: any) => {

          let checker = electronFs.statSync(file.filepath)
          if(checker.isDirectory()){
            return (
              <li key={id}>
                <span key={id}>{file.name}</span>
                  {file.children.length > 0 && traverseFileTree(file.children)}
              </li>
            )
          }

          else{
            return (
              <li key={id}>
                <a onClick ={setFileView} id = {file.filepath} key={id}>{file.name}</a>
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
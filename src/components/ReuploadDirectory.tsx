import React from 'react';
import {remote} from 'electron';
import { useDispatch} from 'react-redux';
import {FileTree} from './FolderUpload'
import { ConstructFileTree, SetProjectPath, RefreshState } from '../reduxComponents/actions/actions';




export const ReuploadDirectory:React.FC = () => {

  const dispatch = useDispatch();
  // creates dispatch that will send file path as an action payload to reducer
  const constructFileTree = (files: any) => dispatch(ConstructFileTree(files));
  const setFilePath = (filePath: any) => dispatch(SetProjectPath(filePath));
  const refreshState = () => dispatch(RefreshState());



  const dialog = remote.dialog
  async function uploadFolder(){
      // allows users to upload a folder 
      const Project = await dialog.showOpenDialog(
          // sets opendirectory (allows directories to be selected) to be the feature that dialog uses
          {properties: ['openDirectory'],
          // the types of files that will be displayed or selected 
          filters: [
              { name: 'Javascript Files', extensions: ['js', 'jsx']},
              { name: 'Typescript Files', extensions: ['ts', 'tsx']},
              { name: 'HTML Files', extensions: ['html']}
          ],
          message: 'Choose a Project to Create Tests for:'
      })

      // if the user cancels the action then undefined will be returned
      // if the user successfully completes the action then a string array will be returned
       // Project is an object that holds canceled (boolean to check if it was cancelled) and filePaths (array of filepaths)
      if(Project && !Project.canceled){
          // holds the directory of the project that was selected 
          let projectDirectory = Project.filePaths[0];

          // use regex to find all \ in the case of a windows user and replace with /
          projectDirectory = projectDirectory.replace(/\\/g, '/');
          
          // will create a new FileTree object for the root directory
          const rootTree = new FileTree(projectDirectory, "root");

          // will return an array of FileTree objects along with any children associated with it 
          const fileTree = rootTree.createTree(projectDirectory);

          // dispatch call to refresh state
          refreshState();
          // dispatches fileTree to reducer
          constructFileTree(fileTree);
          // setting file path of project to access later by sending projectDirectory to store
          setFilePath(projectDirectory);
          
      }
  }


  return (
    <div className="reuploadparent">
      <button className="generatetests" onClick={uploadFolder}>Choose New Project</button>
    </div>
  )
}
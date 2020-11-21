import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { toggleFolderCollapse, highlightFile } from '../reduxComponents/actions/actions'


export const FileTree: React.FC = () => {

  const fileTree = useSelector((state:any) => state.fileTree)
  const dispatch = useDispatch();

  const handleToggleFolderClick = (filePath: any) => {
    dispatch(toggleFolderCollapse(filePath));
  };

  const handleHighlightFileClick = (fileName: string) => {
    dispatch(highlightFile(fileName));
  };

  const traverseFileTree = (files: any) => {
    return (  
        files.map((file: any, id: any) => {
          //to ignore nodemodules and . files
          if (
            file.name !== 'node_modules' &&
            file.name[0] !== '.'
          ){
            if(file.length >= 0){
              return (
                <ul key={file.name}>
                  <li key={id}>
                    <button
                    onClick={() => handleToggleFolderClick(file.filePath)}
                    >{file.name}</button>
                      {file.children.length > 0 && traverseFileTree(file.children)}
                  </li>
                  {file.children.length > 0 && traverseFileTree(file.children)}
                </ul>
              )
            }else{
              return (
                <ul key={file.filePath}>
                  <li key={id}>
                    <button
                    onClick={() => handleHighlightFileClick(file.name)}
                    >{file.name}</button>
                      {file.children.length > 0 && traverseFileTree(file.children)}
                  </li>
                </ul>
              )
            }
          }
        })
    )
  };

  return (
    fileTree ? traverseFileTree(fileTree) : <React.Fragment></React.Fragment>
  )

};
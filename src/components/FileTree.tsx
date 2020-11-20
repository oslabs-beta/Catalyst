import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'


export const FileTree: React.FC = () => {

  const fileTree = useSelector((state:any) => state.fileTree)

  const traverseFileTree = (files: any) => {
    return (
      <ul> 
        {files.map((file: any, id: any) => {
          return (
            <li key={id}>
              <span>{file.name}</span>
                {file.children.length > 0 && traverseFileTree(file.children)}
            </li>
          )
        })}
      </ul>
    )
  };

  return (
    fileTree ? traverseFileTree(fileTree) : <React.Fragment></React.Fragment>
  )

};
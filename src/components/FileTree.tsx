import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { ConstructFileTree } from '../reduxComponents/actions/actions'

export const FileTree: React.FC = () => {
  const fileTree = useSelector((state:any) => state.fileTree)
  if(fileTree && fileTree.length !== 0){
    let fileTreeComp = fileTree.map((el: any, id: any) => {
      return(<div id={id}>{el.name}</div>);
    });
    return(<div>{fileTreeComp}</div>)
  }
  return(<div></div>);
}
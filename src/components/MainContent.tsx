import React from 'react'
import {FileTree} from './FileTree'
import {FileViewer} from './FileViewer'
import {TestBuilder} from './TestBuilder'
import {useSelector, useDispatch} from 'react-redux'

export const MainContent: React.FC = () =>{
  const dispatch = useDispatch()
  const fileTree = useSelector((state: any) => state.fileTree)


  return(
    <div className="row">
      <div className = 'left column'>
        <FileTree />
      </div>
      <div className="middle column">
        <TestBuilder />
      </div>
      <div className="right column">
        <FileViewer />
      </div>
    </div>
  )
}
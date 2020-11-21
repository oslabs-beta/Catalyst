import React from 'react'
import {FileTree} from './FileTree'
import {FileViewer} from './FileViewer'
import {useSelector, useDispatch} from 'react-redux'

export const MainContent: React.FC = () =>{
  const dispatch = useDispatch()
  const fileTree = useSelector((state: any) => state.fileTree)


  return(
    <div style = {{display: 'flex', flexDirection : "row"}}>
      <div className = 'hey'>
        <FileTree />
      </div>
      <div>
        <FileViewer />
      </div>
      

    </div>
  )
}
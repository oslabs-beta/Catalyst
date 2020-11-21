import React from 'react'
import {FileTree} from './FileTree'
import {FileViewer} from './FileViewer'

export const MainContent: React.FC = () =>{


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
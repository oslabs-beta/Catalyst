import React from 'react'
import {FileTree} from './FileTree'
import {FileViewer} from './FileViewer'
import { ItStatement } from './ItStatement'
import {TestBuilder} from './TestBuilder'

export const MainContent: React.FC = () =>{

  return(
    <div style = {{display: 'flex', flexDirection : "row"}}>
      <div className = 'hey'>
        <FileTree />
      </div>
      <div>
        <TestBuilder />
        <ItStatement/>
      </div>
      <div>
        <FileViewer />
      </div>
    </div>
  )
}
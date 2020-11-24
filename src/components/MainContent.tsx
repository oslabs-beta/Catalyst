import React from 'react'
import {FileTree} from './FileTree'
import {FileViewer} from './FileViewer';
import { TestBuilder } from './TestBuilder';
import { TestBlock } from './TestBlock';


export const MainContent: React.FC = () =>{


  return(
    <div style = {{display: 'flex', flexDirection : "row"}}>
      <div className = 'hey'>
        <FileTree />
      </div>
      <div>
        <TestBuilder/>
      </div>
      <div>
        <FileViewer />
      </div>
      <div>
        <TestBlock />
      </div>
    </div>
  )
}
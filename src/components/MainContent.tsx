import React from 'react'
import {FileTree} from './FileTree'
import {CodeViewer} from './CodeViewer';
import { TestBuilder } from './TestBuilder';
import { TestBlock } from './TestBlock';


export const MainContent: React.FC = () =>{
  

  return(
    <div>
      <div className="header">
        <TestBlock/>
      </div>
      <div className="row">
        <div className = 'left column'>
          <h1>PROJECT DIRECTORY</h1>
          <FileTree />
        </div>
        <div className="middle column" id = 'middle'>
          <h1>TEST BUILDER</h1>
          <TestBuilder/>
        </div>
        <div className="right column">
          <h1>CODE VIEWER</h1>
          <CodeViewer />
        </div>
      </div>
    </div>
  )
}
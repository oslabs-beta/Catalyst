import React from 'react'
import ReactDOM from 'react-dom'
import {FileTree} from './FileTree'
import {FileViewer} from './FileViewer';
import { TestBuilder } from './TestBuilder';
import { TestBlock } from './TestBlock';


export const MainContent: React.FC = () =>{
  

  return(
    <div>
      <div>
        <TestBlock />
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
          <h1>FILE VIEWER</h1>
          <FileViewer />
        </div>
      </div>
    </div>
  )
}
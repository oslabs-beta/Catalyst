import React from 'react'
import {FileTree} from './FileTree'
import {FileViewer} from './FileViewer';
import { TestBuilder } from './TestBuilder';
import { TestBlock } from './TestBlock';


export const MainContent: React.FC = () =>{


  return(
    <div className="row">
      <div className = 'left column'>
        <FileTree />
      </div>
      <div className="middle column">
        <TestBuilder/>
      </div>
      <div className="right column">
        <FileViewer />
      </div>
      <div>
        <TestBlock />
      </div>
    </div>
  )
}
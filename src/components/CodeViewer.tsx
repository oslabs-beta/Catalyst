import React from 'react';
import { useSelector } from 'react-redux';
import { ProjectTestCode } from './ProjectTestCode';
import { FileViewer } from './FileViewer';


export const CodeViewer: React.FC = () =>{
  const codeViewer = useSelector((state: any) => state.codeViewer);
  const codeViewerChecker = useSelector((state: any) => state.codeViewerChecker);
  
  return(

    codeViewer === false ? 
    <React.Fragment>
      <div className="emptyfileview">
          <h2 className="emptyfiletitle">No File Displayed</h2>
          <p className="emptyfilebody">Click on Generate Tests or a file in the project directory to view its code</p>
      </div>
    </React.Fragment> :
      codeViewerChecker ? 
      < FileViewer /> : 
      <ProjectTestCode />
  
  )
}
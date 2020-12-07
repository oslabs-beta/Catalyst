import React from 'react';
import { useSelector } from 'react-redux';
import { ProjectTestCode } from './ProjectTestCode';
import { FileViewer } from './FileViewer';


export const CodeViewer: React.FC = () =>{
  const codeViewer = useSelector((state: any) => state.codeViewer);
  const codeViewerChecker = useSelector((state: any) => state.codeViewerChecker);
  
  return(

    codeViewer === false ? 
    <React.Fragment></React.Fragment> :
      codeViewerChecker ? 
      < FileViewer /> : 
      <ProjectTestCode />
  
  )
}
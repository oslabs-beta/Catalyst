import React from 'react';
import {useSelector} from 'react-redux';
import { MainContent } from './components/MainContent';
import {FolderUpload} from './components/FolderUpload';


import './stylesheets/styles';



// interface here and then pass interface prop into React.FC

export const App: React.FC = () => {

  const fileTree = useSelector((state: any) => state.fileTree);

  return(
    fileTree.length ?
    <MainContent />
    :
    <div className="wholePage">
      <FolderUpload />
    </div>

  )
};

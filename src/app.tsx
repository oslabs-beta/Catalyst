import React from 'react';
import { FolderUpload } from './Components/FolderUpload'


// interface here and then pass interface prop into React.FC

export const App: React.FC = () => {
  return (
    <div >
      <h1>
        Hello from Run World
      </h1>
      <FolderUpload />
    </div>
    
  )
};



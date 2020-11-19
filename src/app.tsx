import React from 'react';
import { FolderUpload } from './components/FolderUpload'



// interface here and then pass interface prop into React.FC

export const App: React.FC = () => {
  return (
    <div >
      <h1>
        Hello from Run Planet
      </h1>
      <FolderUpload />
    </div>
    
  )
};



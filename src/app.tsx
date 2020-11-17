import React from 'react';
import ReactDom from 'react-dom';
import {FolderUpload} from './FolderUpload'



const App = () => {
  return (
    <div>
      <h1>
        testing part 2
      </h1>
      <FolderUpload />
    </div>
    
  )
}
ReactDom.render(<App />,document.getElementById('root'));


import React from 'react';
import { useSelector } from 'react-redux';
import { remote } from 'electron';
import * as electronFs from 'fs';
import path from 'path';

const dialog = remote.dialog

export const ExportTestCode: React.FC = () => {
  // get generated TestCode from Global Store
  const generatedTestCode = useSelector((state: any) => state.generatedTestCode);
  // get users project file path from store to aid in exporting generated test code to their machine
  const projectFilePath = useSelector((state:any) => state.filePathOfProject);


  // helper function that will open browser window and default to a __tests__ directory for generated test code placement
  const openDialog = (userFilePath: string, generatedTestCode: string) => {
    // normalizing filePath to work cross-platform
    let filePath = path.normalize(userFilePath + '/__tests__/');
    dialog.showSaveDialog({
      title: 'Please name your Test File',
      defaultPath: filePath, //can add location to save file on users directory
      filters: [
        {
          name: 'Test Files',
          extensions: ['test']
        },
      ],
      message: 'Choose location',
      properties: [
        'createDirectory'
      ]
    }).then(file => {
      // stating whether dialog operation was cancelled or not
      if (!file.canceled) {
        // creating and writing to the generated.test file, adding js extension for enzyme compatibility
        electronFs.writeFile(file.filePath?.toString() + '.js', generatedTestCode, (err) => {
          if (err) {
            console.log(err.message);
          }
          console.log('saved');
        })
      }
    })
    .catch(err => {
      console.log(err);
    }) 
  };

    // determing if directory __tests__ exists already
    const exportTestCode = (userFilePath: string, generatedTestCode:string) => {
      // if __tests__ directory does not exist then create one and write generated test code into that newly created directory
    if (!electronFs.existsSync(userFilePath + '/__tests__')) {
      electronFs.mkdirSync(userFilePath + '/__tests__');
      openDialog(userFilePath, generatedTestCode);
     } 
      // if __tests__ directory does exist then just generate another file into that directory
    else {
      openDialog(userFilePath, generatedTestCode);
      }
    };


  const handleClick = () => {
    exportTestCode(projectFilePath, generatedTestCode);
  };
  
  return(
    <div>
      <button className="generatetests" onClick={handleClick}>Export Test Code</button>
    </div>
  )
}
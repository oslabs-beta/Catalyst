import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {remote} from 'electron';
import * as electronFs from 'fs';
const dialog = remote.dialog


interface Props{

}




export const TestBlock: React.FC = () => {

  const describeGlobal = useSelector((state:any) => state.describes);
  const itsGlobal = useSelector((state:any) => state.its);
  const expectGlobal = useSelector((state:any) => state.expects);
  const describeInputGlobal = useSelector((state:any) => state.componentObj);
  const itInputGlobal = useSelector((state:any) => state.itInputObj);
  const projectFilePath = useSelector((state:any) => state.filePathOfProject);


  


  const handleClick = () => {
    const keysOfDescribe = Object.keys(describeGlobal);




    let finalString  = '';
    for (let i of keysOfDescribe) {
      // console.log(describeInputGlobal)
      finalString += `describe('${describeInputGlobal[i]}', () => { \n`
      // correctly iterating through describe block
      // console.log('describe', i)
      for (let j of Object.keys(describeGlobal[i])){
        finalString += `it('${itInputGlobal[j]}', () => { \n`
        // console.log('it', j)
        // console.log(itsGlobal)
        for(let expect of Object.keys(itsGlobal[j])){
          finalString += `expect(wrapper${expectGlobal[expect][`firstInput${expect}`]}()${expectGlobal[expect].testTypes}(${expectGlobal[expect][`lastInput${expect}`]}))\n`
          // console.log('expect', expect)
          // console.log(expectGlobal[expect])
        }
        finalString +='})\n'
      }
      finalString += '})\n'
    
    }

    if (!electronFs.existsSync(projectFilePath + '/__tests__)')) {
      electronFs.mkdirSync(projectFilePath + '/__tests__')
    }


  dialog.showSaveDialog({
    title: 'Select File Path to save',
    defaultPath: projectFilePath + '/__tests__/', //can add location to save file on users directory
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
    console.log(file.canceled);
    if (!file.canceled) {
      console.log(file.filePath.toString());

      // creating and writing to the text.txt file

      electronFs.writeFile(file.filePath?.toString() + '.js', finalString, (err) => {
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
  }



  return (
    <div>
    
    <button onClick={handleClick}>Create tests</button>

    </div>
  );
};
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {remote} from 'electron';
import * as electronFs from 'fs';
import catalystIcon from '../../assets/catalyst_icons/Catalyst-01.png';
import { ReuploadDirectory } from './ReuploadDirectory';


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


  const fileTree = useSelector((state:any) => state.fileTree)
  
  function findFile(fileTree:any, name: string):string{

    // console.log('inside')
    // console.log(fileTree)
    for(let x of fileTree){
      // console.log(x.filepath)
      let file = electronFs.statSync(x.filepath)
      // console.log(file)
      if(file.isDirectory()){
        let find = findFile(x.children, name)
        if(find !== ''){
          return find
        }
      }
      else{
        // console.log(x.name)
        if(x.name.toLowerCase().includes(name) && !x.name.toLowerCase().includes('_')){
          console.log(x.name)
          return x.filepath
        }
      }
   
    
    }
    return ''
  };

  const openDialog = (userFilePath: string, generatedTestCode: string) => {
    dialog.showSaveDialog({
      title: 'Please name your Test File',
      defaultPath: userFilePath + '/__tests__/', //can add location to save file on users directory
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
        console.log(file.filePath?.toString());
  
        // creating and writing to the text.txt file
  
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
    console.log(userFilePath);
    openDialog(userFilePath, generatedTestCode);
  }
  };




  const handleClick = () => {
    const keysOfDescribe = Object.keys(describeGlobal);

    // console.log(fileTree)
    


    const keysOfIts = Object.keys(itsGlobal);
    const keysOfExpects = Object.keys(expectGlobal);
    const keysOfDescribeInputs = Object.keys(describeInputGlobal);
    const keysOfItInputs = Object.keys(itInputGlobal);

    let testBlock = []; 




    // console.log(describeInputGlobal)
    let finalString  = '';
    finalString += `import React from 'react';\n
    import { configure, shallow } from 'enzyme';\n
    import Adapter from 'enzyme-adapter-react-16';\n
    
    configure({ adapter: new Adapter() });\n
    `

    for(let i of keysOfDescribe){
      let fileLocation = findFile(fileTree, `${describeInputGlobal[i]}`.trim().toLowerCase());
      if(fileLocation !== ''){
        fileLocation = fileLocation.replace('.jsx','');
        finalString += `import ${describeInputGlobal[i]} from \'${fileLocation}\'; \n\n`
      }
    }



    for (let i of keysOfDescribe) {
      finalString += `describe('${describeInputGlobal[i]}', () => { \n let wrapper; \n\n`;
      finalString += `beforeAll(() => { \n wrapper = shallow(<${describeInputGlobal[i]}/>)\n }) \n`;
      
      
      // correctly iterating through describe block
      // console.log('describe', i)
      for (let j of Object.keys(describeGlobal[i])){
        finalString += `\nit('${itInputGlobal[j]}', () => { \n`;
        // console.log('it', j)
        for(let expect of Object.keys(itsGlobal[j])){
          // if(expectGlobal[expect][`firstInput${expect}`] === .find ){
          //  finalString += `expect(wrapper${expectGlobal[expect][`firstInput${expect}`]}()${expectGlobal[expect].testTypes}(${expectGlobal[expect][`lastInput${expect}`]}))\n`
          // }
          if(expectGlobal[expect][`lastInput${expect}`] === 'true' || expectGlobal[expect][`lastInput${expect}`] === 'false'){
            finalString += `expect(wrapper${expectGlobal[expect][`firstInput${expect}`]}())${expectGlobal[expect].testTypes}(${expectGlobal[expect][`lastInput${expect}`]});\n`;
          }
          else{
            finalString += `expect(wrapper${expectGlobal[expect][`firstInput${expect}`]}())${expectGlobal[expect].testTypes}('${expectGlobal[expect][`lastInput${expect}`]}');\n`;
          }
          
          // console.log('expect', expect)
          // console.log(expectGlobal[expect])
        
        
        }
      finalString += '});\n';
    
      }
      finalString += '});\n';
    }
    
  exportTestCode(projectFilePath, finalString);


}



  return (
    <div className="testBlock">
      <img className ="catalysticon" src={catalystIcon}/>
      <ul className="headerlist">
        <li>
          <ReuploadDirectory />
        </li>
        <li>
          <button onClick={handleClick}>Create Tests</button>
        </li>
      </ul>

    </div>
  );
};
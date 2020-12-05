import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Main, remote, shell} from 'electron';
import * as electronFs from 'fs';
import catalystIcon from '../../assets/catalyst_icons/Catalyst-01.png';
import { ReuploadDirectory } from './ReuploadDirectory';


const dialog = remote.dialog

export const TestBlock: React.FC = () => {

  const describeGlobal = useSelector((state:any) => state.describes);
  const itsGlobal = useSelector((state:any) => state.its);
  const expectGlobal = useSelector((state:any) => state.expects);
  const describeInputGlobal = useSelector((state:any) => state.componentObj);
  const itInputGlobal = useSelector((state:any) => state.itInputObj);
  const projectFilePath = useSelector((state:any) => state.filePathOfProject);
  const describePropBoolean = useSelector((state:any) => state.describePropBoolean)



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
    console.log(userFilePath + '/__tests__')
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
    const keysOfDescribe = Object.keys(describeGlobal);

    // console.log(fileTree)
    


    const keysOfIts = Object.keys(itsGlobal);
    const keysOfExpects = Object.keys(expectGlobal);
    const keysOfDescribeInputs = Object.keys(describeInputGlobal);
    const keysOfItInputs = Object.keys(itInputGlobal);

    let testBlock = []; 














    // console.log(describeInputGlobal)
    let finalString  = '';
    finalString += `import React from 'react';\nimport { configure, shallow } from 'enzyme';\nimport Adapter from 'enzyme-adapter-react-16';\nconfigure({ adapter: new Adapter() });\n`

    for(let i of keysOfDescribe){
      let fileLocation = findFile(fileTree, `${describeInputGlobal[i]}`.trim().toLowerCase());
      if(fileLocation !== ''){
        fileLocation = fileLocation.replace('.jsx','');
        finalString += `import ${describeInputGlobal[i]} from \'${fileLocation}\'; \n\n`
      }
    }

    let allProps = document.getElementsByClassName('Prop')
    let counter = 0


    for (let i of keysOfDescribe) {
      finalString += `describe('${describeInputGlobal[i]}', () => { \n let wrapper; \n\n`;
      
      // console.log('counter',counter)
      // console.log('i',i)
      
      if(describePropBoolean[i]){
        finalString += `const props = { \n`
        // console.log(i)
        for(let element of allProps[counter].getElementsByClassName('propChild')){
          finalString += `${element.getElementsByTagName('input')[0].value} : ${element.getElementsByTagName('input')[1].value}, \n`
          // console.log(element.getElementsByTagName('input')[0].value,element.getElementsByTagName('input')[1].value)
        }
        counter+=1
        finalString += `} \n`
        finalString += `beforeAll(() => { \n wrapper = shallow(<${describeInputGlobal[i]} {...props}>)\n }) \n`;
      }
      else{
        finalString += `beforeAll(() => { \n wrapper = shallow(<${describeInputGlobal[i]}>)\n }) \n`;
      }
      
      // console.log('finalString', finalString)
      for (let j of Object.keys(describeGlobal[i])){
        finalString += `\nit('${itInputGlobal[j]}', () => { \n`;
        for(let expect of Object.keys(itsGlobal[j])){
          if(expectGlobal[expect][`firstInput${expect}`] === '.exists'){
            if(expectGlobal[expect][`lastInput${expect}`] === 'true' || expectGlobal[expect][`lastInput${expect}`] === 'false'){
              finalString += `expect(wrapper${expectGlobal[expect][`firstInput${expect}`]}())${expectGlobal[expect].testTypes}(${expectGlobal[expect][`lastInput${expect}`]});\n`;
            }
            else{
              finalString += `expect(wrapper${expectGlobal[expect][`firstInput${expect}`]}())${expectGlobal[expect].testTypes}('${expectGlobal[expect][`lastInput${expect}`]}');\n`;
            }
          }

          else if(expectGlobal[expect][`firstInput${expect}`] === '.type'){
            finalString += `expect(wrapper${expectGlobal[expect][`firstInput${expect}`]}())${expectGlobal[expect].testTypes}('${expectGlobal[expect][`lastInput${expect}`]}');\n`;
          }

          else if(expectGlobal[expect][`firstInput${expect}`] === '.text'){
            finalString += `expect(wrapper${expectGlobal[expect][`firstInput${expect}`]}())${expectGlobal[expect].testTypes}('${expectGlobal[expect][`lastInput${expect}`]}');\n`;
          }

          else if(expectGlobal[expect][`firstInput${expect}`] === '.find'){
            // console.log(expectGlobal[expect][`selector${expect}`])
            if(expectGlobal[expect][`selector${expect}`] === 'nothing'){
              finalString += `expect(wrapper${expectGlobal[expect][`firstInput${expect}`]}('${expectGlobal[expect][`wrapperInput${expect}`]}'))${expectGlobal[expect].testTypes}('${expectGlobal[expect][`lastInput${expect}`]}');\n`;
            }
            else if(expectGlobal[expect][`selector${expect}`] === '.find'){
              finalString += `expect(wrapper${expectGlobal[expect][`firstInput${expect}`]}('${expectGlobal[expect][`wrapperInput${expect}`]}')${expectGlobal[expect][`selector${expect}`]}('${expectGlobal[expect][`selectorInput${expect}`]}'))${expectGlobal[expect].testTypes}('${expectGlobal[expect][`lastInput${expect}`]}');\n`;
            }
            else{
              finalString += `expect(wrapper${expectGlobal[expect][`firstInput${expect}`]}('${expectGlobal[expect][`wrapperInput${expect}`]}')${expectGlobal[expect][`selector${expect}`]}())${expectGlobal[expect].testTypes}('${expectGlobal[expect][`lastInput${expect}`]}');\n`;
            }
            
          }
        
        }
      finalString += '});\n';
    
      }
      finalString += '});\n';
      
    }
    
  exportTestCode(projectFilePath, finalString);


}



  return (
    <div className="testBlock">
      <img className="catalysticon" src={catalystIcon}/>
      <div className="headerbar">
        <ul className="headerlist">
          <li>
          <button className="generatetests" onClick={handleClick}>Generate Tests</button> 
          </li>
          <li>
            <ReuploadDirectory />
          </li>
        </ul>
        <ul className="iconlist">
          <li><a href="https://github.com/oslabs-beta/Catalyst" target="_blank"><i className="fab fa-github"></i></a></li>
          <li><a href="https://enzymejs.github.io/enzyme/" target="_blank"><i className="fas fa-globe-americas"></i></a></li>
          <li><a href="https://devhints.io/enzyme" target="_blank"><i className="fas fa-question-circle"></i></a></li>
        </ul>
      </div>
    </div>
  );
};
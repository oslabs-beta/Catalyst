import React from 'react';
import { useSelector } from 'react-redux';
import { remote } from 'electron';
import * as electronFs from 'fs';
import catalystIcon from '../../assets/catalyst_icons/Catalyst-01.png';
import { ReuploadDirectory } from './ReuploadDirectory';
import path from 'path'


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


    for(let x of fileTree){
      let file = electronFs.statSync(x.filepath)
      if(file.isDirectory()){
        let find = findFile(x.children, name)
        if(find !== ''){
          return find;
        }
      }
      else{
        if(x.name.toLowerCase().includes(name) && !x.name.toLowerCase().includes('_')){
          return x.filepath;
        }
      }
   
    
    }
    return '';
  };

  const openDialog = (userFilePath: string, generatedTestCode: string) => {
    let filePath = path.normalize(userFilePath + '/__tests__/');
    console.log(filePath);
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

    let finalString: string  = '';
    finalString += `import React from 'react';\nimport { configure, shallow } from 'enzyme';\nimport Adapter from 'enzyme-adapter-react-16';\nconfigure({ adapter: new Adapter() });\n`

    // inserts the correct import statement for each component
    for(let i of keysOfDescribe){
      let fileLocation = findFile(fileTree, `${describeInputGlobal[i]}`.trim().toLowerCase());
      if(fileLocation !== ''){
        fileLocation = fileLocation.replace('.jsx','');
        finalString += `import ${describeInputGlobal[i]} from \'${fileLocation}\'; \n\n`;
      }
    }

    // obtains all the prop fields from the dom and puts it into an array of html elements
    let allProps: HTMLCollectionOf<Element> = document.getElementsByClassName('Prop');
    // counter for the array of allProps
    let counter: number = 0;

    // loop all the describe blocks
    for (let i of keysOfDescribe) {
      finalString += `describe('${describeInputGlobal[i]}', () => {\n\tlet wrapper; \n\n`;
      
      // if the describe block should have props then retrieve it from the allProps object, if no then skip 
      if(describePropBoolean[i] && allProps[counter].getElementsByClassName('propChild').length >0){
        finalString += `\tconst props = { \n`;
        for(let element of allProps[counter].getElementsByClassName('propChild')){
          finalString += `\t\t${element.getElementsByTagName('input')[0].value} : ${element.getElementsByTagName('input')[1].value}, \n`;
        }
        
        finalString += `\t} \n\n`;
        finalString += `\tbeforeAll(() => {\n\t\twrapper = shallow(<${describeInputGlobal[i]} {...props}>)\n \t}) \n`;
      }
      else{
        finalString += `\tbeforeAll(() => {\n\t\twrapper = shallow(<${describeInputGlobal[i]}>)\n \t}) \n`;
      }
      counter+=1;
      // loop through all the it statements that should be within the specidfied describe block
      for (let j of Object.keys(describeGlobal[i])){
        finalString += `\n\tit('${itInputGlobal[j]}', () => { \n`;
        // loop through all of the expect statements that should be within the specifiec expect block
        for(let expect of Object.keys(itsGlobal[j])){
          finalString += `\t\texpect(wrapper`;
          // loop through all of the selectors that exist
          for(let element of Object.values(expectGlobal[expect]['selectors'])){
            // if the selector holds an object then print out the key with the value inside the ()
            if(typeof element === 'object'){
              finalString += `${Object.keys(element)[0]}('${Object.values(element)[0]}')`;
            }
            // if the selector does not hold a string then append the string
            else{
              if(element !== '.nothing'){
                finalString += `${element}()`;
              }
            }
          }
          finalString += `)${expectGlobal[expect].testTypes}('${expectGlobal[expect][`lastInput${expect}`]}');\n`;  
        }
      finalString += '\t});\n';
      }
      finalString += '});\n';
    }
    console.log(finalString)
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
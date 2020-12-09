import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import catalystIcon from '../../assets/catalyst_icons/Catalyst-01.png';
import { ViewTestCode } from '../reduxComponents/actions/actions';
import { ReuploadDirectory } from './ReuploadDirectory';
import { ExportTestCode } from './ExportTestCode';
import * as electronFs from 'fs';



export const TestBlock: React.FC = () => {

  const describeGlobal = useSelector((state:any) => state.describes);
  const itsGlobal = useSelector((state:any) => state.its);
  const expectGlobal = useSelector((state:any) => state.expects);
  const describeInputGlobal = useSelector((state:any) => state.componentObj);
  const itInputGlobal = useSelector((state:any) => state.itInputObj);
  const describePropBoolean = useSelector((state:any) => state.describePropBoolean);
  const fileTree = useSelector((state:any) => state.fileTree);


  const dispatch = useDispatch();
  // generated testCode from GUI is dispactched to store to be displayed in viewer
  const viewTestCode = (data: string) => dispatch(ViewTestCode(data));

  
  function findFile(fileTree:any, name: string):string{

    for(let x of fileTree){
      let file = electronFs.statSync(x.filepath);
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


   function  handleClick():void {
    const keysOfDescribe = Object.keys(describeGlobal);

    let finalString: string  = '';
    finalString += `import React from 'react';\nimport { configure, shallow } from 'enzyme';\nimport Adapter from 'enzyme-adapter-react-16';\n\nconfigure({ adapter: new Adapter() });\n\n`

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
          if (element.getElementsByTagName('input')[0].value === '' && element.getElementsByTagName('input')[1].value === '') {
            continue;
          } else {
            finalString += `\t\t${element.getElementsByTagName('input')[0].value} : ${element.getElementsByTagName('input')[1].value}, \n`;
          }
        }
        
        finalString += `\t}; \n\n`;
        finalString += `\tbeforeAll(() => {\n\t\twrapper = shallow(<${describeInputGlobal[i]} {...props}/>);\n \t}); \n`;
      }
      else{
        finalString += `\tbeforeAll(() => {\n\t\twrapper = shallow(<${describeInputGlobal[i]}/>)\n \t}); \n`;
      }
      counter+=1;
      // loop through all the it statements that should be within the specidfied describe block
      for (let j of Object.keys(describeGlobal[i])){
        finalString += `\n\tit('${itInputGlobal[j]}', () => { \n`;
        // loop through all of the expect statements that should be within the specific expect block
        for(let expect of Object.keys(itsGlobal[j])){
          finalString += `\t\texpect(wrapper`;
          // loop through all of the selectors that exist
          for(let element of Object.values(expectGlobal[expect]['selectors'])){
            // if the selector holds an object then print out the key with the value inside the ()
            if(typeof element === 'object'){
              // checking if selector value is empty but still needs to be chained
              if (Object.keys(element)[0] && Object.values(element)[0] === '') {
                finalString += `${Object.keys(element)[0]}()`;
              } else {
                finalString += `${Object.keys(element)[0]}(${Object.values(element)[0]})`;
              }
            } 
            // if the selector does not hold a string then append the string
            else{
              if(element !== '.nothing'){
                finalString += `${element}()`;
              }
            }
          }
          finalString += `)${expectGlobal[expect].testTypes}(${expectGlobal[expect][`lastInput${expect}`]});\n`;  
        }
      finalString += '\t});\n';
      }
      finalString += '});\n';
    }
    // dispatches generated test code to store for global usage
    viewTestCode(finalString);
  }

  




  return (
    <div className="testBlock">
      <img className="catalysticon" src={catalystIcon}/>
      <div className="headerbar">
        <ul className="headerlist">
          <li>
            <ReuploadDirectory />
          </li>
          <li>
            <button className="generatetests" onClick={handleClick}>Generate Tests</button> 
          </li>
          <li>
            <ExportTestCode />
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

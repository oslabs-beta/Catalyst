import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {remote} from 'electron';
import catalystIcon from '../../assets/catalyst_icons/Catalyst-01.png';
import * as electronFs from 'fs';
const dialog = remote.dialog


interface Props{

}


// describe('Testing app component', () => {
//   it('renders', () => {
//     expect(wrapper.exists()).toBe(true);
//   })
//   it('matches snapshot', () => {
//     expect(wrapper).toMatchSnapshot();
//   })
//   it('render FolderUpload component', () => {
//     expect(wrapper.children(FolderUpload).length).toEqual(1);
//   })
// }); 



export const TestBlock: React.FC = () => {

  const describeGlobal = useSelector((state:any) => state.describes);
  const itsGlobal = useSelector((state:any) => state.its);
  const expectGlobal = useSelector((state:any) => state.expects);
  const describeInputGlobal = useSelector((state:any) => state.componentObj);
  const itInputGlobal = useSelector((state:any) => state.itInputObj);


  


  const handleClick = () => {
    // let test = `describe('${describeInputGlobal[0]}', () => {
    //   it('${itInputGlobal[0]}', () => {
    //     expect(wrapper${expectGlobal[0].firstInput0}()${expectGlobal[0].testTypes}(${expectGlobal[0].lastInput0})
    //   })
    // });`
    // console.log(test)



  

    const keysOfDescribe = Object.keys(describeGlobal);
    const keysOfIts = Object.keys(itsGlobal);
    const keysOfExpects = Object.keys(expectGlobal);
    const keysOfDescribeInputs = Object.keys(describeInputGlobal);
    const keysOfItInputs = Object.keys(itInputGlobal);

    let testBlock = []; 

    // for (let i = 0; i < keysOfDescribe.length; i++) {
    //   // correctly iterating through describe block
    //   console.log(`describe('${describeInputGlobal[i]}', () => {`);
    //   testBlock.push(`describe('${describeInputGlobal[i]}', () => {`);
    //   for (let j = i; j < keysOfIts.length; j++) {
    //     // checking to see key of its exists insde each describe key
    //     if (j in describeGlobal[i]) {
    //     console.log(`it('${itInputGlobal[j]}', () => {`)
    //     testBlock.push(`it('${itInputGlobal[j]}', () => {`);
    //     }
    //     for (let k = i; k < keysOfExpects.length; ++k) {
    //       // console.log('this is indexk', k, 'this is itsGlobal[j]', itsGlobal[j], 'this is k in itsGlobal', k in itsGlobal[j]);
    //       if (k in itsGlobal[j]) {
    //         console.log(`expect(wrapper${expectGlobal[k][`firstInput${k}`]}()${expectGlobal[k].testTypes}(${expectGlobal[k][`lastInput${k}`]}
    //           })
    //         });`)
    //         testBlock.push(`expect(wrapper${expectGlobal[k][`firstInput${k}`]}()${expectGlobal[k].testTypes}(${expectGlobal[k][`lastInput${k}`]}
    //       })
    //     });`)
    //       }
    //     }
    //   } 
    // }


    // console.log(describeInputGlobal)
    let finalString  =''
    for (let i of keysOfDescribe) {
      console.log(describeInputGlobal)
      finalString += `describe('${describeInputGlobal[i]}', () => { \n`
      // correctly iterating through describe block
      console.log('describe', i)
      // console.log(`describe('${describeInputGlobal[i]}', () => {`);
      // // console.log(describeInputGlobal)
      // // console.log(i)
      // console.log(describeGlobal)
      // console.log(Object.keys(describeGlobal[i]))
      // testBlock.push(`describe('${describeInputGlobal[i]}', () => {`);
      for (let j of Object.keys(describeGlobal[i])){
        finalString += `it('should match snapshot', () => { \n`
        console.log('it', j)
        // console.log(itsGlobal)
        for(let expect of Object.keys(itsGlobal[j])){
          finalString += `expect(wrapper${expectGlobal[expect][`firstInput${expect}`]}()${expectGlobal[expect].testTypes}(${expectGlobal[expect][`lastInput${expect}`]}))\n`
          console.log('expect', expect)
          // console.log(expectGlobal[expect])
        }
        finalString +='})\n'
      }
      finalString += '})\n'
    
    }
    console.log(finalString)

    // console.log('this is testBlock', testBlock.join(''));

    // let codeBlock = testBlock.join('');


    
  //  let fileName = dialog.showSaveDialog({})
  //   .then(result => {
  //     fileName = result.filePath;
  //     if (fileName === undefined) {
  //       console.log('undefined file');
  //       return;
  //     }
  //     electronFs.writeFile(fileName, codeBlock, (err) => {
  //       if (err){
  //         console.log(err.message);
  //         return
  //       }
  //       console.log('added file');
  //     })
  //   }).catch(err =>{
  //     console.log(err);
  //   })


/*   dialog.showSaveDialog({
    title: 'Select File Path to save',
    // defaultPath: , can add location to save file on users directory
    filters: [
      {
        name: 'Text Files',
        extensions: ['txt', 'docx']
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

      electronFs.writeFile(file.filePath?.toString(), codeBlock, (err) => {
        if (err) {
          console.log(err.message);
        }
        console.log('saved');
      })
    }
  })
  .catch(err => {
    console.log(err);
  }) */

    // let expectObj = {}
    // for (let i = 0; i < Object.keys(expectGlobal).length; i+=1) {
      // expectObj[`${i}`] = `expect(wrapper${expectGlobal[i][`firstInput${i}`]}()${expectGlobal[i].testTypes}(${expectGlobal[i][`lastInput${i}`]})`;
    // }
    // console.log(expectObj)

    // let itObj = {};
    // for (let i = 0; i < Object.keys(itsGlobal).length; i++) {

    // }

  }



  return (
    <div className="testBlock">
      <img className ="catalysticon" src={catalystIcon}/>
      <ul className="headerlist">
        <li>
          <button onClick={handleClick}>Create Tests</button>
        </li>
        <li>
          <button onClick={handleClick}>Create Tests</button>
        </li>
      </ul>

    </div>
  );
};
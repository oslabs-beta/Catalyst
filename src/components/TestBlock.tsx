import React from 'react';
import {useDispatch, useSelector} from 'react-redux';


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





    // console.log('i was clicked');
    // console.log('expect(wrapper.text()).toEqual("userinput")');
    // console.log('expect(wrapper.find("").toEqual("userinput")');

    // // Returns the type of the only node of this wrapper. If it's a React component, this will be the component constructor.
    // console.log('expect(wrapper.type().toEqual("userInput")');

    // console.log('expect(wrapper.text()).toEqual("userinput")');
    // console.log('expect(wrapper.find("").toEqual("userinput")');

    // // Returns the type of the only node of this wrapper. If it's a React component, this will be the component constructor.
    // //test('hello world', () => {
    // //   const wrapper = mount(<p>Hello Jest!</p>);
    // //   expect(wrapper.text()).toMatch('Hello Jest!');
    // // });
    // console.log('expect(wrapper.text().toMatch("userInput")');
    // console.log('expect(wrapper.find("userInput").toHaveLength("userInput")');
    
    const globalData = {describeGlobal, describeInputGlobal, itsGlobal, itInputGlobal, expectGlobal};
    console.log('this is all global data', globalData);
    console.log('this is describeGlobal', describeGlobal);
    console.log('this is its global',itsGlobal );
    console.log('this is expects global', expectGlobal);
    console.log('this is describe input global', describeInputGlobal);
    console.log('this is the it input global', itInputGlobal);

    const keysOfDescribe = Object.values(describeGlobal);
    console.log('these are k describe', keysOfDescribe);
    const keysOfIts = Object.values(itsGlobal);
    console.log('these are k of its', keysOfIts);
    const keysOfExpects = Object.values(expectGlobal);
    console.log('these are k of expects',keysOfExpects);
    const keysOfDescribeInputs = Object.values(describeInputGlobal);
    console.log('these are k of DI', keysOfDescribeInputs);
    const keysOfItInputs = Object.values(itInputGlobal);
    console.log('these are k of II', keysOfItInputs);

    for (const itIndex of keysOfDescribe){
      for (const itStatements in itIndex) {
        console.log('this is hopefully the expects', expectGlobal[itStatements]);
        
      }
    }


    // let expectObj = {}
    // for (let i = 0; i < Object.keys(expectGlobal).length; i+=1) {
    //   expectObj[`${i}`] = `expect(wrapper${expectGlobal[i][`firstInput${i}`]}()${expectGlobal[i].testTypes}(${expectGlobal[i][`lastInput${i}`]})`;
    // }
    // console.log(expectObj)

  //   const iterateThrough = (obj: any) => {
  //   Object.keys(obj).forEach((key) => {
  //     if (typeof obj[key] === 'object') {
  //       return iterateThrough(obj[key]);
  //     }
  //     console.log(`this is ${key} = ${obj[key]}`);
  //   })
  // }


    // iterateThrough(globalData);
  }



  return (
    <div>
      


    <button onClick={handleClick}>Create tests</button>

    </div>
  );
};
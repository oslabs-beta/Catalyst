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

    console.log('this is describeGlobal', describeGlobal);
    console.log('this is its global',itsGlobal );
    console.log('this is expects global', expectGlobal);
    console.log('this is describe input global', describeInputGlobal);
    console.log('this is the it input global', itInputGlobal);
  }



  return (
    <div>
      


    <button onClick={handleClick}>Create tests</button>

    </div>
  );
};
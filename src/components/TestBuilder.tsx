import React, {useState, useEffect} from 'react';
import { DescribeBlock } from './DescribeBlock';
import {useSelector, useDispatch} from 'react-redux';
import { UpdateKeyOfDesribe, UpdateKeyOfIt } from '../reduxComponents/actions/actions';



export const TestBuilder: React.FC = () => {
  const dispatch = useDispatch()
  const describesFromStore = useSelector((state:any) => state.describes)
  const describeIndex = useSelector((state:any) => state.keyOfDescribe)
  const itIndex = useSelector((state:any) => state.keyOfIt)
  const updateDescribeIndex = () => dispatch(UpdateKeyOfDesribe())

  const [describes, updateDescribes] = useState([]);
  const itStatements = useSelector((state:any) => state.arrOfItStatements);




  useEffect(() =>{
    let x: {[k:string]:any}= {}
    // create a new Describe block to be rendered. Will be inital describe
    x[`${describeIndex}`] = <DescribeBlock key ={describeIndex} id={describeIndex} itIndex = {itIndex} describeProp = {`${describeIndex}`}/>
    // add the describe block to be mapped later 
    updateDescribes(describes.concat(x[`${describeIndex}`]))
    // adds the initial it statement key to the describe object in store to keep track of children components
    describesFromStore[`${describeIndex}`] = [itIndex]
    // updates the index of the it and describe because each has been added to the store
    updateDescribeIndex()
  },[])

  function addDescribe(){
    let x: {[k:string]: any} = {};
    x[describeIndex] = <DescribeBlock key={`${describeIndex}`} id={`${describeIndex}`} itIndex = {itIndex} describeProp = {`${describeIndex}`}/>;
    updateDescribes(describes.concat(x[`${describeIndex}`]));
    describesFromStore[`${describeIndex}`] = [itIndex];
    updateDescribeIndex();
  }





  return (
    <div className="testBuilder">
      {/* <button className="mainButton newTest">New Test</button>
      <button className="mainButton undo">Undo</button>
      <button className="mainButton newComponent">New Component</button>
      <label>Enter Component Name: </label>
      <input/> */}
      {describes}
      <button onClick = {addDescribe}>add Describe Block</button>
    </div>
  )
};

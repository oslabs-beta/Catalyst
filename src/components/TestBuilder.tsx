import React, {useState, useEffect} from 'react';
import { DescribeBlock } from './DescribeBlock';
import {useSelector, useDispatch} from 'react-redux';
import { UpdateItObj, UpdateKeyOfDescribe, UpdateData, UpdateDescribe, UpdateDescribeBoolean} from '../reduxComponents/actions/actions';



export const TestBuilder: React.FC = () => {
  const dispatch = useDispatch()

  const describesFromStore = useSelector((state:any) => state.describes)
  const itFromStore = useSelector((state:any) => state.its)
  const expectFromStore = useSelector((state:any) => state.expects)
  const describeIndex = useSelector((state:any) => state.keyOfDescribe)
  const itIndex = useSelector((state:any) => state.keyOfIt)
  const describeBool = useSelector((state:any) => state.describePropBoolean)
  const fileTree = useSelector((state:any) => state.fileTree);


  const updateDescribeIndex = () => dispatch(UpdateKeyOfDescribe())
  const updateIt = (data:any) => dispatch(UpdateItObj(data))
  const updateExpects = (data:any) => dispatch(UpdateData(data))
  const updateDescribe = (data:any) => dispatch(UpdateDescribe(data))
  const updateDescribeBool = (data:any) => dispatch(UpdateDescribeBoolean(data))
  

  const [describes, updateDescribes] = useState([]);

  const storeval: {[k:string]:any}= {}
  storeval[`${itIndex}`]  = ''


  useEffect(() =>{
    // console.log(describes)
    let x: {[k:string]:any}= {}
    // create a new Describe block to be rendered. Will be inital describe
    x[`${describeIndex}`] = <DescribeBlock key ={describeIndex} id={describeIndex} itIndex = {itIndex} describeProp = {`${describeIndex}`} removeDescribe = {removeDescribe}/>
    // add the describe block to be mapped later 
    updateDescribes(describes.concat(x[`${describeIndex}`]))
    // adds the initial it statement key to the describe object in store to keep track of children components
    describesFromStore[`${describeIndex}`] = storeval
    describeBool[`${describeIndex}`] = false
    // updates the index of the it and describe because each has been added to the store
    updateDescribeIndex()
    updateDescribeBool(describeBool)
    // making fileTree as its dependency in order to re-render describe block if new project is chosen
  },[fileTree])

  
  function addDescribe(){
    let x: {[k:string]: any} = {};
    x[describeIndex] = <DescribeBlock key={`${describeIndex}`} id={`${describeIndex}`} itIndex = {itIndex} describeProp = {`${describeIndex}`} removeDescribe = {removeDescribe}/>;
    // adds the describe block to the array of describe blocks to be rendered
    updateDescribes(describes.concat(x[`${describeIndex}`]));
    describesFromStore[`${describeIndex}`] = storeval;
    describeBool[`${describeIndex}`] = false
    updateDescribeBool(describeBool)
    updateDescribeIndex();
  }


  function removeDescribe(id: number): boolean{
    // console.log(id)
    if(Object.keys(describesFromStore).length > 1){
      //delete
      for(let it of Object.keys(describesFromStore[`${id}`])){
        // console.log(it)
        for(let expect of Object.keys(itFromStore[`${it}`])){
          delete expectFromStore[`${expect}`]
        }
        delete itFromStore[`${it}`]
        updateExpects(expectFromStore)
        updateIt(itFromStore)
      }
      delete describesFromStore[`${id}`]
      updateDescribe(describesFromStore)
      document.getElementById(`describeBlock${id}`)?.remove()
      return true
    }
    else{
      console.log('cannot delete describe block')
      return false
    }
  }



  return (
    <div className="testBuilder">
      <div className="describecards" id = 'describecards'>
        {describes}
      </div>
      <div className="addtestbutton">
        <button className="adddescribe" onClick = {addDescribe}>+ Describe Block</button>
      </div>
    </div>
  )
};

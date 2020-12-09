import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { UpdateData, UpdateItObj, UpdateItStatement } from '../reduxComponents/actions/actions';
import {ExpectStatement} from './ExpectStatement';


interface Props{
  itProp: string,
  id: any,
  removeIt: (id:number) => boolean
}
 

export const ItStatement: React.FC<Props> = ({itProp, removeIt,id}) =>{

  const dispatch = useDispatch();
  let index = useSelector((state: any) => state.keyOfExpect);
  const data = useSelector((state: any) => state.expects);
  const itObject = useSelector((state: any) => state.its);
  const updateIts = (data: any) => dispatch(UpdateItObj(data));
  let updateData = (data:any) => dispatch(UpdateData(data));
  let [arrayOfExpect,updateArray] = useState([]);
  const globalItInput = useSelector((state: any) => state.itInputObj);
  const updateItGlobal = (data:any) => dispatch(UpdateItStatement(data));

  const itKey = useSelector((state:any) => state.keyOfIt);
  const storeval: {[k:string]:any}= {};
  storeval[`${index}`]  = '';

  useEffect(() =>{
    // unsure about this typing and if piping would work ConcatArray<never> | JSX.Element
    let x: {[k:string]:any}= {};
    x[`${index}`] = <ExpectStatement key = {`${index}`} id = {`${index}`}  remove = {removeExpect}/>;
    updateArray(arrayOfExpect.concat(x[`${index}`]));
    // update the store with the newly added it statement
    itObject[`${itKey}`] = storeval;
    updateIts(itObject);

  }, [])
  

  // adds an expect statement to the current it statement
  function addExpect(){
    let x: {[k:string]:any} = {};
    itObject[`${itProp}`][index] = '';

    x[`${index}`] = <ExpectStatement key = {`${index}`} id = {`${index}`} remove = {removeExpect}/>;
    updateArray(arrayOfExpect.concat(x[index]));
    // create an object in to be passed into the store 
    let newExpect:{[k:string]: any} = {};
    newExpect[`firstInput${index}`] = 'type';
    newExpect['testTypes'] = 'equal';
    newExpect[`lastInput${index}`] = '';
    // add the key value pair to the expect object in the store 
    data[index] = newExpect;

    updateData(data);
    // updates the it object associated with the component to hold the key value of the child 
    updateIts(itObject);
  }

  // remove an expect block from the it statement
  function removeExpect(removeId:number){
    // if there are more than one then delete selected
    if(Object.keys(itObject[`${itProp}`]).length >1){
      delete itObject[`${itProp}`][`${removeId}`];
      updateIts(itObject);
      return true;
    }
    // if there are not more then one return false to notify that it cannot be deleted
    return false;
  }

  // updates the it statement value in the store
  const updateItStatement =  (input:any) => {
    globalItInput[itProp] = input; 
    updateItGlobal(globalItInput);
  };

  // removes the it statement from the current describe block
  function removeItStatement(){
    // id is the id of the it block that needs to be removed from the describe
    if(removeIt(id)){
      // here we have to delete it blocks
      for(let itBlocks of Object.keys(itObject[`${itProp}`])){
        delete data[`${itBlocks}`];
      }
      document.getElementById(`it-block ${itProp}`)?.remove()
      updateData(data);
      // delete the it block
      delete itObject[`${itProp}`];
    }
    else {
      console.log('cannot remove it block');
    }
  }
  
  return(
    <div className="itBlock" id = {`it-block ${itProp}`}>
      <input className="itinput" placeholder='what to test' onChange={(e) => {updateItStatement(e.target?.value)}} />
      <button className="removeit" onClick = {removeItStatement}>X</button>
      {arrayOfExpect}
      <button className="addexpect" onClick = {addExpect}>+ Expect</button>
    </div>
  )
}
import React, {useEffect, useState, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { UpdateDescribeBoolean } from '../reduxComponents/actions/actions';

interface Props {
  id:string
}

export const PropLoader: React.FC<Props> =({id}) =>{
  let temp = useRef<any>([]);
  let [propArray, updatePropArray] = useState<object[]>([]);
  const [displayArray, updateDisplay] = useState<any>([]);
  const [count, updateCount] = useState(0);
  const [check, updateBool] = useState(false);

  const dispatch = useDispatch();
  const propBoolean = useSelector((state:any) => state.describePropBoolean);


  const updatePropBooleanInStore = (data:any) => dispatch(UpdateDescribeBoolean(data));

  useEffect(() =>{
    let display = [];
    for(let x of propArray){
      for(let ele of Object.values(x)){
        display.push(ele);
      }
    }
    updateDisplay(display);
  },[propArray])

  // adds a key value element to the display
  function addProp(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void{
    event?.preventDefault();
    // checks to see if the checkbox is fille and if it is then add the prop field
    if(propBoolean[`${id}`]){
      // save the element as in an object with a key associated to it for easy access on deletion
      let prop: {[k:string]:any}= {};
      prop[`describe${id}prop${count}`] = 
        <div className = 'propChild' id = {`describe${id}prop${count}`} key = {count}>
          {/* <label className="proplabel">{count + 1}. </label> */}
          <input className="propkey" type = "text" placeholder = "key"/>
          <input className="propval" type = "text" placeholder = "value"/>
          <button className="removeprop" onClick ={test} id = {`describe${id}prop${count}button`}>X</button>
        </div>

      temp.current = temp.current.concat([prop]);
      updatePropArray([...propArray, prop]);
      updateCount(count +1);
    }
    
  };

  // deletes the selected key value field 
  function test(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void{
    event.preventDefault();
    let answer = [];
    // loops through the current array of key value fields and adds those that are not selected
    for(let x of temp.current){
      if(Object.keys(x)[0] !== event.target?.id.replace('button','')){
        answer.push(x); 
      }
    }
    temp.current = answer;
    updatePropArray(answer);
  };

  // toggles the check box
  function updateCheck(): void{
    // if the checkbox is checked
    if(propBoolean[`${id}`]){
      updatePropArray([]);
      temp.current = [];
      updateCount(0);
    }
    // sets the boolean value to the opposite value
    propBoolean[`${id}`] = !propBoolean[`${id}`];
    // update the boolean value in the store
    updatePropBooleanInStore(propBoolean);
    updateBool(!check);
  };


  return(

    !check
    
    ?

    <div className = 'Prop'>
      <form className="propform">
        <label className="proplabel">Add Props</label>
        <input className="propcheck" type="checkbox" id="addProps" name="addProps" onChange = {updateCheck}/> 
      </form>
    </div>

    :

    <div className = 'Prop'>
      <form className="propform">
        <label className="proplabel">Add Props</label>
        <input className="propcheck" type="checkbox" id="addProps" name="addProps" onChange = {updateCheck}/> 
      </form>
    {displayArray}

    <button onClick = {addProp}>Add Value</button>
  </div>

  )
}
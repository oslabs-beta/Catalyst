import React, { useState } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { UpdateKey, AddItStatements } from '../reduxComponents/actions/actions';
import {ExpectStatement} from './ExpectStatement'





export const ItStatement: React.FC = () =>{
  /* // let aa = 1 
  let x = {0 :<ExpectStatement id = {"0"}/>}
  const dispatch = useDispatch()
  let [arrayOfExpect,updateArray] = useState([x[0]])
  let index = useSelector((state: any) => state.keyOfExpect)
  let updateIndex = () => dispatch(UpdateKey())


  // not real error Typescript handles weirdly 

  function addExpect(){
    x[index] = <ExpectStatement key = {`${index}`} id = {`${index}`}/>
    updateArray(arrayOfExpect.concat(x[index]))
    console.log(arrayOfExpect)
    updateIndex()
  } */

  // have access to empty object to hold itStatements
  const initialItStatements = useSelector((state: any) => state.itStatements);
  const dispatch = useDispatch();
  const statementIndex = useSelector((state: any) => state.keyOfExpect);
  // func that will dispatch additional it statements to store
  const addItStatement = (statements:any) => dispatch(AddItStatements(statements));

  const createItStatement = () => {
    console.log('we are in the clicking part');
    console.log('this is the state in the handle click', initialItStatements)
    // let statements = initialItStatements.concat(<ExpectStatement key={statementIndex}/>)
    // console.log(statements);
    addItStatement(<ExpectStatement key={statementIndex}/>);
  };



  
  return(
    <div>

      {/* {initialItStatements.map((statement:any) => {
        <ExpectStatement
          key={statementIndex}
        />
      })} */}
      initialItStatements ? 
      {initialItStatements.map((statements:any) => {
        {statements}
      })} : <p>nothing here</p>


      <button onClick = {createItStatement}>Add expect </button>
    </div>
  )



}
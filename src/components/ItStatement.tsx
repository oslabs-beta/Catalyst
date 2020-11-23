import React, { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { UpdateKeyOfExpect, UpdateData } from '../reduxComponents/actions/actions';
import {ExpectStatement} from './ExpectStatement'



 

export const ItStatement: React.FC = () =>{
  const dispatch = useDispatch()
  let index = useSelector((state: any) => state.keyOfExpect)
  const data = useSelector((state: any) => state.expects)
  let updateData = (data:any) => dispatch(UpdateData(data))
  let [arrayOfExpect,updateArray] = useState([])
  

  useEffect(() =>{
    // unsure about this typing and if piping would work ConcatArray<never> | JSX.Element
    let x: {[k:string]:any}= {}
    x[`${index}`] = <ExpectStatement key = {`${index}`} id = {`${index}`} />
    updateArray(arrayOfExpect.concat(x[`${index}`]))
  }, [])
  
  
  
  



  function addExpect(){
    // unsure about this typing and if piping would work ConcatArray<never> | JSX.Element
    let x: {[k:string]:any} = {}
    x[`${index}`] = <ExpectStatement key = {`${index}`} id = {`${index}`}/>
    updateArray(arrayOfExpect.concat(x[index]))
    let newExpect:{[k:string]: any} = {}
    newExpect[`firstInput${index}`] = 'type'
    newExpect['testTypes'] = 'equal'
    newExpect[`lastInput${index}`] = ''
    console.log(newExpect)
    data[index] = newExpect
    updateData(data)
    updateIndex()
    console.log('hey')

  }

  // have access to empty object to hold itStatements
  // const initialItStatements = useSelector((state: any) => state.itStatements);
  // const statementIndex = useSelector((state: any) => state.keyOfExpect);
  // // func that will dispatch additional it statements to store
  // const addItStatement = (statements:any) => dispatch(AddItStatements(statements));

  // const createItStatement = () => {
  //   console.log('we are in the clicking part');
  //   console.log('this is the state in the handle click', initialItStatements)
  //   // let statements = initialItStatements.concat(<ExpectStatement key={statementIndex}/>)
  //   // console.log(statements);
  //   addItStatement(<ExpectStatement key={statementIndex}/>);
  // };



  
  return(
    <div>
      {arrayOfExpect}
      <button onClick = {addExpect}>Add expect </button>
    </div>
  )



}
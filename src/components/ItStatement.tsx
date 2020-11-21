import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { UpdateKey } from '../reduxComponents/actions/actions';
import {ExpectStatement} from './ExpectStatement'





export const ItStatement: React.FC = () =>{
  // let aa = 1 
  let x = {0 :<ExpectStatement id = {"0"}/>}
  const dispatch = useDispatch()
  let [arrayOfExpect,updateArray] = useState([x[0]])
  let index = useSelector((state: any) => state.keyOfExpect)
  let updateIndex = () => dispatch(UpdateKey())

  useEffect(() =>{
    console.log('hey')
  }, [arrayOfExpect])

  // not real error Typescript handles weirdly 

  function addExpect(){
    x[index] = <ExpectStatement id = {`${index}`}/>
    updateArray(arrayOfExpect.concat(x[index]))
    console.log(arrayOfExpect)
    updateIndex()
  }

  return(
    <div>
      {arrayOfExpect}
      <button onClick = {addExpect}>Add expect </button>
    </div>

  )



}
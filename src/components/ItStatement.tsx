import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { UpdateKey, UpdateData } from '../reduxComponents/actions/actions';
import {ExpectStatement} from './ExpectStatement'





export const ItStatement: React.FC = () =>{

  const dispatch = useDispatch()
  let index = useSelector((state: any) => state.keyOfExpect)
  let updateIndex = () => dispatch(UpdateKey())
  const data = useSelector((state: any) => state.allData)
  let updateData = (data:any) => dispatch(UpdateData(data))
  let [arrayOfExpect,updateArray] = useState([])
  

  useEffect(() =>{
    let x = {}
    x[`${index}`] = <ExpectStatement key = {`${index}`} id = {`${index}`} />
    updateArray(arrayOfExpect.concat(x[`${index}`]))
    updateIndex()
  }, [])
  
  
  
  


  // not real error Typescript handles weirdly 

  function addExpect(){
    let x = {}
    x[index] = <ExpectStatement key = {`${index}`} id = {`${index}`}/>
    updateArray(arrayOfExpect.concat(x[index]))
    let newExpect = {}
    newExpect[`firstInput${index}`] = 'type'
    newExpect['testTypes'] = 'equal'
    newExpect[`lastInput${index}`] = ''
    data[index] = newExpect
    updateData(data)
    updateIndex()

  }

  return(
    <div>
      {arrayOfExpect}
      <button onClick = {addExpect}>Add expect </button>
    </div>

  )



}
import React, { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { UpdateData, UpdateItObj } from '../reduxComponents/actions/actions';
import {ExpectStatement} from './ExpectStatement'


interface Props{
  itProp: string,
  id: any
}
 

export const ItStatement: React.FC<Props> = ({itProp}) =>{

  const dispatch = useDispatch()
  let index = useSelector((state: any) => state.keyOfExpect)
  const data = useSelector((state: any) => state.expects)
  const itObject = useSelector((state: any) => state.its)
  const updateIts = (data: any) => dispatch(UpdateItObj(data))
  let updateData = (data:any) => dispatch(UpdateData(data))
  let [arrayOfExpect,updateArray] = useState([])

  const itKey = useSelector((state:any) => state.keyOfIt)
  

  useEffect(() =>{
    // unsure about this typing and if piping would work ConcatArray<never> | JSX.Element
    let x: {[k:string]:any}= {}
    x[`${index}`] = <ExpectStatement key = {`${index}`} id = {`${index}`} />
    updateArray(arrayOfExpect.concat(x[`${index}`]))
    // subtract one because the other file is rendering first
    itObject[`${itKey}`] = [index]
    updateIts(itObject)

  }, [])
  
  
  
  



  function addExpect(){
    // unsure about this typing and if piping would work ConcatArray<never> | JSX.Element
    let x: {[k:string]:any} = {}
    console.log(itProp)
    itObject[`${itProp}`] = itObject[`${itProp}`].concat(index)

    x[`${index}`] = <ExpectStatement key = {`${index}`} id = {`${index}`}/>
    updateArray(arrayOfExpect.concat(x[index]))
    // create an object in to be passed into the store 
    let newExpect:{[k:string]: any} = {}
    newExpect[`firstInput${index}`] = 'type'
    newExpect['testTypes'] = 'equal'
    newExpect[`lastInput${index}`] = ''
    // add the key value pair to the expect object in the store 
    data[index] = newExpect
    updateData(data)
    // updates the it object associated with the component to hold the key value of the child 
    updateIts(itObject)


  }



  
  return(
    <div>
      {arrayOfExpect}
      <button onClick = {addExpect}>Add expect </button>
    </div>
  )



}
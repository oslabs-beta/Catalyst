import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import {useSelector, useDispatch} from 'react-redux';
import { UpdateData, UpdateItObj } from '../reduxComponents/actions/actions';
import {ExpectStatement} from './ExpectStatement'


interface Props{
  itProp: string,
  id: any,
  removeIt: (id:number) => boolean
}
 

export const ItStatement: React.FC<Props> = ({itProp, removeIt,id}) =>{

  const dispatch = useDispatch()
  let index = useSelector((state: any) => state.keyOfExpect)
  const data = useSelector((state: any) => state.expects)
  const itObject = useSelector((state: any) => state.its)
  const updateIts = (data: any) => dispatch(UpdateItObj(data))
  let updateData = (data:any) => dispatch(UpdateData(data))
  let [arrayOfExpect,updateArray] = useState([])

  const itKey = useSelector((state:any) => state.keyOfIt)
  const storeval: {[k:string]:any}= {}
  storeval[`${index}`]  = ''

  useEffect(() =>{
    // unsure about this typing and if piping would work ConcatArray<never> | JSX.Element
    let x: {[k:string]:any}= {}
    x[`${index}`] = <ExpectStatement key = {`${index}`} id = {`${index}`}  remove = {removeExpect}/>
    updateArray(arrayOfExpect.concat(x[`${index}`]))


    // subtract one because the other file is rendering first
    // itObject[`${itKey}`] = [index]
    itObject[`${itKey}`] = storeval
    updateIts(itObject)

  }, [])
  


  function addExpect(){
    // unsure about this typing and if piping would work ConcatArray<never> | JSX.Element
    let x: {[k:string]:any} = {}
    // itObject[`${itProp}`] = itObject[`${itProp}`].concat(index)
    itObject[`${itProp}`][index] = ''

    x[`${index}`] = <ExpectStatement key = {`${index}`} id = {`${index}`} remove = {removeExpect}/>
    updateArray(arrayOfExpect.concat(x[index]))
    // create an object in to be passed into the store 
    let newExpect:{[k:string]: any} = {}
    newExpect[`firstInput${index}`] = 'type'
    newExpect['testTypes'] = 'equal'
    newExpect[`lastInput${index}`] = ''
    // add the key value pair to the expect object in the store 
    data[index] = newExpect

    // let storeval: {[k:string]:any}= {}
    // storeval[`${index}`]  = ''
    updateData(data)
    // updates the it object associated with the component to hold the key value of the child 
    updateIts(itObject)
  }

  function removeExpect(removeId:number){
    if(Object.keys(itObject[`${itProp}`]).length >1){
      delete itObject[`${itProp}`][`${removeId}`]
      updateIts(itObject)
      return true
    }
    return false
  }

  function removeItStatement(){
    // id is the id of the it block that needs to be removed from the describe
    if(removeIt(id)){
      // here we have to delete it blocks
      for(let itBlocks of Object.keys(itObject[`${itProp}`])){
        console.log(data[`${itBlocks}`])
        delete data[`${itBlocks}`]
      }
      document.getElementById(`it-block ${itProp}`)?.remove()
      updateData(data)
      // delete the it block
      delete itObject[`${itProp}`]
    }
    else {
      console.log('cannot remove it block')
    }
  }
  
  return(
    <div id = {`it-block ${itProp}`}>
      <button onClick = {removeItStatement}> Remove it</button>
      {arrayOfExpect}
      <button onClick = {addExpect}>Add expect </button>
    </div>
  )



}
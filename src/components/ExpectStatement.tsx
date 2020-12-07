import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { UpdateData,  UpdateKeyOfExpect, deleteExpect} from '../reduxComponents/actions/actions';
import '../stylesheets/components/_expectstatement'

interface Props{
  id: string,
  remove: (x:number) => boolean
}
 

export const ExpectStatement: React.FC<Props> = ({id, remove}) =>{
  
  const dispatch = useDispatch()
  let counter:number = 0
  let first:number
  const data = useSelector((state: any) => state.expects)
  const index = useSelector((state: any) => state.keyOfExpect)
  const allIts = useSelector((state:any) => state.its)

  let updateData = (data:any) => dispatch(UpdateData(data))
  let updateExpectKey = () => dispatch( UpdateKeyOfExpect())
  let deleteExpectFromStore = (data:any) => dispatch(deleteExpect(data))


  useEffect(() => {
    data[index] = {}
    data[index]['testTypes'] = '.toEqual'
    data[index][`lastInput${index}`] = ''
    data[index]['selectors'] = {}
    data[index]['selectors'][`expect${index}selector0`] = '.type'
    updateData(data)
    updateExpectKey()
  },[])


  function removeExpect(){
    if(remove(parseInt(id))){
      deleteExpectFromStore(id)
      document.getElementById(`expect-block ${id}`)?.remove()
    }
    else{
      console.log('cannot remove expect block')
    }

  }

  

  function handleChange(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>){
    let block = document.getElementById(id)
    
    if(event.target?.value === ".find"){
      
      if(event.target?.id === `expect${id}selector0`){
        first = counter
      }


      data[`${id}`]['selectors'][`${event.target?.id}`] = {}
      data[`${id}`]['selectors'][`${event.target?.id}`][`${event.target?.value}`] = ''
      // creates a text box for the input
      let child = document.createElement('input')
      child.id = `expect${id}input${counter}`
      child.className = 'inputbox'
      child.type = 'text'

      child.onchange = () => {inputText(event.target?.id,event.target?.value)}

      counter++
      // creates a selector for the next portion
      let secondSelector = document.createElement('select')
      secondSelector.id = `expect${id}selector${counter}`
      secondSelector.className = 'expectdrop1'
      secondSelector.innerHTML = `
      <option value = 'nothing'></option>
      <option value = '.type'>type</option>
      <option value = '.text'>text</option>
      <option value = '.find'>to find</option>
      <option value = '.exists'>to exist</option>`
      // secondSelector.onchange = handleChange
      data[`${id}`][`selectors`][`expect${id}selector${counter}`] = '.nothing'
      secondSelector.onchange = handleChange

      if(block){
        block.appendChild(child)
        block.appendChild(secondSelector)
      }
      
    }
    else{
      data[`${id}`]['selectors'][`${event.target?.id}`] = event.target?.value
      let checker = false
      if(event.target?.id === `expect${id}selector0`){
        document.getElementById(`expect${id}input${first}`)?.remove()
      }

      for(let keys of Object.keys(data[`${id}`]['selectors'])){
        if(checker){
          delete data[`${id}`]['selectors'][`${keys}`]
          document.getElementById(`${keys}`)?.remove()
          document.getElementById(`${keys}`.replace('selector','input'))?.remove()
          counter--
        }
        else if(keys === event.target.id){
          checker = true
          document.getElementById(`${keys}`.replace('selector','input'))?.remove()
        }
      }
    }

    updateData(data)
  }
  
  function updateInput(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> ){
    data[`${id}`][`${event.target?.id}`] = event.target?.value
    updateData(data)
  }

  function updateLastSelector(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> ){
    data[`${id}`][`${event.target?.id}`] = event.target?.value
    updateData(data)
  }
  
  function inputText(elementId: string, elementKey: string){
    let text = (document.getElementById(elementId.replace('selector','input')) as HTMLInputElement).value
    data[`${id}`]['selectors'][`${elementId}`][`${elementKey}`] = text
    updateData(data)
  }


  return(
    <div className="expectBlock"  id = {`expect-block ${id}`}>
      <div className="expect1" id = {`${id}`}>
        <label>expect wrapper</label>
        <select className="expectdrop1" id={`expect${id}selector0`} onChange = {handleChange}>
          <option value = '.type'>type</option>
          <option value = '.text'>text</option>
          <option value = '.find'>to find</option>
          <option value = '.exists'>to exist</option>
        </select>  
        <button className="removeexpect" onClick = {removeExpect}>X</button>
      </div>
     
      <div className="expect2">
        <select className="expectdrop2" id="testTypes" onChange = {updateLastSelector}>
            <option value = '.toEqual'>to Equal</option>
            <option value = '.toMatch'>to Match</option>
            <option value = '.toBe'>to Be</option>
            <option value = '.toHaveLength'>to Have Length</option>
        </select>
        <input id = {'lastInput' + `${id}`}type = 'text' onChange = {updateInput}/>
      </div>
    </div>
  )
}
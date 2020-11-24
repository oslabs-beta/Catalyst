import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { UpdateData,  UpdateKeyOfExpect} from '../reduxComponents/actions/actions';

interface Props{
  id: string,
  
}
 

export const ExpectStatement: React.FC<Props> = ({id}) =>{
  const dispatch = useDispatch()
  const data = useSelector((state: any) => state.expects)
  const index = useSelector((state: any) => state.keyOfExpect)
  let updateData = (data:any) => dispatch(UpdateData(data))
  let updateExpectKey = () => dispatch( UpdateKeyOfExpect())

  let [inputNeeded , updateInput] = useState(false)


  useEffect(() => {
    data[index] = {}
    data[index][`firstInput${index}`] = 'type'
    data[index]['testTypes'] = 'equal'
    data[index][`lastInput${index}`] = ''
    updateData(data)
    updateExpectKey()
  },[])





  function handleChange(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>){
    // obtains the element that is needed
    let block = document.getElementById(id)

    // console.log(id)
    // checks to see if selector is equal to find

    if(event.target?.id === 'firstInput' + `${id}`){
      if((document.getElementById('firstInput' + `${id}`) as HTMLInputElement).value === 'find'){
        // changes the boolean checker to true
        updateInput(true)
        
        // creates an input box for the the find case
        let child = document.createElement('input')
        // child.innerHTML = `<input type = 'text' class= 'inputbox' id = 'wrapperInput${id}' onChange = {handleChange}/>`





        child.id = 'wrapperInput' + id.toString()
        child.className = 'inputbox'
        child.type = 'text'
        child.onchange = handleChange
        // appends to the document
        data[`${id}`][`wrapperInput${id}`] = ''

        console.log(block);
        if(block){
          block.appendChild(child)
        }
      }
      
      // every case where the selector is not equal to find
      else{
        updateInput(false)
        delete data[`${id}`][`wrapperInput${id}`]
        if(document.getElementById('wrapperInput' + id.toString())){
          let x = document.getElementById('wrapperInput'+ id.toString())
          console.log(x)
          if(x){
            x.remove()
          }
        }
      }
  
      // gets the value of the selected option
      data[`${id}`][`firstInput${id}`] = (document.getElementById('firstInput' + `${id}`) as HTMLInputElement).value
  
      // updates the store to hold the correct value of the first input box
      updateData(data)
    }
    else{
      data[`${id}`][`${event.target?.id}`] = event.target?.value
      updateData(data)
    }
    
    

    // use this later to get the values out of the boxes
    // let x = document.getElementsByClassName('inputbox')
    // for(let y of x){
    //  console.log(y)
    // }
    

    
    // console.log(x)
  }
  
  


  return(
    <div className = {`expect-block ${id}`} >
      <div id = {`${id}`}>
        <p>expect wrapper  
          
          <select id={"firstInput"+`${id}`} onChange = {handleChange}>
            <option value = 'type'>type</option>
            <option value = 'text'>text</option>
            <option value = 'find'>to find</option>
          </select>  
        </p>
      </div>
     
      <p>
        <select id="testTypes" onChange = {handleChange}>
            <option value = 'equal'>to Equal</option>
            <option value = 'match'>to Match</option>
            <option value = 'length'>to Have Length</option>
        </select>
        <input id = {'lastInput' + `${id}`}type = 'text' onChange = {handleChange}/>
      </p>
      {/* <button>Remove Expect</button> */}
    </div>
  )
  }
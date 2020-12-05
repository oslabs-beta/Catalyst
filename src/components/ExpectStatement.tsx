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
  // const [counter, updateCounter] = useState(0)
  let counter = 0
  let first:number
  const data = useSelector((state: any) => state.expects)
  const index = useSelector((state: any) => state.keyOfExpect)
  const allIts = useSelector((state:any) => state.its)

  let updateData = (data:any) => dispatch(UpdateData(data))
  let updateExpectKey = () => dispatch( UpdateKeyOfExpect())
  let deleteExpectFromStore = (data:any) => dispatch(deleteExpect(data))


  useEffect(() => {
    data[index] = {}
    // data[index][`firstInput${index}`] = '.type'
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
      // console.log(ReactDOM.findDOMNode(document.getElementById(`expect-block ${id}`)))
    }
    else{
      console.log('cannot remove expect block')
    }

  }

  function inputText(elementId: string, elementKey: string){
    
    // console.log(event.target?.value)
    // console.log(event.target.value)
    let text = (document.getElementById(elementId.replace('selector','input')) as HTMLInputElement).value
    data[`${id}`]['selectors'][`${elementId}`][`${elementKey}`] = text
    updateData(data)
    // console.log('hi')
    // console.log(elementKey)
    // console.log(elementId)
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>){
    // obtains the element that is needed
    let block = document.getElementById(id)
    // console.log(id)
    // checks to see if selector is equal to find

    // if(event.target?.id === 'firstInput' + `${id}`){
    //   if((document.getElementById('firstInput' + `${id}`) as HTMLInputElement).value === '.find'){
    //     // changes the boolean checker to true
        
    //     // creates an input box for the the find case
    //     let child = document.createElement('input')
    //     // child.innerHTML = `<input type = 'text' class= 'inputbox' id = 'wrapperInput${id}' onChange = {handleChange}/>`





    //     child.id = 'wrapperInput' + id.toString()
    //     child.className = 'inputbox'
    //     child.type = 'text'
    //     child.onchange = handleChange
    //     // appends to the document
    //     data[`${id}`][`wrapperInput${id}`] = ''


    //     let secondSelector = document.createElement('select')
    //     secondSelector.id = `selector${id}`
    //     secondSelector.className = 'expectdrop1'
    //     secondSelector.innerHTML = `
    //     <option value = 'nothing'></option>
    //     <option value = '.type'>type</option>
    //     <option value = '.text'>text</option>
    //     <option value = '.find'>to find</option>
    //     <option value = '.exists'>to exist</option>`
    //     // secondSelector.onchange = handleChange
    //     data[`${id}`][`selector${id}`] = 'nothing'
    //     secondSelector.onchange = handleChange

    //     // console.log(block);
    //     if(block){
    //       block.appendChild(child)
    //       block.appendChild(secondSelector)
    //     }
    //   }
      
    //   // every case where the selector is not equal to find
    //   else{
    //     delete data[`${id}`][`wrapperInput${id}`]
    //     delete data[`${id}`][`selector${id}`]
    //     if(document.getElementById('wrapperInput' + id.toString())){
    //       let wrapperinput = document.getElementById('wrapperInput'+ id.toString())

    //       if(wrapperinput){
    //         wrapperinput.remove()
    //       }
    //     }
    //     if(document.getElementById('selector' + id.toString())){
    //       delete data[`${id}`][`selectorInput${id}`]
    //       let selector = document.getElementById('selector'+ id.toString())
    //       if(selector){
    //         selector.remove()
    //       }
    //       let selectorInput = document.getElementById(`selectorInput${id}`)
    //       if(selectorInput){
    //         selectorInput.remove()
    //       }
    //     }
    //   }
  
    //   // gets the value of the selected option
    //   data[`${id}`][`firstInput${id}`] = (document.getElementById('firstInput' + `${id}`) as HTMLInputElement).value
  
    //   // updates the store to hold the correct value of the first input box
    // }

    // else if(event.target?.id === 'selector' + `${id}`){
    //   if((document.getElementById('selector' + `${id}`) as HTMLInputElement).value === '.find'){
    //     let child = document.createElement('input')

    //     child.id = 'selectorInput' + id.toString()
    //     child.className = 'inputbox'
    //     child.type = 'text'
    //     child.onchange = handleChange
    //     // appends to the document
    //     data[`${id}`][`selectorInput${id}`] = ''

    //     // console.log(block);
    //     if(block){
    //       block.appendChild(child)
    //     }

        
    //   }
    //   else{
    //     delete data[`${id}`][`selectorInput${id}`]
        
    //     if(document.getElementById('selectorInput' + id.toString())){
    //       let wrapperinput = document.getElementById('selectorInput'+ id.toString())

    //       if(wrapperinput){
    //         wrapperinput.remove()
    //       }
    //     }

    //   }
    //   data[`${id}`][`selector${id}`] = (document.getElementById('selector' + `${id}`) as HTMLInputElement).value
  
    //   // updates the store to hold the correct value of the first input box
    // }
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
      // updateCounter(counter +1)
      // data[`${id}`][`selectors`][`${event.target?.value}`] = ''
      if(block){
        block.appendChild(child)
        block.appendChild(secondSelector)
      }
      // updateCounter(counter +1)
      



      
      // else{
      //   console.log(counter)
      //   console.log(event.target.id)
      //   data[`${id}`]['selectors'][`${event.target?.id}`] = {}
      //   data[`${id}`]['selectors'][`${event.target?.id}`][`${event.target?.value}`] = ''
        
      //   let Selector = document.createElement('select')
      //   Selector.id = `expect${id}selector${counter}`
      //   Selector.className = 'expectdrop1'
      //   Selector.innerHTML = `
      //   <option value = 'nothing'></option>
      //   <option value = '.type'>type</option>
      //   <option value = '.text'>text</option>
      //   <option value = '.find'>to find</option>
      //   <option value = '.exists'>to exist</option>`
      //   // secondSelector.onchange = handleChange
      //   data[`${id}`][`selectors`][`expect${id}selector${counter}`] = 'nothing'
      //   Selector.onchange = handleChange

      //   // data[`${id}`][`selectors`][`${event.target?.value}`] = ''
      //   if(block){
      //     block.appendChild(Selector)
      //   }
      //   counter +=1 
      //   // updateCounter(counter +1)
      //   // updateCounter(counter +1)
      // }
      
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
          // console.log(`${keys}`.replace('selector','input'))
          document.getElementById(`${keys}`.replace('selector','input'))?.remove()
          counter--
        }
        else if(keys === event.target.id){
          checker = true
          document.getElementById(`${keys}`.replace('selector','input'))?.remove()
        }
      }
    }
    // else{
    //   data[`${id}`][`${event.target?.id}`] = event.target?.value
    // }
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
        <select className="expectdrop2" id="testTypes" onChange = {handleChange}>
            <option value = '.toEqual'>to Equal</option>
            <option value = '.toMatch'>to Match</option>
            <option value = '.toBe'>to Be</option>
            <option value = '.toHavelength'>to Have Length</option>
        </select>
        <input id = {'lastInput' + `${id}`}type = 'text' onChange = {handleChange}/>
      </div>
    </div>
  )
}
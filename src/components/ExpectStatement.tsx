import React, {useState} from 'react'

interface Props{
  id: string
}



export const ExpectStatement: React.FC<Props> = ({id}: Props) =>{

  let [inputNeeded , updateInput] = useState(false)

  function tester(){
    let block = document.getElementById(id)
    // console.log((document.getElementById('firstInput') as HTMLInputElement).value)
    if((document.getElementById('firstInput' + `${id}`) as HTMLInputElement).value === 'tofind'){
      updateInput(true)
     
      let child = document.createElement('input')
      child.id = 'inputbox' + id.toString()
      child.className = 'inputbox'
      child.type = 'text'
      if(block){
        block.appendChild(child)
      }
    }
    
    else{
      updateInput(false)
      if(document.getElementById('inputbox' + id.toString())){
        let x = document.getElementById('inputbox'+id.toString())
        console.log(x)
        if(x){
          x.remove()
        }
      }
    }

    // use this later to get the values out of the boxes
    // let x = document.getElementsByClassName('inputbox')
    // for(let y of x){
    //  console.log(y)
    // }
    

    
    // console.log(x)
  }
  
  


  return(
    <div id = {`${id}`}>
      <p>expect wrapper  
        
        <select id={"firstInput"+`${id}`} onChange = {tester}>
          <option value = 'type'>type</option>
          <option value = 'text'>text</option>
          <option value = 'tofind'>to find</option>
        </select>

        
        <select id="testTypes">
          <option >to Equal</option>
          <option >to Match</option>
          <option >to Have Length</option>
        </select>
      
      </p>
    </div>
  )
}
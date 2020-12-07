import React, {useEffect, useState, useRef} from 'react'

interface Props {
  id:string
}

export const PropLoader: React.FC<Props> =({id}) =>{
  let temp = useRef<any>([])
  let [propArray, updatePropArray] = useState<object[]>([])
  const [displayArray, updateDisplay] = useState<any>([])
  const [count, updateCount] = useState(0)


  useEffect(() =>{
    let display = []
    for(let x of propArray){
      for(let ele of Object.values(x)){
        display.push(ele)
      }
    }
    updateDisplay(display)
  },[propArray])

  function addProp(){
    let prop: {[k:string]:any}= {}
    prop[`describe${id}prop${count}`] = 
      <div className = 'propChild' id = {`describe${id}prop${count}`} key = {count}>
        <label className="proplabel">{count + 1}. </label>
        <input type = "text" placeholder = "key" onChange = {setKey}/>
        <input type = "text" placeholder = "value"  onChange = {setValue}/>
        <button className="removeprop" onClick ={test} id = {`describe${id}prop${count}button`}>X</button>
      </div>

    temp.current = temp.current.concat([prop])
    updatePropArray([...propArray, prop])
    updateCount(count +1)
  }

  function test(event: React.MouseEvent<HTMLButtonElement, MouseEvent>){
    let answer = []
    for(let x of temp.current){
      if(Object.keys(x)[0] !== event.target?.id.replace('button','')){
        answer.push(x) 
      }
    }
    temp.current = answer
    updatePropArray(answer)
  }



  function setKey(): void{

  }

  function setValue(): void{

  }

  
  return(
    <div className = 'Prop'>
      <br></br>
      <p>Props</p>
      <div>
        {displayArray}
      </div>

      <button className="addvalue" onClick = {addProp}>+ Prop</button>
    </div>
  )
}
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
        <input type = "text" placeholder = "key"/>
        <input type = "text" placeholder = "value"/>
        <button onClick ={test} id = {`describe${id}prop${count}button`}>X</button>
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

  // bug somewhere here that is making it crash when deleting first it block
  return(
    <div className = 'Prop'>
      Props
      <br></br>
      {displayArray}

      <button onClick = {addProp}>Add Value</button>
    </div>
  )
}
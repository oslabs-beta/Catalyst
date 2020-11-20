import React from 'react'
import fs from 'fs'

export const FileViewer: React.FC = () =>{

  let fileContent = fs.readFileSync()
  // console.log('this is it', fi)
  let x: any = fileContent.toString()
  let counter = 0 
  for(let space = 0; space < x.length -1; space++){
    if(x[space] === ' ' && x[space+1] === ' '){
      counter++
    }
  }
  let tabs = 50
  let color = 'blue'
  // move all in line styles into the css file
  let tester = x.split('\n').map((ele: string, id:number) =>{
    return <div style ={{display: 'flex', flexDirection: 'row'}}>
      <p>{id}</p> <p style = {{textIndent:` ${tabs}px`, color: `${color}`}}>{ele}</p>
    </div>
    
  })
  console.log(counter)
  console.log(x)
  // fs.writeFileSync('C:/Users/Danny/Documents/Codesmith/Projects/Catalyst/tester.txt', readMe)

  return(
    <div>
      <code>
        {tester}
        <p style = {{tabSize : '5'}}>hey</p>
      </code>
    </div>
  )
}

import React from 'react'
import { useSelector } from 'react-redux';
import fs from 'fs'


export const FileViewer: React.FC = () =>{
  let fileViewPath: string
  fileViewPath = useSelector((state: any) => state.fileToView);


  function pathToText(){
    let fileContent = fs.readFileSync(fileViewPath)
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
      return <div key={id} >
        <p>{id}</p> <p style = {{textIndent:` ${tabs}px`, color: `${color}`}}>{ele}</p>
      </div>
      
    })
    return tester
  }
  

  return(
      fileViewPath === '' ?
      <React.Fragment></React.Fragment>
      :
      <div>
        <code>
          {pathToText()}
        </code>
      </div>
      
  )
}
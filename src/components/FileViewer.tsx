import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {ClearFile} from '../reduxComponents/actions/actions'
import fs from 'fs'


export const FileViewer: React.FC = () =>{
  let fileViewPath: string
  const dispatch = useDispatch()
  fileViewPath = useSelector((state: any) => state.fileToView);
  const clearFileInStore = () => dispatch(ClearFile())

  function clearFile(){
    clearFileInStore()
  }



  function pathToText(){
    console.log(fileViewPath)
    let fileContent = fs.readFileSync(fileViewPath)
    // console.log('this is it', fi)
    let x: any = fileContent.toString()
    let counter = 0 
    for(let space = 0; space < x.length -1; space++){
      if(x[space] === ' ' && x[space+1] === ' '){
        counter++
      }
    }


    // move all in line styles into the css file
    let tester = x.split('\n').map((ele: string, id:number) =>{
      let start = 0
      while(ele[start] === ' '){
        start++
      }
      let spaces= ''
      for(let i = 0; i < Math.floor(start/2); i++){
        spaces+= '\t'
      }
      let begin = 5-id.toString().length
      let beginSpaces = id.toString()
      while(begin > 0){
        beginSpaces += ' '
        begin--
      }
      return <div key={id} className = 'codeLine'>
        <pre>{beginSpaces}{spaces}{ele} </pre>
      </div>
      
    })
    return tester
  }
  

  return(
      fileViewPath === '' ?
      <React.Fragment>
        <div className="emptyfileview">
          <h2 className="emptyfiletitle">No File Selected</h2>
          <p className="emptyfilebody">Click on a file in the project directory to view its code</p>
        </div>
      </React.Fragment>
      :
      <div className = 'codeBlock'>
        <div className ='buttonHolder'>
          <button onClick = {clearFile} className = 'clearFile remove'>X</button>
          <br></br>
        </div>
        <div className="blockcode">
          <code>
            {pathToText()}
          </code>
        </div>
      </div>
      
  )
}
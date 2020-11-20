import React, {useState} from 'react'
import {FileTree} from './FileTree'
import {FileViewer} from './FileViewer'
import {useSelector, useDispatch} from 'react-redux'
import {SetAge} from '../reduxComponents/actions/actions'

export const MainContent: React.FC = () =>{
  const [checker, updateChecker] = useState(1)
  const dispatch = useDispatch()
  const counterInStore = useSelector((state:any) => state.counter)
  const setAge = (checker:any) => dispatch(SetAge(checker))
  const fileTree = useSelector((state: any) => state.fileTree)

  function clicked(){
    updateChecker(checker +1)
    console.log(checker)
    setAge(checker)

  }



  return(
    <div style = {{display: 'flex', flexDirection : "row"}}>
      <div className = 'hey'>
        <FileTree />
      </div>
      <div>
        {counterInStore}
        <button onClick = {clicked}>Test</button>
      </div>
      <div>
        <FileViewer />
      </div>
      

    </div>
  )
}
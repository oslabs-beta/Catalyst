import React, {useState} from 'react'
import {FolderUpload} from './components/FolderUpload'
import {useSelector, useDispatch} from 'react-redux'
import {SetAge} from './reduxComponents/actions/actions'
import {FileTree} from './components/FileTree'


// interface here and then pass interface prop into React.FC

export const App: React.FC = () => {
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




  return (




    <div >
      <h1>
        Hello from Run Planet
      </h1>
      <FolderUpload />
      <FileTree />
      {counterInStore}
      <button onClick = {clicked}>Test</button>
    </div>
    
  )
};



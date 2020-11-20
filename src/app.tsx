import React from 'react'
import {useSelector} from 'react-redux'
import { MainContent } from './components/MainContent'
import {FolderUpload} from './components/FolderUpload'
import './app.scss'

export const App: React.FC = () => {

  const fileTree = useSelector((state: any) => state.fileTree)


  return(

    fileTree.length ?

    <MainContent />

    :

    <FolderUpload />

  )
};



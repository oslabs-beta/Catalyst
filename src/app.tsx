import React from 'react'
import {useSelector} from 'react-redux'
import { MainContent } from './components/MainContent'
import {FolderUpload} from './components/FolderUpload'
import {useSelector, useDispatch} from 'react-redux'
import {SetAge} from './reduxComponents/actions/actions'
import {FileTree} from './components/FileTree'
import TestBuilder from './components/TestBuilder';
import './stylesheets/styles.scss'


// interface here and then pass interface prop into React.FC
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



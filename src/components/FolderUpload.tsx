import React from 'react';
import {remote} from 'electron';
import * as electronFs from 'fs';
import { useDispatch} from 'react-redux';
import { ConstructFileTree, SetProjectPath } from '../reduxComponents/actions/actions';
import catalystLogo from '../../assets/catalyst_icons/Catalystfull-02.png';

export class FileTree {
    filepath: string;
    name: string;
    children: FileTree[];


    constructor(filepath: string, name: string){
        this.filepath = filepath;
        this.name = name;
        this.children = [];
    }


    // directory will be root directory path
    createTree(directory: string): FileTree[]{
        let treeElements: FileTree[] = [];

        // readdirSync will return all the names of the files in the directory as an array 
        electronFs.readdirSync(directory).forEach((fileName: string) =>{
            if(fileName !== ".git" && fileName !== "node_modules" && fileName !== "dist" && fileName!== "assets" && fileName !== ".DS_Store" && fileName !== ".eslintrc" && fileName !== "README.md" && fileName !== "package-lock.json" && fileName !== "package.json" && fileName !== ".gitignore" && fileName !== "build" && fileName !== ".vscode" && fileName !== "webpack.config")
            {
                let fileInfo = new FileTree(directory + "/" + fileName, fileName);

                // statsync will return an object with properties of the filepath indicated
                let moreFileInfo = electronFs.statSync(fileInfo.filepath);
                
                // if the file that is currently at is a directory it will append the children to it
                if(moreFileInfo.isDirectory()){
                    fileInfo.children = fileInfo.createTree(fileInfo.filepath);
                }

                treeElements.push(fileInfo);
            }

        })
        return treeElements;
    }
}

export const FolderUpload: React.FC = () => {
    const dispatch = useDispatch();
    // creates dispatch that will send file path as an action payload to reducer
    const constructFileTree = (files: any) => dispatch(ConstructFileTree(files));
    const setFilePath = (filePath: any) => dispatch(SetProjectPath(filePath));

    const dialog = remote.dialog;
    async function uploadFolder(){
        // allows users to upload a folder 
        const Project = await dialog.showOpenDialog(
            // sets opendirectory (allows directories to be selected) to be the feature that dialog uses
            {properties: ['openDirectory'],
            // the types of files that will be displayed or selected 
            filters: [
                { name: 'Javascript Files', extensions: ['js', 'jsx']},
                { name: 'Typescript Files', extensions: ['ts', 'tsx']},
                { name: 'HTML Files', extensions: ['html']}
            ],
            message: 'Choose a Project to Create Tests for:'
        })

        // if the user cancels the action then undefined will be returned
        // if the user successfully completes the action then a string array will be returned
         // Project is an object that holds canceled (boolean to check if it was cancelled) and filePaths (array of filepaths)
        if(Project && !Project.canceled){
            // holds the directory of the project that was selected 
            let projectDirectory = Project.filePaths[0];

            // use regex to find all \ in the case of a windows user and replace with /
            projectDirectory = projectDirectory.replace(/\\/g, '/');
            
            // will create a new FileTree object for the root directory
            const rootTree = new FileTree(projectDirectory, "root");

            // will return an array of FileTree objects along with any children associated with it 
            const fileTree = rootTree.createTree(projectDirectory);
            // dispatches fileTree to reducer
            constructFileTree(fileTree);
            // setting file path of project to access later by sending projectDirectory to store
            setFilePath(projectDirectory);
        }
    }


    return(
        <div className="frontpage">
            <div className="frontheader">
                <img className ="catalystlogo" src={catalystLogo}/>
            </div>
            <div className="frontbody">
                <h6 className="fronth2">Make tests quickly</h6>
                <p>No coding necessary</p>
                <button className="folderupload" onClick = {uploadFolder}>
                    <span>Get Started</span>
                    <div className="icon">
                        <i className="fas fa-upload"></i>
                    </div>
                </button>
            </div>
        </div>
    )
}

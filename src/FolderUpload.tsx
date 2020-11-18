import * as React from 'react'
import * as electron from 'electron'
import {remote} from 'electron'


export const FolderUpload: React.FC = () => {

    const dialog = remote.dialog
    async function uploadFolder(){
        // allows users to upload a folder 
        const Project = await dialog.showOpenDialog(
            {properties: ['openDirectory'],
            // the types of files that will be displayed or selected 
            filters: [
                { name: 'Javascript Files', extensions: ['js', 'jsx']},
                { name: 'Typescript Files', extensions: ['ts', 'tsx']},
                { name: 'HTML Files', extensions: ['html']}
            ],
            message: 'please choose a project'
        })

        // if the user cancels the action then undefined will be returned
        // if the user successfully completes the action then a string array will be returned
         // Project is an object that holds canceled (boolean to check if it was cancelled) and filePaths (array of filepaths)
        if(Project && !Project.canceled){
            // holds the directory of the project that was selected 
            let projectDirectory = Project.filePaths[0]
            console.log(projectDirectory)
        }
    }


    return(
        <div>
            <button onClick = {uploadFolder}>Upload Project</button>
        </div>
    )
}

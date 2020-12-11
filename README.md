![](https://i.imgur.com/OpWjHnD.png)

## What is Catalyst?

Catalyst is an application which allows developers to generate unit test cases for components utilizing the Jest framework and Javascript's Enzyme testing utility. With its interactive GUI, the creation of test code can be completed with just a few clicks.

Catalyst is currently in beta and compatible for use with React 16.

## Installation

First download the app [here](https://www.catalystjs.com/)

Or you can also get started by cloning the repo using

    git clone https://github.com/oslabs-beta/Catalyst.git

- Once you have the repo on your system, install all the dependencies using:

      npm install

- After that is completed, you can open our app using:

      npm run dev

Prior to running exported tests, Jest, Enzyme, and Enzyme Adapter for React 16 must be installed.
To do this, enter the following line in the command line interface of your project's directory:

    npm install --save-dev jest enzyme enzyme-adapter-react-16

## How to use

1. Select the root folder for the project you would like to create tests for.

![](https://i.imgur.com/o1EVl5B.gif)

  Opitonally, you can select which file you want to generate tests for and preview the component of choice on the right.

![](https://i.imgur.com/XV6acqK.gif)

2. Using our interactive GUI, choose from Enzyme's matcher API and fill in their respective selectors. If the selected matcher does not require a selector input, leave blank. Additionally, selector input box can be the value of your choosing. Once completed, click the 'Generate Tests' button to preview your test code.

![](https://i.imgur.com/Yze4a98.gif)

3.  If satisfied, click the 'Export Test Code' button, name your 
file, and select the save button to save the generated code in your project. Catalyst will save this file in a \_\_tests\_\_ folder for you automatically if it doesn't already exist.

![](https://i.imgur.com/bCiQj4O.gif)

4. Icons located in the right corner of application open additional windows with links to Catalyst's Github, Enzyme's official documentation, and a Enzyme Cheat Sheet.

## Contributing

This project is still very early in development, so please inform our team of any issues found in the application or if you have any suggestions. 
Feel free to reach out to the development team if you'd like to make a pull requrest to add new features to this project.

## License
Distributed under the MIT License. See LICENSE for more information.

## Authors

> Jon Ascencio [jascenc1](https://github.com/jascenc1) &nbsp;&middot;&nbsp;
> Danny Chung [chungdanny64](https://github.com/chungdanny64) &nbsp;&middot;&nbsp;
> Gavin Crews [gcrews1894](https://github.com/gcrews1894) &nbsp;&middot;&nbsp;
> Jarryl Oquias [jaroqui17](https://github.com/jaroqui17)

import * as React from 'react';
import { DescribeBlock } from './DescribeBlock';

export const TestBuilder: React.FC = () => {

  function getAllData(){
   
  }





  return (
    <div className="testBuilder">
      <button className="mainButton newTest">New Test</button>
      <button className="mainButton undo">Undo</button>
      <button className="mainButton newComponent">New Component</button>
      <form>
        <label>Enter Component Name: </label>
        <input/>
        <DescribeBlock/>
      </form>
      <button onClick = {getAllData}>Submit</button>
    </div>
  )
};

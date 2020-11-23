import * as React from 'react';
import {DescribeBlock} from './DescribeBlock';

export const TestBuilder: React.FC = () => {

  function getAllData(){
   
  }





  return (
    <div>
      <button>New Test</button>
      <button>Undo</button>
      <button>New Component</button>
      <form>
        <label>Enter Component Name: </label>
        <input></input>
        <DescribeBlock/>
      </form>
      <button onClick = {getAllData}>Submit</button>
    </div>
  )
};

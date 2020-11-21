import * as React from 'react';
import {DescribeBlock} from './DescribeBlock';

export const TestBuilder: React.FC = () => {
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
      <button>Submit</button>
    </div>
  )
};

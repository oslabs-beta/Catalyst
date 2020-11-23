import * as React from 'react';
import { TestingBlock } from './TestingBlock';



export const DescribeBlock = (props: any) => {
  return (
    <div>
      <p>Describe Block</p>
      <input type="text" placeholder="What functionality should the component have?"/>
      <TestingBlock/>
      <button>Nest Describe Block</button>
    </div>
  )

}


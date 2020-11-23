import  React, {useState} from 'react';
import { ItStatement } from './ItStatement';
import { TestingBlock } from './TestingBlock';
import {useSelector, useDispatch} from 'react-redux';






export const DescribeBlock = (props: any) => {

  const describeBlocks = useSelector((state: any) => state.describe);
  const describeIndex = useSelector((state: any) => state.describeCounter)
  



  return (
    <div className = 'describeBlock'>
      <div>
        <p>Describe Block</p>
        <input type="text" placeholder="What functionality should the component have?"/>
        <TestingBlock/>
        <ItStatement/>
        </div>
    </div>
    
  )

}


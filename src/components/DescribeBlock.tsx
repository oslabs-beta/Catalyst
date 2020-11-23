import  React, {useState, useEffect, useImperativeHandle} from 'react';
import { ItStatement } from './ItStatement';
import { TestingBlock } from './TestingBlock';
import {useSelector, useDispatch} from 'react-redux';
import { UpdateKeyOfItObj } from '../reduxComponents/actions/actions';






export const DescribeBlock = (props: any) => {

  const describeBlocks = useSelector((state: any) => state.describe);
  const describeIndex = useSelector((state: any) => state.describeCounter);
  const itStatementIndex = useSelector((state: any) => state.keysOfItsObj);

  const dispatch = useDispatch();

  const updateItObjIndex = () => dispatch(UpdateKeyOfItObj());


  useEffect(() =>{

  })







  return (
    <div className = 'describeBlock'>
      <div>
        <p>Describe Block</p>
        <input type="text" placeholder="What functionality should the component have?"/>
        <TestingBlock/> 
        {/* pass in prop so that it knows which It statement it belongs to  */}
        <ItStatement itProp = {'0'}/>
      </div>

    </div>
    
  )

}


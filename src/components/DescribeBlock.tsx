import  React, {useState, useEffect} from 'react';
import { ItStatement } from './ItStatement';
import { TestingBlock } from './TestingBlock';
import {useSelector, useDispatch} from 'react-redux';
import { UpdateKeyOfItObj, UpdateKeyOfIt, UpdateDescribe, UpdateComponentName, AddComponentName } from '../reduxComponents/actions/actions';
import { createImportSpecifier } from 'typescript';

interface Props{
  describeProp:string
}




export const DescribeBlock:React.FC<Props> = ({describeProp}) => {

  const describeBlocks = useSelector((state: any) => state.describe);
  const describeIndex = useSelector((state: any) => state.describeCounter);
  const itStatementIndex = useSelector((state: any) => state.keysOfItsObj);
  const globalDescribeObj = useSelector((state:any) => state.describes)
  const index = useSelector((state: any) => state.keyOfIt)
  const componentObj = useSelector((state: any) => state.componentObj);

  
  
  let [arrayOfIt, updateItArray] = useState([])
  let [componentName, updateName] = useState('')


  const dispatch = useDispatch();

  const updateItObjIndex = () => dispatch(UpdateKeyOfItObj());
  const updateItKey = () => dispatch(UpdateKeyOfIt())
  const updateGlobalDescribe = (data:any) => dispatch(UpdateDescribe(data))
  const updateComponentName = (name:string) => dispatch(UpdateComponentName(name))


  
  useEffect(async():Promise<void> =>{
    let itComponent: {[k:string]:any}= {}
    itComponent[`${index}`] = await (<ItStatement key = {`${index}`} id = {`${index}`} itProp ={`${index}`}/>)
    updateItArray(arrayOfIt.concat(itComponent[`${index}`]))
    updateItKey()
  }, [])




  async function addIt(){
    let itComponent: {[k:string]:any}= {}
    itComponent[`${index}`] = await (<ItStatement key = {`${index}`} id = {`${index}`} itProp ={`${index}`}/>)
    globalDescribeObj[`${describeProp}`] = globalDescribeObj[`${describeProp}`].concat(index)
    updateGlobalDescribe(globalDescribeObj)
    updateItArray(arrayOfIt.concat(itComponent[`${index}`]))
    updateItKey()
  }

  function addComponentName(input: any) {
    componentObj[describeProp] = input;
    // console.log(componentObj)
  }
  

  return (
    <div className ='describeBlock'>
      <div>
        <p>Describe Block</p>
        <input type="text" onChange={(e) => addComponentName(e.target.value)} placeholder="What functionality should the component have?"/>
        <TestingBlock/>
        {/* pass in prop so that it knows which It statement it belongs to  */}
        {arrayOfIt}
      </div>
      <button onClick = {addIt}>Add It Statement</button>
    </div>
    
  )

}


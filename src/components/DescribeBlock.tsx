import  React, {useState, useEffect} from 'react';
import { ItStatement } from './ItStatement';
import {PropLoader} from './PropLoader';
import {useSelector, useDispatch} from 'react-redux';
import { UpdateKeyOfIt, UpdateDescribe, UpdateComponentName} from '../reduxComponents/actions/actions';

interface Props{
  describeProp:string,
  removeDescribe: (id:number) => boolean
};


export const DescribeBlock:React.FC<Props> = ({describeProp, removeDescribe}) => {

  const globalDescribeObj = useSelector((state:any) => state.describes);
  const index = useSelector((state: any) => state.keyOfIt);
  const componentObj = useSelector((state: any) => state.componentObj);


  let [arrayOfIt, updateItArray] = useState([]);


  const dispatch = useDispatch();

  const updateItKey = () => dispatch(UpdateKeyOfIt());
  const updateGlobalDescribe = (data:any) => dispatch(UpdateDescribe(data));
  const updateComponentName = (name:string) => dispatch(UpdateComponentName(name));


  const storeval: {[k:string]:any}= {};
  storeval[`${index}`]  = '';


  
  useEffect(async():Promise<void> =>{
    let itComponent: {[k:string]:any}= {};
    // creates a key value pair that will hold the index and the component 
    itComponent[`${index}`] = await (<ItStatement key = {`${index}`} id = {`${index}`} itProp ={`${index}`} removeIt = {removeIt}/>);
    // update the array to be displayed with the component that was created
    updateItArray(arrayOfIt.concat(itComponent[`${index}`]));
    // update the key value of the it statements
    updateItKey();

  }, [])


  async function addIt(){
    let itComponent: {[k:string]:any}= {};
    itComponent[`${index}`] = await (<ItStatement key = {`${index}`} id = {`${index}`} itProp ={`${index}`} removeIt = {removeIt}/>);
    // add the index of the created it component to the object holding all describe blocks
    // globalDescribeObj[`${describeProp}`] = globalDescribeObj[`${describeProp}`].concat(index)
    globalDescribeObj[`${describeProp}`][index] = '';
    // updates the describe element in the store
    updateGlobalDescribe(globalDescribeObj);
    // updates the array to be displayed
    updateItArray(arrayOfIt.concat(itComponent[`${index}`]));
    // increment the number of it statements since one was added 
    updateItKey();
  }

  function addComponentName(input: any): void {
    componentObj[describeProp] = input;
    updateComponentName(componentObj);
  }
  

  // removes the it block selected from the current describe block
  function removeIt(removeItId: number): boolean{
    // if there are more than one it statements then delete selected
    if(Object.keys(globalDescribeObj[describeProp]).length > 1){
      delete globalDescribeObj[describeProp][`${removeItId}`];
      updateGlobalDescribe(globalDescribeObj);
      return true;
    }
    // if there is only one it statement then return false to notify that it cannot be deleted
    return false;
  }

  function removeDescribeComponent(): void{
    removeDescribe(parseInt(describeProp));
  }


  return (
    <div className="describeBlock" id = {`describeBlock${describeProp}`}>
      <button className="remove" onClick = {removeDescribeComponent}>X</button>
      <div className="describe">
        <p className="describetext">Describe Block</p>
          <input className="describeinput" type="text" onChange={(e) => addComponentName(e.target.value)} placeholder="Please enter component name:" />
        <br></br>
        <form>
          <PropLoader id = {`${describeProp}`} key = {`describePropLoader${describeProp}`}/>
        </form>
        {arrayOfIt}
      </div>
      <button className="addit" onClick = {addIt}>+ It Statement</button>
    </div>
    
  )

}


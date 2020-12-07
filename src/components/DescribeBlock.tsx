import  React, {useState, useEffect} from 'react';
import { ItStatement } from './ItStatement';
import {PropLoader} from './PropLoader'
import {useSelector, useDispatch} from 'react-redux';
import { UpdateKeyOfIt, UpdateDescribe, UpdateComponentName, UpdatePropStore, UpdateDescribeBoolean } from '../reduxComponents/actions/actions';

interface Props{
  describeProp:string,
  removeDescribe: (id:number) => boolean
}




export const DescribeBlock:React.FC<Props> = ({describeProp, removeDescribe}) => {

  const globalDescribeObj = useSelector((state:any) => state.describes)
  const index = useSelector((state: any) => state.keyOfIt)
  const componentObj = useSelector((state: any) => state.componentObj);
  const propsInStore = useSelector((state:any) => state.describeProps)
  const propBoolean = useSelector((state:any) => state.describePropBoolean)

  const [propBool, updateProps] = useState(false)  
  const [renderProp, updateRender] = useState([]) 
  let [arrayOfIt, updateItArray] = useState([])


  const dispatch = useDispatch();

  const updateItKey = () => dispatch(UpdateKeyOfIt())
  const updateGlobalDescribe = (data:any) => dispatch(UpdateDescribe(data))
  const updateComponentName = (name:string) => dispatch(UpdateComponentName(name))
  const updatePropsInStore = (data:any) => dispatch(UpdatePropStore(data))
  const updatePropBooleanInStore = (data:any) => dispatch(UpdateDescribeBoolean(data))


  const storeval: {[k:string]:any}= {}
  storeval[`${index}`]  = ''


  
  useEffect(async():Promise<void> =>{
    let itComponent: {[k:string]:any}= {}
    // creates a key value pair that will hold the index and the component 
    itComponent[`${index}`] = await (<ItStatement key = {`${index}`} id = {`${index}`} itProp ={`${index}`} removeIt = {removeIt}/>)
    // update the array to be displayed with the component that was created
    updateItArray(arrayOfIt.concat(itComponent[`${index}`]))
    // update the key value of the it statements
    updateItKey()
  }, [])




  async function addIt(){
    let itComponent: {[k:string]:any}= {}
    itComponent[`${index}`] = await (<ItStatement key = {`${index}`} id = {`${index}`} itProp ={`${index}`} removeIt = {removeIt}/>)
    // add the index of the created it component to the object holding all describe blocks
    // globalDescribeObj[`${describeProp}`] = globalDescribeObj[`${describeProp}`].concat(index)
    globalDescribeObj[`${describeProp}`][index] = ''
    // updates the describe element in the store
    updateGlobalDescribe(globalDescribeObj)
    // updates the array to be displayed
    updateItArray(arrayOfIt.concat(itComponent[`${index}`]))
    // increment the number of it statements since one was added 
    updateItKey()
  }

  function addComponentName(input: any) {
    componentObj[describeProp] = input;
    // console.log(componentObj)
    updateComponentName(componentObj)
  }
  

  
  function removeIt(removeItId: number): boolean{
    if(Object.keys(globalDescribeObj[describeProp]).length > 1){
      delete globalDescribeObj[describeProp][`${removeItId}`]
      updateGlobalDescribe(globalDescribeObj)
      return true
    }

    return false
  }

  function removeDescribeComponent(){
    removeDescribe(parseInt(describeProp))
  }

  function addProp(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> ){
    // if the checkbox is filled then add the prop loader
    if(!propBool){
      let prop: {[k:string]:any}= {}
      prop[`0`] = <PropLoader id = {`${describeProp}`} key = {`describePropLoader${describeProp}`}/>
      updateRender(renderProp.concat(prop[`0`]))
      // adds the describe index as a key to the props store
      propsInStore[`${describeProp}`] = {}
    }
    // if it is not filled then clear the prop loader
    else{
      updateRender([])
      // deletes the describe index from the prop store
      delete propsInStore[`${describeProp}`]
    }

    updatePropsInStore(propsInStore)
    propBoolean[`${describeProp}`] = !propBoolean[`${describeProp}`]
    updatePropBooleanInStore(propBoolean) 
    updateProps(!propBool)
  }

  return (
    <div className="describeBlock" id = {`describeBlock${describeProp}`}>
      <button className="remove" onClick = {removeDescribeComponent}>X</button>
      <div className="describe">
        <p className="describetext">Describe Block</p>
        <input className="describeinput" type="text" onChange={(e) => addComponentName(e.target.value)} placeholder="Please enter component name:"/><br></br>
        <React.Fragment>
          <input type="checkbox" id="addProps" name="addProps" onChange = {addProp}/>
          <label htmlFor="addProps">Add Props</label>
        </React.Fragment>
        {renderProp}
        {/* pass in prop so that it knows which It statement it belongs to  */}
        {arrayOfIt}
      </div>
      <button className="addit" onClick = {addIt}>+ It Statement</button>
    </div>
    
  )

}


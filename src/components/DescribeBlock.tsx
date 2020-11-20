import * as React from 'react';
import {connect} from 'react-redux';
import TestingBlock from './TestingBlock';

const mapStateToProps = (state: any) => ({

})

const mapDispatchToProps = {

}

const DescribeBlock = (props: any) => {
  return (
    <div>
      <p>Describe Block</p>
      <button className="exitButton">X</button>
      <input type="text" placeholder="What functionality should the component have?"/>
      <TestingBlock/>
      <button>Nest Describe Block</button>
    </div>
  )

}


export default connect(mapStateToProps, mapDispatchToProps)(DescribeBlock)
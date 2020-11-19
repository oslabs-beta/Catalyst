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
      <button>X</button>
      <input>What functionality should the component have?</input>
      <TestingBlock/>
      <button>+ It Statement</button>
    </div>
  )

}


export default connect(mapStateToProps, mapDispatchToProps)(DescribeBlock)
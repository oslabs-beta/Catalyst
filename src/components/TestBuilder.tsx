import * as React from 'react';
import {connect} from 'react-redux';
import DescribeBlock from './DescribeBlock';

const mapStateToProps = (state: any) => ({

})

const mapDispatchToProps = {

}

const TestBuilder = (props: any) => {
  return (
    <div className="testBuilder">
      <button className="mainButton newTest">New Test</button>
      <button className="mainButton undo">Undo</button>
      <button className="mainButton newComponent">New Component</button>
      <form>
        <label>Enter Component Name: </label>
        <input/>
        <DescribeBlock/>
      </form>
      <button>Submit</button>
    </div>
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(TestBuilder)
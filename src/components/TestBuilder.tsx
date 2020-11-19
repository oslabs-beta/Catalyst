import * as React from 'react';
import {connect} from 'react-redux';
import DescribeBlock from './DescribeBlock';

const mapStateToProps = (state: any) => ({

})

const mapDispatchToProps = {

}

const TestBuilder = (props: any) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(TestBuilder)
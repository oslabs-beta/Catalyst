import * as React from 'react';
import {connect} from 'react-redux';

const mapStateToProps = (state: any) => ({

})

const mapDispatchToProps = {

}

const TestingBlock = (props: any) => {
  return (
    <div>
      <p>The Component Should...</p>
      <input>E.g. Button renders correctly...</input>
    </div>
  )

}


export default connect(mapStateToProps, mapDispatchToProps)(TestingBlock)
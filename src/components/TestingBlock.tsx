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
      <button>X</button>
      <input>E.g. Button renders correctly...</input>
      <label>What type of test would you like to add?</label>
      <select id="testTypes">
        <option value="shallow">Shallow</option>
        <option value="render">Render</option>
        <option value="mount">Mount</option>
      </select>
      <label>How many 'it' statements would you like?</label>
      <input type="number" id="quantity" name="quantity" min="1" max="10"></input>
    </div>
  )

}


export default connect(mapStateToProps, mapDispatchToProps)(TestingBlock)
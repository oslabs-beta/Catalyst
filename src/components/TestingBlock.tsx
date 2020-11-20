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
<<<<<<< HEAD
      <input>E.g. Button renders correctly...</input>
=======
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
>>>>>>> e97b796ad50abb1a0e7e1068e078892eba3f50c1
    </div>
  )

}


export default connect(mapStateToProps, mapDispatchToProps)(TestingBlock)
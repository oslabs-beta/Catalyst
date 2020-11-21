import * as React from 'react';




export const TestingBlock = (props: any) => {
  return (
    <div>
      {/* <p> and button should be on same line */}
      <p>The Component Should...</p>
      <button className="exitButton">X</button>
      <input type="text" placeholder="E.g. Button renders correctly..."/>
      {/* dropdown and number input should be on same line */}
      <label>What type of test would you like to add?</label>
      <select id="testTypes">
        <option value="shallow">Shallow</option>
        <option value="render">Render</option>
        <option value="mount">Mount</option>
      </select>
      <label>How many 'it' statements would you like?</label>
      <input type="number" id="quantity" name="quantity" min="1" max="10"></input>
      {/* button to add expect statement, dropdowns to hold 'toBe', 'toEqual', etc */}
      <button>Add expect</button>
    </div>
  )

}



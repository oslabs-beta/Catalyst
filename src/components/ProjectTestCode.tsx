import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RemoveTestCode } from "../reduxComponents/actions/actions";

export const ProjectTestCode: React.FC = () => {
  const dispatch = useDispatch();
  const generatedTestCode = useSelector(
    (state: any) => state.generatedTestCode
  );
  const removeTestCode = () => dispatch(RemoveTestCode());

  const clearTestCode = () => {
    removeTestCode();
  };

  function pathToText() {
    const x: any = generatedTestCode;
    let counter = 0;
    for (let space = 0; space < x.length - 1; space++) {
      if (x[space] === " " && x[space + 1] === " ") {
        counter++;
      }
    }

    // move all in line styles into the css file
    const tester = x.split("\n").map((ele: string, id: number) => {
      let start = 0;
      while (ele[start] === " ") {
        start++;
      }
      let spaces = "";
      for (let i = 0; i < Math.floor(start / 2); i++) {
        spaces += "\t";
      }
      let begin = 5 - id.toString().length;
      let beginSpaces = id.toString();
      while (begin > 0) {
        beginSpaces += " ";
        begin--;
      }
      return (
        <div key={id} className="codeLine">
          <pre>
            {beginSpaces}
            {spaces}
            {ele}{" "}
          </pre>
        </div>
      );
    });
    return tester;
  }

  return generatedTestCode === "" ? (
    <></> // fragment shorthand
  ) : (
    <div className="codeBlock">
      <div className="buttonHolder">
        <button onClick={clearTestCode} className="clearFile remove">
          X
        </button>
      </div>
      <code>{pathToText()}</code>
    </div>
  );
};

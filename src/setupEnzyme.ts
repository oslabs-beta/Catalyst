/* eslint-disable import/no-extraneous-dependencies */
import * as Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({
  adapter: new Adapter(),
});

import { shallow, mount, render } from 'enzyme';
import * as React from 'react';
import { App } from '../src/app';

const wrapper = shallow(<App />);


describe('Hello, Enzyme!', () => {
  it('renders', () => {
    expect(wrapper).toMatchSnapshot();
  })
});
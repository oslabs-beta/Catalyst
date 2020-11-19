import { shallow, mount, render } from 'enzyme';
import * as React from 'react';
import { App } from '../src/app';
import { FolderUpload } from '../src/components/FolderUpload'

const wrapper = shallow(<App />);

describe('Testing app component', () => {
  it('renders', () => {
    expect(wrapper.exists()).toBe(true);
  })
  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })
  it('render FolderUpload component', () => {
    expect(wrapper.children(FolderUpload).length).toEqual(1);
  })
});
import React from 'react';
import { shallow } from 'enzyme';
//import ReactShallowRenderer from 'react-test-renderer/shallow';
import toJSON from 'enzyme-to-json';
import Header from '../../Components/Header';

test('should render header', () => {
   /* const renderer = new ReactShallowRenderer();
    renderer.render(<Header />);
    expect(renderer.getRenderOutput()).toMatchSnapshot();*/

    const wrapper = shallow(<Header />);
    expect(toJSON(wrapper)).toMatchSnapshot();

    //expect(wrapper.find('h1').length).toBe(1);
    //expect(wrapper.find('h1').text()).toBe('Expensify');



});
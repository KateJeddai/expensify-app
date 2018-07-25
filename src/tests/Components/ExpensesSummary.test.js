import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../Components/ExpensesSummary';

test('should correctly render expenses summary with one expense', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={1} expenseTotal={235} />);
    expect(wrapper).toMatchSnapshot();
});

test('should correctly render expenses summary with multiple expenses', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={23} expenseTotal={23500001} />);
    expect(wrapper).toMatchSnapshot();
});
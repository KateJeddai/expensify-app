import expensesReducer from '../../Reducers/expenses';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test('should set default state', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
});

test('should remove expense by id', () => {
    const action = ({
         type: 'REMOVE_EXPENSE',
         id: '2'
    });
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove the expense if id is not found', () => {
    const action = {
         type: 'REMOVE_EXPENSE',
         id: '5'
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test('should add an expense', () => {
    const action = {
       type: 'ADD_EXPENSE',
       expense: {
          id: expenses.length + 1,
          description: 'internet',
          notes: '',
          amount: 400,
          createdAt: moment(0).add(30, 'days').valueOf()
      }
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([...expenses, action.expense]);
});

test('should edit an expense', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: '2',
        updates: {
            description: 'TV',
            amount: 100
        }
    };
    
    const state = expensesReducer(expenses, action);
    expect(state[1]).toEqual({...expenses[1], ...action.updates});
});

test('should not edit an expense if id is not found', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: '10',
        updates: {
            description: 'TV',
            amount: 100
        }
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});
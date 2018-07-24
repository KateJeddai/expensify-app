import { addExpense, editExpense, removeExpense } from '../../Actions/expenses';

test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
})

test('should setup updates for expense action object', () => {
    const action = editExpense('123abc', { note: 'abc', description: '123' });
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            note: 'abc',
            description: '123'
        }
    })
})

test('should setup addexpense action object with provided values', () => {
    const expenseData = {
        description: 'rent',
        amount: 100,
        createdAt: 1000,
        notes: 'this was last month rent'
    };
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    })
});

test('should setup addexpense action object with default values', () => {
    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            description: '', 
            notes: '', 
            amount: 0, 
            createdAt: 0,
            id: expect.any(String)
        }
    });
});
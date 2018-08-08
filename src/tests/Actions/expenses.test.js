import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, 
         addExpense, 
         editExpense, 
         startEditExpense,
         removeExpense, 
         startRemoveExpense, 
         setExpenses, 
         startSetExpenses 
         } from '../../Actions/expenses';

import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const uid = 'testuid';
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({ id, description, amount, note, createdAt }) => {
        expensesData[id] = { id, description, amount, note, createdAt };
    })
    database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
});

test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
})

test('should remove expense from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[2].id;
    store.dispatch(startRemoveExpense({ id }))
         .then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: 'REMOVE_EXPENSE',
                id
            });
            return database.ref(`users/${uid}/expenses/${id}`).once('value')
         }).then((snapshot) => {
             expect(snapshot.val()).toBeFalsy();
             done();
         });
});

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

/*test('should edit expense from firebase', (done) => {
    const store = createMockStore({});
    const id = expenses[0].id;
    const updates = {
        amount: 200
    };
    store.dispatch(startEditExpense(id, updates))
         .then(() => {
             const actions = store.getActions();
             expect(actions[0]).toEqual({
                 type: 'EDIT_EXPENSE',
                 id, updates
             });
             return database.ref(`expenses/${id}`).once('value');
            }).then((snapshot) => {
                expect(snapshot.val().amount).toBe(updates.amount);
                done();
            }); 
});*/

test('should edit expense from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[0].id;
    const updates = { amount: 21045 };
    store.dispatch(startEditExpense(id, updates)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'EDIT_EXPENSE',
        id,
        updates
      });
      return database.ref(`users/${uid}/expenses/${id}`).once('value');
    }).then((snapshot) => {
      expect(snapshot.val().amount).toBe(updates.amount);
      done();
    });
  });


test('should setup addexpense action object with provided values', () => {
    const expenseData = {
        description: 'rent',
        amount: 100,
        createdAt: 1000,
        notes: 'this was last month rent'
    };
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    })
});

test('should add expense to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const expenseData = {
        description: 'Mouse',
        amount: '3000',
        notes: '',
        createdAt: 1000
    };
    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
         expect(snapshot.val()).toEqual(expenseData);
         done();   
    });
});

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const expenseDefault = {
        description: '',
        amount: 0,
        notes: '',
        createdAt: 0
    };
    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseDefault
            }
        });
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
         expect(snapshot.val()).toEqual(expenseDefault);
         done();   
    });
});

test('should setup set expense action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    })
});


test('should fetch the expenses from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses())
         .then(() => {
             const actions = store.getActions();
             expect(actions[0]).toEqual({
                 type: 'SET_EXPENSES',
                 expenses
             });
             done();
         });
});
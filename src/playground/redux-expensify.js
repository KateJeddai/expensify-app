import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// ADD EXPENSE
const addExpense = (
    { 
        description = '', 
        notes = '', 
        amount = 0, 
        createdAt = 0 
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        notes,
        amount,
        createdAt
    }
});

// REMOVE EXPENSE
const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

// EDIT EXPENSE
const editExpense = (id, updates) => ({
     type: 'EDIT_EXPENSE',
     id, updates
});

const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch(action.type){
        case 'ADD_EXPENSE':
            return [...state, action.expense];
        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => id !== action.id);
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if(expense.id === action.id){
                    return{
                        ...expense,
                        ...action.updates
                    }
                }
                else{
                    return expense;
                }
            })
        default: 
            return state;
    }
};

// SET TEXT FILTER
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT',
    text
});

// SET SORT 
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
})

// SET TIME
const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
});
const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
});

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch(action.type){
        case 'SET_TEXT':
            return {...state, text: action.text};
        case 'SORT_BY_AMOUNT':
            return {...state, sortBy: 'amount'};
        case 'SORT_BY_DATE':
            return {...state, sortBy: 'date'};
        case 'SET_START_DATE':
            return {...state, startDate: action.startDate};
        case 'SET_END_DATE':
            return {...state, endDate: action.endDate};    
        default: 
            return state;
    }
};

// GET VISIBLE EXPENSES
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
   return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
              
        return startDateMatch && endDateMatch && textMatch;
   }).sort((a,b) => {
       if(sortBy === 'date'){
           return a.createdAt < b.createdAt ? 1 : -1;
       }
       else if(sortBy === 'amount'){
           return a.amount < b.amount ? 1 : -1;
       }
   });
};

// create store
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});

const expenseTwo = store.dispatch(addExpense({ description: 'coffee', amount: 300, createdAt: -1000 }));
const expenseOne = store.dispatch(addExpense({ description: 'January rent', amount: 100, createdAt: 1000 }));
const expenseThree = store.dispatch(addExpense({ description: 'February Rent', amount: 600, createdAt: 1200 }));
//store.dispatch(removeExpense({ id: expenseOne.expense.id }));
//store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

//store.dispatch(setTextFilter('rent'));
//store.dispatch(setTextFilter());
store.dispatch(sortByAmount());
//store.dispatch(sortByDate());
//store.dispatch(setStartDate(125));
//store.dispatch(setTextFilter('ffee'));
//store.dispatch(setStartDate());
//store.dispatch(setEndDate(1250));


const demoState = {
    expenses: [{
        id: 'abc',
        description: 'January Rent',
        note: 'This was the final payment for this address',
        amount: 54500,
        ctreatedAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', // date or amount
        startDate: undefined,
        endDate: undefined
    }
};


/*const user = {
    name: 'abc',
    age: 24
};
console.log({
    ...user,
    age: 35,
    location: 'NY'
});*/
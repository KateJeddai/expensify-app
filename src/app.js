import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './Store/configureStore';
import { addExpense } from './Actions/expenses';
import { setTextFilter } from './Actions/filters';
import getVisibleExpenses from './Selectors/expenses';
import 'normalize.css/normalize.css';
import "./Styles/styles.scss";
import 'react-dates/lib/css/_datepicker.css'; 

const store = configureStore();

store.dispatch(addExpense( { description: 'Water bill', amount: 700, createdAt: 2000 } ));
store.dispatch(addExpense( { description: 'Gas bill', amount: 500, createdAt: 1000 } ));

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);

const jsx = (
    <Provider store={store}>
       <AppRouter /> 
    </Provider>
)

ReactDOM.render(
    jsx, 
    document.getElementById('app')
);


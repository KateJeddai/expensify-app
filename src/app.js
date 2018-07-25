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
console.log('testing');
//const state = store.getState();
//const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);

const jsx = (
    <Provider store={store}>
       <AppRouter /> 
    </Provider>
)

ReactDOM.render(
    jsx, 
    document.getElementById('app')
);


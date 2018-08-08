import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './Store/configureStore';
import { startSetExpenses } from './Actions/expenses';
import { login, logout } from './Actions/auth';
import getVisibleExpenses from './Selectors/expenses';
import 'normalize.css/normalize.css';
import "./Styles/styles.scss";
import 'react-dates/lib/css/_datepicker.css'; 
import { firebase } from './firebase/firebase';


const store = configureStore();
console.log('testing');
//const state = store.getState();
//const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);

const jsx = (
    <Provider store={store}>
       <AppRouter /> 
    </Provider>
)

let hasRendered = false;
const renderApp = () => {
    if(!hasRendered){
        ReactDOM.render(
            jsx, 
            document.getElementById('app')
        ); 
        const hasRendered = true;
    }
};

ReactDOM.render(
    <p>Loading...</p>, 
    document.getElementById('app')
);


firebase.auth().onAuthStateChanged((user) => {
    if(user){
        store.dispatch(login(user.uid));
        store.dispatch(startSetExpenses()).then(() => {
            renderApp();
            if(history.location.pathname === '/'){
                history.push('/dashboard');
            }
        });
        
    } else{
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }
});



import {createStore} from 'redux';

// ACTION GENERATORS 

const incrementCount = ({ incrementBy = 1 } = {}) => ({
      type: 'INCREMENT',
      incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
      type: 'DECREMENT',
      decrementBy
});

const setCount = ({ setBy = 200 } = {}) => ({
      type: 'SET',
      setBy
});

const resetCount = () => ({
    type: 'RESET'
});

// reducers

const countReducer = (state = {count: 0}, action) => {
    switch(action.type){
        case 'INCREMENT':
            return{
                count: state.count + action.incrementBy
            };
        case 'DECREMENT':
            return{
                count: state.count - action.decrementBy
            };
        case 'SET': 
            return{
                count: action.setBy
            };
        case 'RESET':
            return{
                count: 0
            };
        default: return state;    
    } 
};

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});


store.dispatch({
    type: 'INCREMENT',
    incrementBy: 5
}); 

//unsubscribe();

store.dispatch(incrementCount());

store.dispatch(incrementCount( { incrementBy: 5 } ));

store.dispatch(resetCount());

store.dispatch(decrementCount());

store.dispatch(decrementCount( { decrementBy: 10 } ));

store.dispatch(setCount( { setBy: 100 } ));




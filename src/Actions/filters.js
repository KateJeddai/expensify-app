// SET TEXT FILTER
export const setTextFilter = (text = '') => ({
    type: 'SET_TEXT',
    text
});

// SET SORT 
export  const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});
export const sortByDate = () => ({
    type: 'SORT_BY_DATE'
})

// SET TIME
export const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
});
export const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
});
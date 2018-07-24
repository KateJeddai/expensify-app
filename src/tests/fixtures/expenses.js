import moment from 'moment';

export default [
    {
       id: '1',
       description: 'rent',
       amount: 195,
       note: '',
       createdAt: 0
    },
    {
        id: '2',
        description: 'gum',
        amount: 1.5,
        note: '',
        createdAt: moment(0).subtract(4, 'days').valueOf()
     },
     {
        id: '3',
        description: 'coffee',
        amount: 5.5,
        note: '',
        createdAt: moment(0).add(4, 'days').valueOf()
     }
];
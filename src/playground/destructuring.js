const address = ['12 Street', 'NY', 'Texas', '83121'];
const [, town, state] = address;
console.log(`You are in ${town} which is in ${state}`);

const item = ['coffee', , '2.50'];
const [itemName, small, medium, large] = item;

console.log(`Medium ${itemName} is ${medium} dollars`);



const person = {
    name: 'Andrew',
    age: 10,
    location:{
        city: 'NY',
        temp: 22
    }    
};
const { name: firstName = 'Anonimous', age } = person;
const { city, temp: temperature } = person.location;
console.log(` ${firstName} is ${age} years old. He lives in ${city} where it is ${temperature} degrees today`);


const book = {
    title: 'ABC',
    author: 'B.C.',
    publisher: {
        name: 'House'
    }
};

const { title, author } = book;
const { name: publisherName = 'Pupu' } = book.publisher;

console.log(`This book title is ${title} by ${author} and it was published by ${publisherName}`);

import {sum, multiply} from "./module.js";
import {sum as sumAll} from './module_dublicated.js';
import Person, {sayHello} from "./Person.js";


console.log(sum(3,5));
console.log(sumAll(3,5, 8));
console.log(multiply(3,5));

const myPerson = new Person('Nikolay', 45);
console.log(myPerson);
console.log(sayHello(myPerson));

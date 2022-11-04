export default class Person{
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

export function sayHello(person){
    return `Hello from ${person.name}!`
}

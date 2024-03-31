// Classes (not relevant for full stack course - but good to know)

// The ES6 class syntax is used a lot in "old" React and also in Node.js

// There's no typical (object-oriented) class mechanism in JavaScript.
// But there are features to make "simulating" object-oriented classes possible.

// We define a "class" called Person and two Person objects:

class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    
    greet() {
        console.log('Hello, my name is ' + this.name + '.')
    }
}

const adam = new Person('Adam Ondra', 29)
adam.greet()

const janja = new Person('Janja', 'Garnbret', 23)
janja.greet()
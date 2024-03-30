// Object methods and "this" (not relevant for full stack course - but good to know)

// relevant when using older versions of React

const arto = {
    name: 'Arto Hellas',
    age: 35,
    education: 'PhD',
    greet : function() {
        console.log('Hello my name is ' + this.name + '.')
    },
    doAddition: function(a, b) {
        console.log(a + b)
    }
}

arto.growOlder = function() {
    this.age += 1
}

console.log(arto.age)   // prints 35 is printed
arto.growOlder()
console.log(arto.age)   // 36 is printed

arto.doAddition(1,4)    // 5 is printed

arto.greet()            // "Hello my name is Arto Hellas. " is printed

const referenceToGreet = arto.greet
referenceToGreet()      // "Hello my name is undefined." is printed

// When calling the method through a reference, the method loses
// knowledge of what the original this was.
// example for "disappearance" of this:

setTimeout(arto.greet, 1000)            // "Hello my name is undefined."

setTimeout(arto.greet.bind(arto), 1000) // "Hello my name is Arto Hellas."

// Calling arto.greet.bind(arto) creates a new function where this is
// bound to point to Arto, independent of where and how the method is
// being called.

// Using arrow functions it is possible to solve some of the problems
// related to this. They should not, however, be used as methods for
// objects because then this does not work at all. 

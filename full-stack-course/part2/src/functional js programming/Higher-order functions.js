// learning functional programming

// Why?
// - less bugs
// - easier to reason about
// - less time
// - Reuse more code

// Higher-order functions

// functions are values

// the basic function in its natural habitat:

function triple(x) {
    return x * 3
}

// not all programming languages can do this:
// create an anonymous function and assign it to a value:
function triple(x) {
    return x * 3
}

// functions can be assigned to variables or even passed into other functions
var waffle = triple

waffle(30) // = 90

// what are higher order functions good for?

// Composition: it allows us to put/compose smaller functions into bigger functions

// e.g. filter - a function on the array that accepts another function as its argument
// and then uses it to return new filtered version of the array

var animals = [
    {name: 'Fluffykins', species: 'rabbit'},
    {name: 'Caro', species: 'dog'},
    {name: 'Hamilton', species: 'dog'},
    {name: 'Harold', species: 'fish'},
    {name: 'Ursula', species: 'cat'},
    {name: 'Jimmy', species: 'fish'}
]

// how to filter out dogs using for loop:

// var dogs = []
// for (let i = 0; i < animals.length; i++) {
//     if (animals[i].species === 'dog') {
//         dogs.push(animals[i])
//     }
// }

// var dogs = animals.filter(function(animal) {
//     return animal.species === 'dog'
// })

// functions that you send into other functions are called callback-functions.
// filter loops through array and passes each item into callback-function
// then returns true/ false => tells filter whether it should be put in new array

// the version using filter uses a lot less code and less logic
// simple functions compose together => u can reuse functions a lot
// the only line of code logic is "return animal.species === 'dog'"

// filter and callback function are composable

// problem can be broken down into 2 seperate problems
// and callback function can be reused for other problems

var isDog = function(animal) {
    return animal.species === 'dog'
}

var dogs = animals.filter(isDog)

var otherAnimals = animals.reject(isDog)

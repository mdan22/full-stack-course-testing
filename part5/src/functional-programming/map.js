let animals = [
    {name: 'Fluffykins', species: 'rabbit'},
    {name: 'Caro', species: 'dog'},
    {name: 'Hamilton', species: 'dog'},
    {name: 'Harold', species: 'fish'},
    {name: 'Ursula', species: 'cat'},
    {name: 'Jimmy', species: 'fish'}
]

// var names = []
// for (let i = 0; i < animals.length; i++) {
//     names.push(animals[i].name)
// }

// console.log(names);

// loops through array 'animals' and pushes the names into array 'names'

// map is a function on the array object (just like filer)
// map takes a callback function as argument
// the callback function will be passed each item in the animals array

// map returns a transformed object for each item of the original array
// here: 'name' instead of 'animal' object respectively

// let names = animals.map(function(animal) {
//     return animal.name
// })

// using map to return a subset/property of an object is a very common usage pattern
// but since the callback is expected to return any object
// we could also use map to create completely new objects:

// let names = animals.map(function(animal) {
//     return animal.name + ' is a ' + animal.species
// })

// the syntax can be simplified to

let names = animals.map((x) => x.name + ' is a ' + x.species)
console.log(names);

// => less code is better bc it means less bugs
// it also looks more beautiful :)

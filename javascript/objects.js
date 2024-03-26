// object literals method to create objects:

const object1 = {
    name: 'Arto Hellas',
    age: 35,
    education: 'PhD',
}

const object2 = {
    name: 'Full Stack web application development',
    level: 'intermediate studies',
    size: 5,
}

const object3 = {
    name: {
        first: 'Dan',
        last: 'Abranov',
    },
    grades: [2, 3, 5, 3],
    department: 'Stanford University',
}

console.log(object1.name)
const fieldName = 'age'
console.log(object1[fieldName])
console.log(object1.education)

object1.address = 'Helsinki'
object1['secret number'] = 12341    // this has to be done in using brackets: secret number is not a valid property name bc of space character

console.log(object1)

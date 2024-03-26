// basic operations for using an array:
console.log("basic operations for using an array:")

const t = [1, -1, 3]

t.push(5)

console.log(t.length)   // 4 is printed
console.log(t[1])       // -1 is printed

t.forEach(value => {
    console.log(value)  // 1, -1, 3 and 5 are printed, each on its own line
})

const t2 = t.concat(5)  // creates new array

console.log(t)
console.log(t2)

const t3 = [1, 2, 3]


// map method:
console.log("map method:")

const m1 = t3.map(value => value*2)
console.log(m1)

const m2 = t.map(value => '<li>' + value + '</li>')
console.log(m2)


// destructuring assignment:
console.log("destructuring assignment:")

const t4 = [1, 2, 3, 4, 5]

const [first, second, ...rest] = t4

console.log(first, second)  // 1, 2 is printed
console.log(rest);


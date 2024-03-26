// the complete process to definining an arrow function:

const sum = (p1, p2) => {
    console.log(p1)
    console.log(p2)
    return p1 + p2
}

const result1 = sum(17, 42-17)
console.log(result1)

// if theres just a single parameter, we can exclude the parentheseses from the definition:

const square = p => {
    console.log(p)
    return p * p
}

const result2 = square(42)
console.log(result2)

// we can further shorten the function definition:

const squarev2 = p => p * p

// using this when using the map method:

const t = [1, 2, 3]
console.log(t)

const tSquared = t.map(squarev2)
console.log(tSquared)

// 2 ways to define functions using the keyword function:

// 1) function declaration:
function product(a, b) {
    return a * b
}

// 2) functional expression:
// no need to give the function a name. definition may reside among the rest of the code.

const average = function(a, b) {
    return (a + b) / 2
}

const result3 = average(42, 42*42)
console.log(result3)
console.log(product(result3, 2))

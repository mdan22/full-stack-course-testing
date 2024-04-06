// why learn reduce?
// you can use it everywhere

// what we learned before:

// filter, reject, map
// are all list transformations: they transform a list into something else
// map takes an array and transforms it into an array of same size but with all entries transformed
// filter transforms an array into a smaller array
// reject does same as filter but invertet
// find does same as filter but only returns the 1.item

// what if theres nothing that fits your transformationproblem?
// thats where reduce comes in

// reduce is the multi-tool of list transformations
// can be used to mirror any list transformation

// example:
// ur mission: add all the amounts

let orders = [
    {amount: 250},
    {amount: 400 },
    {amount: 100},
    {amount: 325}
]

// let totalAmount = 0;
// for (let i = 0; i < orders.length; i++) {
//     totalAmount += orders[i].amount;
// }

// console.log(totalAmount);

// loops thrpugh array 'orders' and adds '.amount' for each item to 'totalAmount'
// reduce needs an object as a starting point for the sum
// and it needs the array property as second parameter

// let totalAmount = orders.reduce(function(sum, order) {
//     // console.log("hello", sum, order);
//     return sum + order.amount
// }, 0)

let totalAmount = orders.reduce((sum, order) => sum + order.amount, 0)
console.log(totalAmount);

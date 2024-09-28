// average.test.js contains tests for the function 'average'
// the tests are written using the Node.js built-in assert module

const { test, describe } = require('node:test')
const assert = require('node:assert')

const average = require('../utils/for_testing').average

// using a describe block to group tests into a logical collection
describe('average', () => {
  test('of one value is the value itself', () => {
    assert.strictEqual(average([1]), 1)
  })

  test('of many is calculated right', () => {
    assert.strictEqual(average([1,2,3,4,5,6]), 3.5)
  })

  test('of empty array is zero', () => {
    assert.strictEqual(average([]), 0)
  })
})

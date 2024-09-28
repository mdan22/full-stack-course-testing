// for_testing.js is for testing purposes only

// reverses a string
const reverse = (string) => {
  return string
    .split('')
    .reverse()
    .join('')
}

// calculates the average of a number array
const average = (array) => {
  const reducer = (sum, item) => {
    return sum + item
  }

  // if array length is 0 we return 0, otherwise
  // we calculate the average using the reduce funtcion
  return array.length === 0
    ? 0
    : array.reduce(reducer, 0) / array.length
}

const for_testing = {
  reverse,
  average
}

module.exports = for_testing

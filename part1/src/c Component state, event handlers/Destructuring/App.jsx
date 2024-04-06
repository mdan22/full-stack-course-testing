const Hello = ({name, age}) => {

  // old syntax:
  // const bornYear = () => {
  //   const yearNow = new Date().getFullYear()
  //   return yearNow - props.age
  // }

  // destructuring:
  // you can destructure values from objects and arrays upon assignment

  // alt syntax instead of "const Hello = ({name, age}) => {"
  // const {age, name} = props

  // another alternate syntax:
  // const age = props.age
  // const name = props.name

  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old.
      </p>
      <p>
        So you were probably born in {bornYear()}.
      </p>
    </div>
  )
}

const App = () => {
  const name = 'Peter'
  const age = 10

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name='Maya' age={26+10} />
      <Hello name={name} age={age} />
    </div>
  )
}

export default App
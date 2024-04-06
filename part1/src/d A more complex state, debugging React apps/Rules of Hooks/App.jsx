import { useState } from "react"

  const Button = (props) => {
    console.log('props value is', props)
    const {handleClick, text} = props
    return(
      <button onClick={handleClick}>
        {text}
      </button>
    )
  }

  const App = () => {

    // hooks may only be called from the inside of a
    // function body that defines a React component:
    
    // these are ok

    const [age, setAge] = useState(0)
    const [name, setName] = useState('Juha Tauriainen')

    if (age > 10) {
      // this does not work!
      const [footbar, setFootbar] = useState(null)
    }

    for (let i = 0; i < age; i++) {
      // this is also bad
      const [rightWay, setRightWay] = useState(false);
    }

    const notGood = () => {
      // and this is illegal
      const [x, SetX] = useState(-1000)
    }

    return (
      <div>
        Nothing to see here - It's just for testing
      </div>
    )
  }

export default App

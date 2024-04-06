import { useState } from "react"

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const App = () => {
    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)

    const [allCLicks, setAll] = useState([])

    // The state of React components like allClicks
    // must not be mutated directly.
    // Even though it may work in some cases, it
    // can lead to problems that are very hard to debug.
    //
    // const handleLeftClick = () => {
    //     console.log(left)
    //     allCLicks.push('L')
    //     setAll(allCLicks)
    //     setLeft(left+1)
    // }

    const handleLeftClick = () => {
        console.log(left)
        setAll(allCLicks.concat('L'))
        setLeft(left+1)
    }

    const handleRightClick = () => {
        console.log(right)
        setAll(allCLicks.concat('R'))
        setRight(right+1)
    }

    return(
        <div>
            {left}
            <button onClick={handleLeftClick}>
                left
            </button>
            <button onClick={handleRightClick}>
                right
            </button>
            {right}
            {/* join(' ') joins all the items into a single string, separated by ' ' */}
            <p>{allCLicks.join(' ')}</p>
        </div>
    )
}

export default App

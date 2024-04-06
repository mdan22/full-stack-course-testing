import { useState } from "react"

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const App = () => {
    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)
    const [allCLicks, setAll] = useState([])
    const [total, setTotal] = useState(0)

    const handleLeftClick = () => {
        setAll(allCLicks.concat('L'))
        console.log('left before ', left)
        const updatedLeft= left+1
        setLeft(updatedLeft)
        console.log('left after ', left)
        setTotal(updatedLeft+right)
    }

    const handleRightClick = () => {
        setAll(allCLicks.concat('R'))
        const updatedRight = right+1;
        setRight(updatedRight)
        setTotal(left+updatedRight)
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
            <p>total {total}</p>
        </div>
    )
}

export default App

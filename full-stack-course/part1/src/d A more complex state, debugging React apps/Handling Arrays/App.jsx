import { useState } from "react"

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

// const App = () => {
//     const [left, setLeft] = useState(0)
//     const [right, setRight] = useState(0)

//     return(
//         <div>
//             {left}
//             <button onClick={() => setLeft(left+1)}>
//                 left
//             </button>
//             <button onClick={() => setRight(right+1)}>
//                 right
//             </button>
//             {right}
//         </div>
//     )
// }

const App = () => {
    const [clicks, setClicks] = useState({
        left: 0, right: 0
    })

    // old syntax:
    // const handleLeftClick = () => {
    //     const newClicks = {
    //         left: clicks.left+1,
    //         right: clicks.right
    //     }
    //     setCLicks(newClicks)
    // }

    // object spread syntax:
    // const handleLeftClick = () => {
    //     const newClicks = {
    //         ...clicks,
    //         left: clicks.left+1

    //     }
    //     setClicks(newClicks)
    // }

    // simplified syntax w/o extra variable newClicks:
    const handleLeftClick = () => {
        setClicks({
            ...clicks,
            left: clicks.left+1
        })
    }

    // this syntax variant seems to work but
    // it is forbidden in React to mutate state directly,
    // since it can result in unexpected side effects.
    // const handleLeftClick = () => {
    //     clicks.left++
    //     setClicks(clicks)
    //   }

    const handleRightClick = () => {
        setClicks({
            ...clicks,
            right: clicks.right+1
        })
    }

    // Storing all of the state in a single state object
    // is a bad choice for this particular application;
    // there's no apparent benefit and the resulting
    // application is a lot more complex. In this case,
    // storing the click counters into separate pieces of
    // state is a far more suitable choice.

    // There are situations where it can be beneficial to
    // store a piece of application state in a more complex
    // data structure. The official React documentation
    // contains some helpful guidance on the topic.

    return(
        <div>
            {clicks.left}
            <button onClick={handleLeftClick}>
                left
            </button>
            {clicks.right}
            <button onClick={handleRightClick}>
                right
            </button>
        </div>
    )
}


export default App
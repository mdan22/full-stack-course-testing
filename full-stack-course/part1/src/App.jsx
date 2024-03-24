const Hello = (props) => {
    console.log(props)
    return (
        <div>
            <p>
                Hello {props.name}, you are {props.age} years old
            </p>
        </div>
    )
}

const Footer = (props) => {
    console.log(props)
    return (
        <div>
            <p>© {props.year} - Daniel Kuhn</p>
        </div>
    )
}

const App = () => {
    const name = 'Peter'
    const age = 10

    const names = [
        'Peter', 'Maya'
    ]

    const friends = [
        { name: 'Peter', age: 4 },
        { name: 'Maya', age: 10 },
    ]

    return (
        <>
            <h1>Greetings</h1>
            <Hello name='Maya' age={26 + 10} />
            <Hello name={name} age = {age} />
            <Footer year = {new Date().getFullYear()} />

            <p>List of friends:</p>
            <ul>
                <li>{friends[0].name} {friends[0].age }</li>
                <li>{friends[1].name} {friends[1].age}</li>
            </ul>

            <p>List of friend names:</p>
            <p>{names}</p>
        </>
    )
}

export default App // this last line is important!

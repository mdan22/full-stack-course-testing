import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

// const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Table = () => {
  return (
    <table>
      <tbody>
        <tr>
          <td>Hi, I'm your first cell.</td>
          <td>Hi, I'm your second cell.</td>
          <td>Hi, I'm your third cell.</td>
          <td>Hi, I'm your fourth cell.</td>
        </tr>
        <tr>
          <td>Hi, I'm your first cell.</td>
          <td>Hi, I'm your second cell.</td>
          <td>Hi, I'm your third cell.</td>
          <td>Hi, I'm your fourth cell.</td>
        </tr>
      </tbody>
    </table>
  )
}

const App = () => {
  return (
    <div>
      <Header text="table" />
      <Table />
    </div>
  )
}

export default App
import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [value, setValue] = useState('')
  const [rates, setRates] = useState({})
  const [currency, setCurrency] = useState(null)

  useEffect(() => {
    console.log('effect run, currency is now', currency)

    // skip if currency is not defined
    if (currency) {
      console.log('fetching exchange rates...')
      axios
        .get(`https://open.er-api.com/v6/latest/${currency}`)
        .then(response => {
          setRates(response.data.rates)
        })
    }
  }, [currency])

  // the effect function is executed after the first render and
  // always after the table as its second parameter [currency] changes

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  // this app could also work without "useEffect" by using this onSearch implementation:

  // const onSearch = (event) => {
  //   event.preventDefault()
  //   axios
  //     .get(`https://open.er-api.com/v6/latest/${value}`)
  //     .then(response => {
  //       setRates(response.data.rates)
  //     })
  // }

  // However, there are situations where that technique would not work.

  const onSearch = (event) => {
    event.preventDefault()
    setCurrency(value)
  }

  return (
    <div>
      <form onSubmit={onSearch}>
        currency: <input value={value} onChange={handleChange} />
        <button type="submit">exchange rate</button>
      </form>
      <pre>
        {JSON.stringify(rates, null, 2)}
      </pre>
    </div>
  )
}

export default App
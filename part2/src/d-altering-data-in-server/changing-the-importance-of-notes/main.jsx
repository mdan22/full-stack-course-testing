import ReactDOM from 'react-dom/client'
import App from './App'
// import axios from 'axios'

// axios
//   .get('http://localhost:3001/notes')
//   .then(response => {
//     const notes = response.data
//     console.log(notes)
//     ReactDOM.createRoot(document.getElementById('root')).render(<App notes={notes}/>)
//   })

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

// Since we're going to be retrieving the notes from the server,
// there is no longer a need to pass data as props to the App component

import Course from "./components/Course"

const App = () => {

  const course = "Full-Stack-Course"
  
  // this would throw errors:
  // const course = {
  //   // ...
  // }

  console.log('App works...');
  
  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App

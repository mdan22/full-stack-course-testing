import Header from "./Header"

// const Course = ({course}) => {
//     return (
//         <Header course={course} />
//     )
// }

// Quite often the root of the problem is that
// the props are expected to be of a different type,
// or called with a different name than they
// actually have, and destructuring fails as a result.
// The problem often begins to solve itself when
// destructuring is removed and we see what the props contain.

const Course = (props) => {
    console.log(props);
    const {course} = props
    return (
        <div>
            <Header course={course}/>
        </div>
    )
}

// If the problem has still not been resolved, sadly there
// isn't much to do apart from continuing to bug-hunt by
// sprinkling more console.log statements around your code.
  
export default Course
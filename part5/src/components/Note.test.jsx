import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'

// test if content is rendered correctly
test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  // render the component with render()
  render(<Note note={note}/>)

  // we can use method screen.debug() to print
  // the HTML of a component to the terminal
  screen.debug()

  // #1
  // search for an element that has the note content
  // test fails if .getByText does not find the element
  // we wouldn't even need expect to test this
  const element = screen.getByText('Component testing is done with react-testing-library')

  // we can also print a wanted element to console
  screen.debug(element)

  // and ensure that the element exists
  // expect generates an assertion for its arguments
  // the validity of this assertion can be checked using e.g. toBeDefined()
  expect(element).toBeDefined()


  // #2
  // or use a container:
  const { container } = render(<Note note={note}/>)
  // and find rendered elements by using querySelector()
  const div = container.querySelector('.note')
    
  // and ensure that the container contains the note content
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )

  // #3
  // A more consistent way of selecting elements is using a
  // data attribute that is specifically defined for
  // testing purposes.
  // Using react-testing-library, we can leverage the
  // getByTestId method to select elements with a specified
  // data-testid attribute.
  const foundByTestId = screen.findByTestId('42')

  expect(foundByTestId).toBeDefined()
})

test('clicking the button calls event handler once', async () => {
  const note ={
    content: 'Component testing is done with react-testing library',
    important: true
  }

  // the event handler is a mock function defined with vitest
  const mockHandler = vi.fn()

  render(
    <Note note={note} toggleImportance={mockHandler}/>
  )

  // a session is started to interact with rendered components
  const user = userEvent.setup()

  // find button element that contains text 'make not important'
  const button = screen.getByText('make not important')

  // click that element
  await user.click(button)

  // expect that the mock function has been called exactly once
  expect(mockHandler.mock.calls).toHaveLength(1)
})

// test if test fails when trying to find text element
test('modified #1: renders content', () => {
  const note = {
    content: 'Does not work anymore :(',
    important: true
  }

  // render the component with render()
  render(<Note note={note}/>)

  // if we add text in the Note implementation like this:
  // Your awesome note: {note.content}
  // the getByText method no longer finds the element
  const element = screen.getByText('Does not work anymore :(')

  expect(element).toBeDefined()
})

// test if test passes when using getByText with parameter
// { exact: false } to find text element
test('modified #2: renders content', () => {
  const note = {
    content: 'Does not work anymore :(',
    important: true
  }

  // render the component with render()
  render(<Note note={note}/>)

  // if we add text in the Note implementation like this:
  // Your awesome note: {note.content}
  // we need to add {exact: false} flag so the getByText still finds the element
  const element = screen.getByText('Does not work anymore :(', { exact: false })

  expect(element).toBeDefined()
})

// note: unlike other ByText methods, getByText returns a promise!

// we can use queryByText() method to ensure that something is not rendered to the component
test('does not render this', () => {
  const note = {
    content: 'This is a reminder',
    important: true
  }

  render(<Note note={note} />)

  // the queryByText method returns the element but does not cause an exception if not found
  const element = screen.queryByText('do not want this thing to be rendered')
  expect(element).toBeNull()
})
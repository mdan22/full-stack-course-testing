import { render, screen } from '@testing-library/react'
import Note from './Note'
import { expect } from 'vitest'

// test if content is rendered correctly
test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  // render the component with render()
  render(<Note note={note}/>)

  // #1
  // search for an element that has the note content
  // test fails if .getByText does not find the element
  // we wouldn't even need expect to test this
  const element = screen.getByText('Component testing is done with react-testing-library')

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
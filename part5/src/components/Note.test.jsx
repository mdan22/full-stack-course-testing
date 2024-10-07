import { render, screen } from '@testing-library/react'
import Note from './Note'
// import { expect, test } from 'vitest'

// test if content is rendered correctly
test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  // render the component with render()
  render(<Note note={note}/>)

  // search for an element that has the note content
  const element = screen.getByText('Component testing is done with react-testing-library')

  // and ensure that the element exists
  expect(element) // expect generates an assertion for its arguments
    .toBeDefined() // the validity of this assertion can be checked using e.g. toBeDefined
})
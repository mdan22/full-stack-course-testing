import { render, screen } from '@testing-library/react'
import NoteForm from './NoteForm'
import userEvent from '@testing-library/user-event'

// test updating parent/textbox state and call of onSubmit
// by using expect(createNote.mock.calls).toHaveLength(1)
// and expect(createNote).mock.calls[0][0].content).toBe()
test('<NoteForm /> updates parent state and calls onSubmit', async () => {
  const createNote = vi.fn()
  const user = userEvent.setup()

  render(<NoteForm createNote={createNote} />)

  // this test doesn't pass anymore because there are multiple input fields
  // use getByRole() to access input field
  const input = screen.getByRole('textbox')
  // use getByText to find button
  const sendButton = screen.getByText('save')

  await user.type(input, 'testing a form...')
  await user.click(sendButton)

  // we can use console.log in tests to
  console.log(createNote.mock.calls)

  expect(createNote.mock.calls).toHaveLength(1)
  expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
})

// modified test #1 for 'About finding the elements'
test('Modified #1: <NoteForm /> updates parent state and calls onSubmit', async () => {
  const createNote = vi.fn()
  const user = userEvent.setup()

  render(<NoteForm createNote={createNote} />)

  // use getByAllRole() to access all input fields
  const inputs = screen.getAllByRole('textbox')
  // use getByText to find button
  const sendButton = screen.getByText('save')

  // need to use inputs[0] to access input field data
  await user.type(inputs[0], 'testing a form...')
  await user.click(sendButton)

  console.log(createNote.mock.calls)

  expect(createNote.mock.calls).toHaveLength(1)
  expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
})

// modified test #2 for 'About finding the elements'
test('Modified #2: <NoteForm /> updates parent state and calls onSubmit', async () => {
  const createNote = vi.fn()
  const user = userEvent.setup()

  render(<NoteForm createNote={createNote} />) 

  const input = screen.getByPlaceholderText('write note content here')
  const sendButton = screen.getByText('save')

  await user.type(input, 'testing a form...')
  await user.click(sendButton)

  expect(createNote.mock.calls).toHaveLength(1)
  expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
})

// modified test #3 for 'About finding the elements'
test('Modified #3: <NoteForm /> updates parent state and calls onSubmit', async () => {
  const createNote = vi.fn()
  const user = userEvent.setup()

  const { container } = render(<NoteForm createNote={createNote} />)

  // most flexible way of finding elements is method
  // querySelector() of the container object
  const input = (container.querySelector('#note-input'))
  const sendButton = screen.getByText('save')

  // here we can obviously access the data directly again by input
  await user.type(input, 'testing a form...')
  await user.click(sendButton)

  expect(createNote.mock.calls).toHaveLength(1)
  expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
})
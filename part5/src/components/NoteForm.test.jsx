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
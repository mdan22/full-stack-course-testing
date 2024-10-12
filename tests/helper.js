const loginWith = async (page, username, password)  => {
  // user toggles LoginForm using login button
  await page.getByRole('button', {name: 'log in'}).click()

  // form fields are found by their testid
  // and are filled with valid user credentials by user
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', {name: 'log in'}).click()
}

const createNote = async (page, content) => {
  // user clickes new note button which toggles NoteForm
  await page.getByRole('button', {name: 'new note'}).click()

  // the newnote field is filled with a note and save button is clicked
  await page.getByTestId('newnote').fill(content)
  await page.getByRole('button', {name: 'save'}).click()

  // slow down insert operations by using waitFor
  // so the notes are not inserted simultaneously
  await page.getByText(content).waitFor()
}

export {
  loginWith,
  createNote
}

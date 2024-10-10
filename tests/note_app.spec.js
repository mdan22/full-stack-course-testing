// first test file for e2e testing of our own application 
const { test, expect, describe, beforeEach } = require('@playwright/test')

describe('Note app', () => {
  beforeEach(async ({ page, request }) => {
    // empty db and post user before each test
    // by making HTTP requests with request.post to the backend
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: '$aLa1Nen'
      }
    })

    // all tests in this block are testing
    // the page at http://localhost:5173/
    await page.goto('http://localhost:5173/')
  })

  test('front page can be opened', async ({ page }) => {  
    // test if heading h1 Notes is visible
    const locator = await page.getByText('Notes')
    await expect(locator).toBeVisible()
  
    // test if Footer visible
    await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2024')).toBeVisible()
  })

  test('user can log in', async ({ page }) => {
    // user toggles LoginForm using login button
    await page.getByRole('button', {name: 'log in'}).click()

    // form fields are found by their testid
    // and are filled with valid user credentials by user
    await page.getByTestId('username').fill('mluukkai')
    await page.getByTestId('password').fill('$aLa1Nen')
    await page.getByRole('button', {name: 'log in'}).click()

    // successful login expected
    await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
  })

  // we need to log in (again) before each of the following tests
  // because all changes made to the browser's state by the previous
  // tests are reset
  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      // all tests in this block are testing
      // when user mluukkai is logged in
      await page.getByRole('button', {name: 'log in'}).click()
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('$aLa1Nen')
      await page.getByRole('button', {name: 'log in'}).click()
    })
    
    test('a new note can be created', async ({ page }) => {
      // user clickes new note button which toggles NoteForm
      await page.getByRole('button', {name: 'new note'}).click()

      // the newnote field is filled with a note and save button is clicked
      await page.getByTestId('newnote').fill('a note created by playwright')
      await page.getByRole('button', {name: 'save'}).click()

      // the saved note is then expected to be among the listed notes
      await expect(page.getByText('a note created by playwright')).toBeVisible()
    })
    
    describe('and a note exists', () => {
      beforeEach(async ({ page }) => {
        await page.getByRole('button', { name: 'new note' }).click()
        await page.getByTestId('newnote').fill('another note by playwright')
        await page.getByRole('button', { name: 'save' }).click()
      })

      test('importance can be changed', async ({ page }) => {
        // button of the single existing note is important by default so
        // the visible button to be clicked is labeled 'make not important'
        // user clicks the button
        await page.getByRole('button', { name: 'make not important' }).click()

        // then it is expected that an element labeled 'make important' is visible
        await expect(await page.getByText('make important')).toBeVisible()
      })
  })
  })

  test('login fails with wrong password', async ({ page }) => {
    // user toggles LoginForm using login button
    await page.getByRole('button', {name: 'log in'}).click()

    // form fields are found by their testid
    // and are filled with valid username but wrong password by user
    await page.getByTestId('username').fill('mluukkai')
    await page.getByTestId('password').fill('wrong')
    await page.getByRole('button', {name: 'log in'}).click()

    // failed login expected
    // find element by the specififc className
    const errorDiv = await page.locator('.error')
    // and expect it to contain the specific error text 'wrong credentials'
    await expect(errorDiv).toContainText('wrong credentials')
    // as well as borderstyle: 'solid'
    await expect(errorDiv).toHaveCSS('border-style', 'solid')
    // and color: 'rgb(255, 0, 0)'
    // colors must be defined as rgb codes in Playwright
    await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

    // expect the phrase 'Matti Luukkainen logged in'
    // (which would imply a successful login)
    // not to be rendered
    await expect(await page.getByText('Matti Luukkainen logged in')).not.toBeVisible()

  })
})

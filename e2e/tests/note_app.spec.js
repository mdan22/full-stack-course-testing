// first test file for e2e testing of our own application 
const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith, createNote } = require('./helper')

describe('Note app', () => {
  beforeEach(async ({ page, request }) => {
    // empty db and post user before each test
    // by making HTTP requests with request.post to the backend
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: '$aLa1Nen'
      }
    })

    // all tests in this block are testing the page
    // at http://localhost:5173 which is defined in config.js
    await page.goto('/')
  })

  test('front page can be opened', async ({ page }) => {  
    // test if heading h1 Notes is visible
    const locator = await page.getByText('Notes')
    await expect(locator).toBeVisible()
  
    // test if Footer visible
    await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2024')).toBeVisible()
  })

  test('user can log in', async ({ page }) => {
    // we now use the helper function loginWith to ensure non-repetitive code
    loginWith(page, 'mluukkai', '$aLa1Nen')

    // successful login expected
    await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
  })

  // we need to log in (again) before each of the following tests
  // because all changes made to the browser's state by the previous
  // tests are reset
  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      // all tests in this block are testing a scenario
      // when user mluukkai is logged in
      // we use helper function here too
      loginWith(page, 'mluukkai', '$aLa1Nen')
    })
    
    test('a new note can be created', async ({ page }) => {
      // we now use the helper function createNote to ensure non-repetitive code
      createNote(page, 'a note created by playwright')

      // the saved note is then expected to be among the listed notes
      await expect(page.getByText('a note created by playwright')).toBeVisible()
    })
    
    describe('and several notes exist', () => {
      beforeEach(async ({ page }) => {
        // we use helper function here too
        createNote(page, 'first note')

        // might need to adjust all 3 timeouts
        // depending on the machine
        await page.waitForTimeout(450)

        createNote(page, 'second note')
        await page.waitForTimeout(450)

        createNote(page, 'third note')
        await page.waitForTimeout(450)
      })

      test('importance can be changed', async ({ page }) => {
        // this command pauses the test execution at this point
        // when running npm test -- -g'importance can be changed' --debug
        // await page.pause()

        // the button of both existing notes is important
        // find + store span element which contains second note element
        const otherNoteText = await page.getByText('second note')

        await expect(otherNoteText).toBeVisible()

        // find + store actual second note element using locator function
        // .locator('..') finds the parent of an element
        const otherNoteElement = await otherNoteText.locator('..')

        // find button associated with second note
        // which is labeled 'make not important'
        const button = await otherNoteElement.getByRole('button', { name: 'make not important' })
        await expect(button).toBeVisible()

        // and click it
        button.click()

        // verify that the button's text has changed to 'make important'
        await expect(otherNoteElement.getByText('make important')).toBeVisible()
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

  // uncomment to see how .only works
  // describe(() => {
  //   // this is the only test executed!
  //   // useful if test is still being implemented and breaks a lot
  //   // once the test is ready / it passes, only can and should be deleted
  //   // Another option is running a test by specifying it in the command line:
  //   // npm test -- -g "login fails with wrong password"
  //   test.only('login fails with wrong password', async ({ page }) => {
  //     // ...
  //   })

  //   // example test that does not get executed (need to remove it later!!!)
  //   // this test is skipped...
  //   test('user can login with correct credentials', async ({ page }) => {
  //     // ...
  //   })
  // })
})

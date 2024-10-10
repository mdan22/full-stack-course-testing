// first test file for e2e testing of our own application 
const { test, expect, describe, beforeEach } = require('@playwright/test')

describe('Note app', () => {
  beforeEach(async ({ page }) => {
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

  test('login form can be opened', async ({ page }) => {
    await page.getByRole('button', {name: 'login'}).click()

    await page.getByTestId('username').fill('mluukkai')
    await page.getByTestId('password').fill('$aLa1Nen')
    await page.getByRole('button', {name: 'login'}).click()

    await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
  })
})

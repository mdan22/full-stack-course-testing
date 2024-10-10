// first test file for e2e testing of our own application 
const { test, expect } = require('@playwright/test');
const { describe } = require('node:test');

describe('Note app', () => {
  test('front page can be opened', async ({ page }) => {
    // tests are testing the page at http://localhost:5173/
    await page.goto('http://localhost:5173/');
  
    // test if heading h1 Notes is visible
    const locator = await page.getByText('Notes')
    await expect(locator).toBeVisible()
  
    // test if Footer visible
    await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2024')).toBeVisible()
  });  
})

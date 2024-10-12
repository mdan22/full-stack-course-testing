# full-stack-course-testing

This is a Repo for testing, coding, debugging stuff related to the full stack course that I'm doing rn.

The latest Version of the Note App from this repo is live at [mdan22-fsct.onrender.com](https://mdan22-fsct.onrender.com/) !

## Related Links

- find my main repo for part 1 + 2 submissions here:       https://github.com/mdan22/full-stack-course
  
- find my repo for part 3 submissions here:    https://github.com/mdan22/full-stack-course-part3

- find my repo for part 4 submissions here:    https://github.com/mdan22/full-stack-course-part4

- find the full-stack-course here:              https://fullstackopen.com/en/

## Technologies
<ul>
    <li>JavaScript</li>
    <li>Vite</li>
    <li>React</li>
    <li>Node.js</li>
</ul>

## A true full stack developer's oath
Full stack development is extremely hard, that is why I will use all the possible means to make it easier

- I will have my browser developer console open all the time
- I will use the network tab of the browser dev tools to ensure that frontend and backend are communicating as I expect
- I will constantly keep an eye on the state of the server to make sure that the data sent there by the frontend is saved there as I expect
- I will keep an eye on the database: does the backend save data there in the right format
- I progress with small steps
- when I suspect that there is a bug in the frontend, I'll make sure that the backend works as expected
- when I suspect that there is a bug in the backend, I'll make sure that the frontend works as expected
- I will write lots of console.log statements to make sure I understand how the code and the tests behave and to help pinpoint problems
- If my code does not work, I will not write more code. Instead, I'll start deleting it until it works or will just return to a state where everything was still working
- If a test does not pass, I'll make sure that the tested functionality works properly in the application
- When I ask for help in the course Discord channel or elsewhere I formulate my questions properly, see [here](https://fullstackopen.com/en/part0/general_info#how-to-ask-help-in-discord) how to ask for help

# Notes

## Part 5

### C - Testing React Apps

#### Frontend integration tests

- for backend we wrote integration tests in Part 4
- we intentionally did not write unit tests for simplicity
- for frontend we only wrote unit tests (they ensure correct functionality of an individual component)
- integration testing could be done here too but is considerably more difficult than unit testing
- end-to-end tests (which test the whole app) will be done in the last chapter of Part 5

#### Snapshot testing

- [snapshot testing](https://vitest.dev/guide/snapshot) is an alternate way of testing
- compares the HTML code defined by the component after it has changed to the HTML code that existed before it was changed
- the dev is asked to confirm if the changes are desired (new functionality) or undesired (bug)

### D - End to end testing: Playwright

- End to End (E2E) tests are a way to test a system as a whole
- only a browser and a testing library are needed
- potentially the most useful category of tests because they test the system through the same ui as real users use
- configuring E2E tests is more challenging than unit or integration tests
- recommended libraries: [Cypress](https://www.cypress.io/) and [Playwright](https://playwright.dev/)
- statistics on [npmtrends.com](https://npmtrends.com/cypress-vs-playwright) show that Playwright has become more popular lately
- Playwright is now the preferred E2E library for the course

#### Playwright

- Playwright is roughly on a par with Cypress in terms of ease of use
- Playwright's tests are executed in the Node process, which is connected to the browser via programming interfaces
- One advantage of Playwright is its browser support: it supports Chrome, Firefox and Webkit-based browsers like Safari

#### Initializing tests

- use `npm init playwright@latest` to install Playwright
- to run an E2E test...
  - frontend and backend need to run in the background
  - run `npm test` to run all tests
  - run `npm run test:report` to show the test report
- define the scripts in the package.json of the playwright project like this:

```javascript
{
  // ...
  "scripts": {
    "test": "playwright test",
    "test:report": "playwright show-report"
  },
  // ...
}
```

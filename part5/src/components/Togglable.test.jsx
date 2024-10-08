import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'

describe('<Togglable/>', () => {
  let container
  
  beforeEach(() => {
    container = render(
      <Togglable buttonLabel={"show..."}>
        <div className='testDiv'>
          togglable content
        </div>
      </Togglable>
    ).container
  })

  // test if its children r rendered
  // by searching for text using .findAllByText()
  test('renders its children', async () => {
    await screen.findAllByText('togglable content')
  })

  // test if children are not displayed at start
  // by finding element by CSS class '.togglableContent'
  // and expecting its css to contain style 'display: none'
  // using .toHaveStyle()
  test('at start the children are not displayed', () => {
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  // test if children r displayed after clicking the button
  // by letting the user click the button labeled with 'show...'
  // and expecting the togglableContent not to have style 'display none'
  // using .not.toHaveStyle()
  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })
  
  // test if toggled content can be closed again
  // by letting the user click the button labeled 'show...'
  // then the button labeled 'cancel'
  // then expect the togglableContent to have the style 'display: none' again
  test('toggled content can be closed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const closeButton = screen.getByText('cancel')
    await user.click(closeButton)

    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })
})
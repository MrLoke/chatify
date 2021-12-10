import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SignInForm from 'components/SignInForm/SignInForm'

const mockLogin = jest.fn((email, password) => Promise.resolve)

describe('SignInForm validation', () => {
  it('Should display error message if email field is empty', async () => {
    render(<SignInForm />)

    await act(async () => {
      userEvent.click(screen.getByLabelText('sign-in-button'))
    })

    expect(screen.getByText(/Email is required/i)).toBeInTheDocument()
    expect(mockLogin).not.toHaveBeenCalled()
  })

  it('Should display error message if email is invalid', async () => {
    render(<SignInForm />)

    userEvent.type(screen.getByLabelText('email-input'), 'email-input')
    await act(async () => {
      userEvent.click(screen.getByLabelText('sign-in-button'))
    })

    expect(screen.getByText(/Invalid e-mail address/i)).toBeInTheDocument()
    expect(mockLogin).not.toHaveBeenCalled()
  })

  it('Should display error message if password field is empty', async () => {
    render(<SignInForm />)

    await act(async () => {
      userEvent.click(screen.getByLabelText('sign-in-button'))
    })

    expect(screen.getByText(/Password is required/i)).toBeInTheDocument()
    expect(mockLogin).not.toHaveBeenCalled()
  })
})

it('Should be called log in when email and password are valid', async () => {
  mockLogin('demo@gmail.com', 'Demo123')
  render(<SignInForm />)

  userEvent.type(screen.getByLabelText('email-input'), 'demo@gmail.com')
  userEvent.type(screen.getByLabelText('password-input'), 'Demo123')

  await act(async () => {
    userEvent.click(screen.getByLabelText('sign-in-button'))
  })

  expect(mockLogin).toHaveBeenCalled()
  expect(mockLogin).toHaveBeenCalledWith('demo@gmail.com', 'Demo123')
})

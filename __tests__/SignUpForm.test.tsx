import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SignUpForm from 'components/SignUpForm/SignUpForm'

const mockSignUp = jest.fn((email, password) => Promise.resolve)

describe('SignUpForm validation', () => {
  it('Should display error message if inputs fields is empty', async () => {
    render(<SignUpForm />)

    await act(async () => {
      userEvent.click(screen.getByLabelText('sign-up-button'))
    })

    expect(screen.getByText(/Username is required/i)).toBeInTheDocument()
    expect(screen.getByText(/Email is required/i)).toBeInTheDocument()
    expect(screen.getByText(/Password is required/i)).toBeInTheDocument()
    expect(mockSignUp).not.toHaveBeenCalled()
  })

  it('Should display error message if email is invalid', async () => {
    render(<SignUpForm />)

    userEvent.type(screen.getByLabelText('email-input'), 'demo')
    await act(async () => {
      userEvent.click(screen.getByLabelText('sign-up-button'))
    })

    expect(screen.getByText(/Invalid e-mail address/i)).toBeInTheDocument()
    expect(mockSignUp).not.toHaveBeenCalled()
  })
})

it('Should be called log in when email and password are valid', async () => {
  mockSignUp('demo@gmail.com', 'Demo123')
  render(<SignUpForm />)

  userEvent.type(screen.getByLabelText('email-input'), 'demo@gmail.com')
  userEvent.type(screen.getByLabelText('password-input'), 'Demo123')

  await act(async () => {
    userEvent.click(screen.getByLabelText('sign-up-button'))
  })

  expect(mockSignUp).toHaveBeenCalled()
  expect(mockSignUp).toHaveBeenCalledWith('demo@gmail.com', 'Demo123')
})

import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SignInForm from 'components/SignInForm/SignInForm'

describe('SignInForm', () => {
  const mockLogin = jest.fn()
  it('Should display error message if email field is empty', async () => {
    render(<SignInForm />)

    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: /Sign In/i }))
    })

    expect(screen.getByText(/email is required/i)).toBeInTheDocument()
    expect(mockLogin).not.toHaveBeenCalled()
  })
})

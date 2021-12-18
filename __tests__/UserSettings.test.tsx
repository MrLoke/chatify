import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import UserSettings from 'components/UserSettings/UserSettings'

describe('Valid values', () => {
  const updateAvatar = jest.fn(() => Promise.resolve)
  const updateUserName = jest.fn(() => Promise.resolve)
  const updateEmail = jest.fn(() => Promise.resolve)
  const updatePassword = jest.fn(() => Promise.resolve)

  it('Successfully update user name', async () => {
    updateUserName()
    render(<UserSettings />)

    const input = screen.getByLabelText('user-name-input')
    await act(async () => {
      userEvent.type(input, 'NewUserName')
      userEvent.click(screen.getByLabelText('save-updated-user-name'))
    })

    expect(updateUserName).toHaveBeenCalled()
  })

  it('Successfully update e-mail', async () => {
    updateEmail()
    render(<UserSettings />)

    const input = screen.getByLabelText('email-input')
    await act(async () => {
      userEvent.type(input, 'newemail@gmail.com')
      userEvent.click(screen.getByLabelText('save-updated-email'))
    })

    expect(updateEmail).toHaveBeenCalled()
  })

  it('Successfully update password', async () => {
    updatePassword()
    render(<UserSettings />)

    const input = screen.getByLabelText('password-input')
    await act(async () => {
      userEvent.type(input, 'Newpassword123')
      userEvent.click(screen.getByLabelText('save-updated-password'))
    })

    expect(updatePassword).toHaveBeenCalled()
  })

  it('Successfully update avatar', async () => {
    updateAvatar()
    const file = new File(['hello'], 'hello.png', { type: 'image/png' })
    render(<UserSettings />)

    const input: HTMLInputElement & EventTarget =
      screen.getByLabelText('avatar-input')
    userEvent.upload(input, file)

    userEvent.click(screen.getByLabelText('save-updated-avatar'))

    expect(input.files?.[0]).toStrictEqual(file)
    expect(input.files?.item(0)).toStrictEqual(file)
    expect(input.files).toHaveLength(1)
    expect(updateAvatar).toHaveBeenCalled()
  })
})

describe('Invalid values', () => {
  const updateUserName = jest.fn(() => Promise.resolve)
  const updateEmail = jest.fn(() => Promise.resolve)
  const updatePassword = jest.fn(() => Promise.resolve)

  it('Should display error message if user name is invalid', async () => {
    render(<UserSettings />)

    userEvent.type(screen.getByLabelText('user-name-input'), 'de')
    await act(async () => {
      userEvent.click(screen.getByLabelText('save-updated-user-name'))
    })

    expect(
      screen.getByText(/Username is too short 3 characters minimum/i)
    ).toBeInTheDocument()
    expect(updateUserName).not.toHaveBeenCalled()
  })

  it('Should display error message if e-mail is invalid', async () => {
    render(<UserSettings />)

    userEvent.type(screen.getByLabelText('email-input'), 'demo')
    await act(async () => {
      userEvent.click(screen.getByLabelText('save-updated-email'))
    })

    expect(screen.getByText(/Invalid e-mail address/i)).toBeInTheDocument()
    expect(updateEmail).not.toHaveBeenCalled()
  })

  it('Should display error message if password is invalid', async () => {
    render(<UserSettings />)

    userEvent.type(screen.getByLabelText('password-input'), 'qw')
    await act(async () => {
      userEvent.click(screen.getByLabelText('save-updated-password'))
    })

    expect(
      screen.getByText(/Password is too short 6 characters minimum/i)
    ).toBeInTheDocument()
    expect(updatePassword).not.toHaveBeenCalled()
  })
})

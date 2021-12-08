import { ChangeEvent, FormEvent } from 'react'

export type SignUpFormTypes = {
  displayName: string
  email: string
  password: string
}

export type SignInFormTypes = {
  email: string
  password: string
}

export type ChannelPropsTypes = {
  id: string
  channelName: string
}

export type ModalPropsTypes = {
  header: string
  isModalOpen: boolean
  inputValue: string
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  submitModal: (e: FormEvent<HTMLFormElement>) => Promise<void>
  handleCloseModal: () => void
}

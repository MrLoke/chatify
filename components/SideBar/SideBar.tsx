import { ChangeEvent, FormEvent, useState } from 'react'
import { useRouter } from 'next/router'
import Modal from 'components/Modal/Modal'
import ThemeSwitch from 'components/ThemeSwitch/ThemeSwitch'
import { CogIcon, PlusIcon } from '@heroicons/react/solid'
import { ChatAlt2Icon } from '@heroicons/react/outline'
import { LogoutIcon } from '@heroicons/react/outline'
import { addDoc, collection } from '@firebase/firestore'
import { auth, db } from 'firebase-config'
import { signOut } from '@firebase/auth'

const SideBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [channelName, setChannelName] = useState('')
  const router = useRouter()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setChannelName(e.target.value)

  const handleCloseModal = () => setIsModalOpen(false)

  const submitModal = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (channelName.length > 0) {
      await addDoc(collection(db, 'channels'), {
        channelName: channelName,
      })
    } else return

    handleCloseModal()
    setChannelName('')
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => router.push('/signin'))
      .catch((error) => alert(error))
  }

  return (
    <div className='fixed top-0 left-0 h-screen w-16 flex flex-col bg-white dark:bg-gray-900 shadow-lg'>
      <SideBarIcon
        icon={
          <ChatAlt2Icon
            onClick={() => router.push('/')}
            className='w-10 h-10'
          />
        }
        text='Chatify'
      />
      <hr className='sidebar-hr' />
      <SideBarIcon
        icon={
          <PlusIcon
            onClick={() => setIsModalOpen(true)}
            className='w-8 h-8 text-blue-200'
          />
        }
        text='Create new channel'
      />
      <SideBarIcon
        icon={
          <CogIcon
            onClick={() => router.push('/settings')}
            className='w-8 h-8 text-blue-200'
          />
        }
        text='Settings'
      />
      <hr className='sidebar-hr' />
      <ThemeSwitch />
      <SideBarIcon
        icon={
          <LogoutIcon
            onClick={handleSignOut}
            className='w-7 h-7 text-blue-200'
          />
        }
        text='Logout'
      />

      <Modal
        header='Create new channel'
        isModalOpen={isModalOpen}
        inputValue={channelName}
        handleInputChange={handleInputChange}
        submitModal={submitModal}
        handleCloseModal={handleCloseModal}
      />
    </div>
  )
}

const SideBarIcon = ({ icon, text }: { icon: JSX.Element; text: string }) => (
  <div className='sidebar-icon group'>
    {icon}
    <span className='sidebar-tooltip group-hover:scale-100'>{text}</span>
  </div>
)

export default SideBar

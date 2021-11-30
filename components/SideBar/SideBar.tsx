import { ChangeEvent, FormEvent, useState } from 'react'
import Modal from 'components/Modal/Modal'
import ThemeSwitch from 'components/ThemeSwitch/ThemeSwitch'
import { FireIcon, CogIcon, PlusIcon } from '@heroicons/react/solid'
import { addDoc, collection } from '@firebase/firestore'
import { db } from 'firebase-config'

const SideBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [sectionName, setSectionName] = useState('')

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSectionName(e.target.value)

  const handleCloseModal = () => setIsModalOpen(false)

  const submitModal = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (sectionName.length > 0) {
      await addDoc(collection(db, 'channels'), {
        sectionName: sectionName,
      })
    } else return

    handleCloseModal()
  }

  return (
    <div className='fixed top-0 left-0 h-screen w-16 flex flex-col bg-white dark:bg-gray-900 shadow-lg'>
      <SideBarIcon icon={<FireIcon className='w-20 h-20' />} text='Chatify' />
      <Divider />
      <SideBarIcon
        icon={
          <PlusIcon
            onClick={() => setIsModalOpen(true)}
            className='w-8 h-8 text-blue-200'
          />
        }
        text='Create channel section'
      />
      <SideBarIcon
        icon={<CogIcon className='w-9 h-9 text-blue-200' />}
        text='Settings'
      />
      <Divider />
      <ThemeSwitch />

      <Modal
        header='Create channels section name'
        isModalOpen={isModalOpen}
        inputValue={sectionName}
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

const Divider = () => <hr className='sidebar-hr' />

export default SideBar

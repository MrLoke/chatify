import { ChangeEvent, useCallback, useState } from 'react'
import {
  deleteUser,
  updateEmail,
  updatePassword,
  updateProfile,
  User,
} from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { auth, db, storage } from 'firebase-config'
import {
  SaveIcon,
  ExclamationIcon,
  TrashIcon,
  UploadIcon,
  LockClosedIcon,
  MailIcon,
  EyeIcon,
  EyeOffIcon,
} from '@heroicons/react/outline'

const UserSettings = () => {
  const [isError, setIsError] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [newUserName, setNewUserName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newAvatar, setNewAvatar] = useState<any>()

  const handleShowPassword = () => setShowPassword(!showPassword)

  const onUploadAvatar = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setNewAvatar(e.target.files[0])
    }
  }, [])

  const userId = auth.currentUser?.uid || ''
  const authUser = auth.currentUser as User
  const docRef = doc(db, 'users', userId)

  const handleUpdateUserName = async () => {
    await updateDoc(docRef, {
      displayName: newUserName,
    })

    updateProfile(authUser, {
      displayName: newUserName,
    })
      .then(() => {
        console.log('Update successful')
      })
      .catch((error) => {
        setIsError(error.message)
      })
  }

  const handleUpdateAvatar = async () => {
    const imageRef = ref(storage, `users/${userId}/${newAvatar.name}`)

    await uploadBytes(imageRef, newAvatar).then(async (snapshot) => {
      const downloadURL = await getDownloadURL(imageRef)

      await updateDoc(docRef, {
        avatar: downloadURL,
      })

      updateProfile(authUser, {
        photoURL: downloadURL,
      })
        .then(() => {
          console.log('Update successful')
        })
        .catch((error) => {
          setIsError(error.message)
        })
    })
  }

  const handleUpdateEmail = async () => {
    await updateDoc(docRef, {
      email: newEmail,
    })

    updateEmail(authUser, newEmail)
      .then(() => {
        console.log('Update successful')
      })
      .catch((error) => {
        setIsError(error.message)
      })
  }

  const handleUpdatePassword = async () => {
    updatePassword(authUser, newPassword)
      .then(() => {
        console.log('Update successful')
      })
      .catch((error) => {
        setIsError(error.message)
      })
  }

  const handleDeleteUser = async () => {
    deleteUser(authUser)
      .then(() => {
        console.log('Update successful')
      })
      .catch((error) => {
        setIsError(error.message)
      })
  }

  return (
    <div className='flex flex-col w-9/12 xl:w-7/12 2xl:w-5/12 mx-auto h-full mt-4'>
      <h2 className='text-center text-xl py-4 font-medium'>
        Edit user information
      </h2>
      <div className='flex mb-4'>
        <div className='input-container mb-0'>
          <span className='input-icon'>
            <MailIcon className='w-5 h-5 text-gray-900' />
          </span>
          <input
            type='text'
            placeholder='New username'
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            className='input'
          />
        </div>
        <button
          onClick={handleUpdateUserName}
          className='flex cursor-pointer items-center bg-blue-500 hover:bg-blue-800 transition-all ml-3 p-2 rounded'>
          Save&nbsp;
          <SaveIcon className='w-5 h-5' />
        </button>
      </div>

      <div className='flex mb-4'>
        <div className='input-container mb-0'>
          <span className='input-icon'>
            <MailIcon className='w-5 h-5 text-gray-900' />
          </span>
          <input
            type='email'
            placeholder='New e-mail'
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className='input'
          />
        </div>
        <button
          onClick={handleUpdateEmail}
          className='flex cursor-pointer items-center bg-blue-500 hover:bg-blue-800 transition-all ml-3 p-2 rounded'>
          Save&nbsp;
          <SaveIcon className='w-5 h-5' />
        </button>
      </div>

      <div className='flex mb-4'>
        <div className='input-container mb-0'>
          <span className='input-icon'>
            <LockClosedIcon className='w-5 h-5 text-gray-900' />
          </span>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='New password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className='input'
          />
          <span className='show-password-icon' onClick={handleShowPassword}>
            {showPassword ? (
              <EyeOffIcon className='w-5 h-5 text-gray-900' />
            ) : (
              <EyeIcon className='w-5 h-5 text-gray-900' />
            )}
          </span>
        </div>
        <button
          onClick={handleUpdatePassword}
          className='flex cursor-pointer items-center bg-blue-500 hover:bg-blue-800 transition-all ml-3 p-2 rounded'>
          Save&nbsp;
          <SaveIcon className='w-5 h-5' />
        </button>
      </div>

      <div className='flex my-2'>
        <label
          htmlFor='avatar'
          className='px-2 rounded border-2 border-blue-200 flex items-center cursor-pointer'>
          <UploadIcon className='w-7 h-7 mr-3' />
          {newAvatar ? newAvatar.name : 'Upload avatar'}
        </label>
        <input
          style={{ display: 'none' }}
          onChange={onUploadAvatar}
          type='file'
          accept='.jpg, .jpeg, .png .webp .avif'
          id='avatar'
        />

        <button
          onClick={handleUpdateAvatar}
          className='flex cursor-pointer items-center bg-blue-500 hover:bg-blue-800 transition-all ml-3 p-2 rounded'>
          Save&nbsp;
          <SaveIcon className='w-5 h-5' />
        </button>
      </div>

      <div className='flex flex-col mt-4'>
        <div className='flex mb-2'>
          <ExclamationIcon className='w-6 h-6 text-red-300' />
          <h3>&nbsp;This will remove your account permanently</h3>
        </div>
        <button
          onClick={handleDeleteUser}
          className='flex items-center justify-center w-11/12 sm:w-9/12 md:w-2/4 bg-red-500 hover:bg-red-600 transition-all text-white py-3 px-3 rounded'>
          Delete account &nbsp;
          <TrashIcon className='w-5 h-5 text-white' />
        </button>
      </div>

      {isError ? (
        <div className='mt-3'>
          <div
            className='my-3 text-sm text-left text-red-600 bg-red-500 bg-opacity-10 border border-red-400 h-12 flex items-center p-4 rounded-md'
            role='alert'>
            {isError}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default UserSettings

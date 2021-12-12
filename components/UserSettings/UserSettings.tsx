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
  UserIcon,
  ExclamationIcon,
  TrashIcon,
  UploadIcon,
  LockClosedIcon,
  MailIcon,
  EyeIcon,
  EyeOffIcon,
} from '@heroicons/react/outline'
import { useForm } from 'react-hook-form'

const UserSettings = () => {
  const [isError, setIsError] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [newAvatar, setNewAvatar] = useState<any>()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: reset,
  } = useForm()
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
    reset: reset2,
  } = useForm()
  const {
    register: register3,
    handleSubmit: handleSubmit3,
    formState: { errors: errors3 },
    reset: reset3,
  } = useForm()

  const handleShowPassword = () => setShowPassword(!showPassword)

  const onUploadAvatar = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setNewAvatar(e.target.files[0])
    }
  }, [])

  const userId = auth.currentUser?.uid || ''
  const authUser = auth.currentUser as User
  const docRef = doc(db, 'users', userId)

  const handleUpdateUserName = async ({
    displayName,
  }: {
    displayName: string
  }) => {
    updateProfile(authUser, { displayName })
      .then(() => alert('User name has been updated successfully'))
      .catch((error) => setIsError(error.message))

    await updateDoc(docRef, { displayName }).catch((error) =>
      setIsError(error.message)
    )

    reset()
  }

  const handleUpdateAvatar = async () => {
    const imageRef = ref(storage, `users/${userId}/${newAvatar.name}`)

    await uploadBytes(imageRef, newAvatar).then(async (snapshot) => {
      const downloadURL = await getDownloadURL(imageRef)

      updateProfile(authUser, {
        photoURL: downloadURL,
      })
        .then(() => alert('User avatar has been updated successfully'))
        .catch((error) => setIsError(error.message))

      await updateDoc(docRef, {
        avatar: downloadURL,
      }).catch((error) => setIsError(error.message))
    })
  }

  const handleUpdateEmail = async ({ email }: { email: string }) => {
    updateEmail(authUser, email)
      .then(() => alert('User e-mail has been updated successfully'))
      .catch((error) => setIsError(error.message))

    await updateDoc(docRef, { email }).catch((error) =>
      setIsError(error.message)
    )

    reset2()
  }

  const handleUpdatePassword = async ({ password }: { password: string }) => {
    updatePassword(authUser, password)
      .then(() => alert('User password has been updated successfully'))
      .catch((error) => setIsError(error.message))

    reset3()
  }

  const handleDeleteUser = async () => {
    deleteUser(authUser).catch((error) => setIsError(error.message))
  }

  return (
    <div className='flex flex-col w-9/12 xl:w-7/12 2xl:w-5/12 mx-auto h-full mt-6'>
      <h2 className='text-center text-xl py-4 font-medium'>
        Edit user information
      </h2>
      <form onSubmit={handleSubmit(handleUpdateUserName)}>
        <div className='flex mb-4'>
          <div className='input-container mb-0'>
            <span className='input-icon'>
              <UserIcon className='w-5 h-5 text-gray-900' />
            </span>
            <input
              {...register('displayName', {
                minLength: {
                  value: 3,
                  message: 'Username is too short 3 characters minimum',
                },
                maxLength: {
                  value: 30,
                  message: 'Username is too long',
                },
              })}
              name='displayName'
              type='text'
              placeholder='New username'
              className='input'
            />
          </div>
          <button
            type='submit'
            className='flex cursor-pointer text-white items-center bg-blue-500 hover:bg-blue-800 transition-all ml-3 p-2 rounded'>
            Save&nbsp;
            <SaveIcon className='w-5 h-5 text-white' />
          </button>
        </div>
        {errors.displayName && (
          <span className='text-center w-full text-sm text-red-500'>
            {errors.displayName.message}
          </span>
        )}
      </form>

      <form onSubmit={handleSubmit2(handleUpdateEmail)}>
        <div className='flex mb-4'>
          <div className='input-container mb-0'>
            <span className='input-icon'>
              <MailIcon className='w-5 h-5 text-gray-900' />
            </span>
            <input
              {...register2('email', {
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid e-mail address',
                },
              })}
              name='email'
              type='email'
              placeholder='New e-mail'
              className='input'
            />
          </div>
          <button
            type='submit'
            className='flex cursor-pointer text-white items-center bg-blue-500 hover:bg-blue-800 transition-all ml-3 p-2 rounded'>
            Save&nbsp;
            <SaveIcon className='w-5 h-5 text-white' />
          </button>
        </div>
        {errors2.email && (
          <span className='text-center w-full text-sm text-red-500'>
            {errors2.email.message}
          </span>
        )}
      </form>

      <form onSubmit={handleSubmit3(handleUpdatePassword)}>
        <div className='flex mb-4'>
          <div className='input-container mb-0'>
            <span className='input-icon'>
              <LockClosedIcon className='w-5 h-5 text-gray-900' />
            </span>
            <input
              {...register3('password', {
                minLength: {
                  value: 6,
                  message: 'Password is too short 6 characters minimum',
                },
              })}
              name='password'
              type={showPassword ? 'text' : 'password'}
              placeholder='New password'
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
            type='submit'
            className='flex cursor-pointer text-white items-center bg-blue-500 hover:bg-blue-800 transition-all ml-3 p-2 rounded'>
            Save&nbsp;
            <SaveIcon className='w-5 h-5 text-white' />
          </button>
        </div>
        {errors3.password && (
          <span className='text-center w-full text-sm text-red-500'>
            {errors3.password.message}
          </span>
        )}
      </form>

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
          className='flex cursor-pointer text-white items-center bg-blue-500 hover:bg-blue-800 transition-all ml-3 p-2 rounded'>
          Save&nbsp;
          <SaveIcon className='w-5 h-5 text-white' />
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

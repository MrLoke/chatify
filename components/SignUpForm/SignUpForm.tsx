import { ChangeEvent, useCallback, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { setDoc, doc } from 'firebase/firestore'
import { auth, db, storage } from 'firebase-config'
import { useForm } from 'react-hook-form'
import {
  UploadIcon,
  UserIcon,
  MailIcon,
  LockClosedIcon,
  EyeIcon,
  EyeOffIcon,
} from '@heroicons/react/outline'

type FormData = {
  displayName: string
  email: string
  password: string
}

const SignUpForm = () => {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [avatar, setAvatar] = useState<any>()
  const [isError, setIsError] = useState()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const password = useRef({})
  password.current = watch('password', '')

  const handleShowPassword = () => setShowPassword(!showPassword)

  const onUploadAvatar = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setAvatar(e.target.files[0])
    }
  }, [])

  const onSubmit = async ({ displayName, email, password }: FormData) => {
    setLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        const imageRef = ref(storage, `users/${user.uid}/${avatar.name}`)

        await uploadBytes(imageRef, avatar).then(async (snapshot) => {
          const downloadURL = await getDownloadURL(imageRef)

          await updateProfile(user, {
            displayName,
            photoURL: downloadURL,
          })

          // Add new user to firestore db
          const docRef = doc(db, 'users', user.uid)
          await setDoc(docRef, {
            email,
            displayName,
            avatar: downloadURL,
            status: user.metadata.lastSignInTime,
            created: user.metadata.creationTime,
            uid: user.uid,
          })
        })

        // Redirect user to chat page after successfully sign up
        router.push('/')
      })
      .catch((error) => {
        setLoading(false)
        setIsError(error)
      })
  }

  return (
    <div className='form-container'>
      <h2 className='text-center text-2xl font-semibold mb-6'>
        Create account
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className='form'>
        <div className='input-container'>
          <span className='input-icon'>
            <UserIcon className='w-5 h-5 text-gray-900' />
          </span>
          <input
            {...register('displayName', {
              required: 'Username is required',
              minLength: {
                value: 3,
                message: 'Username is too short 3 characters minimum',
              },
              maxLength: {
                value: 30,
                message: 'Username is too long',
              },
            })}
            placeholder='User name'
            name='displayName'
            type='text'
            className='input'
          />
          {errors.displayName && (
            <span className='mt-2 text-center w-full text-sm text-red-500'>
              {errors.displayName.message}
            </span>
          )}
        </div>

        <div className='input-container'>
          <span className='input-icon'>
            <MailIcon className='w-5 h-5 text-gray-900' />
          </span>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'invalid email address',
              },
            })}
            placeholder='E-mail'
            name='email'
            type='text'
            className='input'
          />
          {errors.email && (
            <span className='mt-2 text-center w-full text-sm text-red-500'>
              {errors.email.message}
            </span>
          )}
        </div>

        <div className='input-container'>
          <span className='input-icon'>
            <LockClosedIcon className='w-5 h-5 text-gray-900' />
          </span>
          <input
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password is to short 6 characters minimum',
              },
            })}
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
            name='password'
            className='input'
          />
          <span className='show-password-icon' onClick={handleShowPassword}>
            {showPassword ? (
              <EyeOffIcon className='w-5 h-5 text-gray-900' />
            ) : (
              <EyeIcon className='w-5 h-5 text-gray-900' />
            )}
          </span>
          {errors.password && (
            <span className='mt-2 text-center w-full text-sm text-red-500'>
              {errors.password.message}
            </span>
          )}
        </div>

        <div className='input-container'>
          <span className='input-icon'>
            <LockClosedIcon className='w-5 h-5 text-gray-900' />
          </span>
          <input
            {...register('confirmPassword', {
              validate: (value) =>
                value === password.current || 'The passwords do not match',
            })}
            type='password'
            placeholder='Confirm password'
            name='confirmPassword'
            className='input'
          />
          <span className='show-password-icon' onClick={handleShowPassword}>
            {showPassword ? (
              <EyeOffIcon className='w-5 h-5 text-gray-900' />
            ) : (
              <EyeIcon className='w-5 h-5 text-gray-900' />
            )}
          </span>
          {errors.confirmPassword && (
            <span className='mt-2 text-center w-full text-sm text-red-500'>
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <label
          htmlFor='avatar'
          className='my-2 ml-2 flex items-center cursor-pointer'>
          <UploadIcon className='w-7 h-7 mr-3' />
          {avatar ? avatar.name : 'Upload avatar'}
        </label>
        <input
          style={{ display: 'none' }}
          onChange={onUploadAvatar}
          type='file'
          accept='.jpg, .jpeg, .png'
          id='avatar'
        />

        {isError ? (
          <div className='mt-3'>
            <div
              className='my-3 text-sm text-left text-red-600 bg-red-500 bg-opacity-10 border border-red-400 h-12 flex items-center p-4 rounded-md'
              role='alert'>
              {isError}
            </div>
          </div>
        ) : null}

        <button
          type='submit'
          className='submit-btn flex justify-center'
          disabled={loading}>
          {loading ? (
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-t-2 border-gray-200'></div>
          ) : (
            <p>Sign Up</p>
          )}
        </button>

        <p className='ml-2 text-blue-200'>
          <Link href='/signin'>Already have account? Sign In</Link>
        </p>
      </form>
    </div>
  )
}

export default SignUpForm

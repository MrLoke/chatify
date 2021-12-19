import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from 'firebase-config'
import { useForm } from 'react-hook-form'
import { SignInFormTypes } from 'types/types'
import { doc, updateDoc } from '@firebase/firestore'
import {
  LockClosedIcon,
  MailIcon,
  EyeIcon,
  EyeOffIcon,
} from '@heroicons/react/outline'

const SignInForm = () => {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isError, setIsError] = useState()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const handleShowPassword = () => setShowPassword(!showPassword)

  const onSubmit = async ({ email, password }: SignInFormTypes) => {
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        const docRef = doc(db, 'users', user.uid)

        await updateDoc(docRef, {
          status: user.metadata.lastSignInTime,
        })

        router.push('/')
      })
      .catch((error) => {
        setLoading(false)
        setIsError(error.message)
      })
  }

  return (
    <div className='form-container'>
      <h2 className='text-center text-2xl font-semibold mb-6'>Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='form'>
        <div className='input-container'>
          <span className='input-icon'>
            <MailIcon className='w-5 h-5 text-gray-900' />
          </span>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid e-mail address',
              },
            })}
            placeholder='E-mail'
            aria-label='email-input'
            name='email'
            type='text'
            className='input'
          />
        </div>
        {errors.email && (
          <span className='mb-2 text-center w-full text-sm text-red-500'>
            {errors.email.message}
          </span>
        )}

        <div className='input-container'>
          <span className='input-icon'>
            <LockClosedIcon className='w-5 h-5 text-gray-900' />
          </span>
          <input
            {...register('password', {
              required: 'Password is required',
            })}
            type={showPassword ? 'text' : 'password'}
            aria-label='password-input'
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
        </div>
        {errors.password && (
          <span className='mb-2 text-center w-full text-sm text-red-500'>
            {errors.password.message}
          </span>
        )}

        <div className='ml-2'>
          <label className='inline-flex items-center cursor-pointer'>
            <input type='checkbox' className='form-checkbox' />
            <span className='ml-2'>Remember me</span>
          </label>
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

        <button
          type='submit'
          aria-label='sign-in-button'
          className='submit-btn flex justify-center'
          disabled={loading}>
          {loading ? (
            <svg
              className='animate-spin h-7 w-7 text-white'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'>
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='#fff'
                strokeWidth='4'></circle>
              <path
                className='opacity-75'
                fill='#fff'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
            </svg>
          ) : (
            <p>Sign In</p>
          )}
        </button>

        <p className='ml-2 text-blue-200'>
          <Link href='/signup'>Don't have account? Sign Up</Link>
        </p>
      </form>
    </div>
  )
}

export default SignInForm

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from 'firebase-config'
import { useForm } from 'react-hook-form'
import { LockClosedIcon, MailIcon } from '@heroicons/react/outline'

type FormData = {
  email: string
  password: string
}

const SignInForm = () => {
  const [loading, setLoading] = useState(false)
  const [isError, setIsError] = useState()
  const router = useRouter()
  const { register, handleSubmit } = useForm()

  const onSubmit = async ({ email, password }: FormData) => {
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.push('/')
      })
      .catch((error) => {
        setLoading(false)
        setIsError(error)
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
                message: 'invalid email address',
              },
            })}
            placeholder='E-mail'
            name='email'
            type='text'
            className='input'
          />
        </div>

        <div className='input-container'>
          <span className='input-icon'>
            <LockClosedIcon className='w-5 h-5 text-gray-900' />
          </span>
          <input
            {...register('password', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'invalid email address',
              },
            })}
            type='password'
            placeholder='Password'
            name='password'
            className='input'
          />
        </div>

        <div className='ml-2'>
          <label className='inline-flex items-center'>
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

        <button type='submit' className='submit-btn' disabled={loading}>
          {loading ? (
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-t-2 border-blue-200'></div>
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

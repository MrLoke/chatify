import { useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import SignUpForm from 'components/SignUpForm/SignUpForm'
import { auth } from 'firebase-config'
import { useAuthState } from 'react-firebase-hooks/auth'

const Signup: NextPage = () => {
  const [user] = useAuthState(auth)
  const router = useRouter()

  useEffect(() => {
    const redirect = () => {
      if (user !== null) {
        router.push('/')
      }
    }
    redirect()
  }, [user, router])

  return (
    <>
      <Head>
        <title>Chatify | Sign Up</title>
      </Head>
      <div className='flex min-h-screen items-center justify-center'>
        <SignUpForm />
      </div>
    </>
  )
}

export default Signup

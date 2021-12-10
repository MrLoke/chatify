import { useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import SignInForm from 'components/SignInForm/SignInForm'
import { auth } from 'firebase-config'
import { useAuthState } from 'react-firebase-hooks/auth'

const Signin: NextPage = () => {
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
        <title>Chatify | Sign In</title>
      </Head>
      <div className='flex min-h-screen items-center justify-center'>
        <SignInForm />
      </div>
    </>
  )
}

export default Signin

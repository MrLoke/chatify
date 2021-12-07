import type { NextPage } from 'next'
import Head from 'next/head'
import SignInForm from 'components/SignInForm/SignInForm'

const Signin: NextPage = () => {
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

import type { NextPage } from 'next'
import Head from 'next/head'
import SignInForm from 'components/SignInForm/SignInForm'

const Signin: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Chatify | Sign In</title>
      </Head>
      <div className='flex h-screen items-center justify-center'>
        <SignInForm />
      </div>
    </div>
  )
}

export default Signin

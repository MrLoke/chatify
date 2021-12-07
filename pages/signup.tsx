import type { NextPage } from 'next'
import Head from 'next/head'
import SignUpForm from 'components/SignUpForm/SignUpForm'

const Signup: NextPage = () => {
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

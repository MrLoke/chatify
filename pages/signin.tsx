import { useEffect } from 'react'
import type { NextPage } from 'next'
import { NextSeo } from 'next-seo'
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
      <NextSeo
        title='Chatify | Sign In'
        description='Group chat communicator'
        openGraph={{
          type: 'website',
          title: 'Chatify | Sign In',
          url: `https://${process.env.NEXT_PUBLIC_URL!}${router.asPath}`,
          description: 'Group chat communicator',
          site_name: 'Chatify',
        }}
      />
      <div className='flex min-h-screen items-center justify-center'>
        <SignInForm />
      </div>
    </>
  )
}

export default Signin

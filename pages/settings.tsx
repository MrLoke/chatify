import type { NextPage } from 'next'
import Head from 'next/head'
import ChannelBar from 'components/ChannelBar/ChannelBar'
import SideBar from 'components/SideBar/SideBar'
import UserSettings from 'components/UserSettings/UserSettings'
import TopNavigation from 'components/TopNavigation/TopNavigation'
import UsersList from 'components/UsersList/UsersList'
import SignInForm from 'components/SignInForm/SignInForm'
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from 'firebase-config'

const Settings: NextPage = () => {
  const [user, loading, error] = useAuthState(auth)

  if (loading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <LoadingSpinner />
      </div>
    )
  }

  if (!user) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <SignInForm />
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <h3 className='text-red-500'>{error}</h3>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Chatify | Settings</title>
      </Head>
      <div className='flex h-screen'>
        <div className='hidden md:flex'>
          <SideBar />
          <ChannelBar />
        </div>
        <div className='flex flex-col w-full bg-gray-300 dark:bg-gray-700'>
          <TopNavigation />
          <UserSettings />
        </div>
        <div className='hidden lg:flex'>
          <UsersList />
        </div>
      </div>
    </>
  )
}

export default Settings

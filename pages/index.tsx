import type { NextPage } from 'next'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import SignInForm from 'components/SignInForm/SignInForm'
import ChannelBar from 'components/ChannelBar/ChannelBar'
import SideBar from 'components/SideBar/SideBar'
import UsersList from 'components/UsersList/UsersList'
import WelcomeChannel from 'components/WelcomeChannel/WelcomeChannel'
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner'
import { collection, onSnapshot, query } from '@firebase/firestore'
import { auth, db } from 'firebase-config'
import { useAuthState } from 'react-firebase-hooks/auth'

const Home: NextPage = ({
  users,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [user, loading, error] = useAuthState(auth)
  const { asPath } = useRouter()

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
      <NextSeo
        title='Chatify | Home'
        description='Group chat communicator'
        openGraph={{
          type: 'website',
          title: 'Chatify | Home',
          url: `https://${process.env.NEXT_PUBLIC_URL!}${asPath}`,
          description: 'Group chat communicator',
          site_name: 'Chatify',
        }}
      />

      <div className='flex h-screen'>
        <div className='hidden md:flex'>
          <SideBar />
          <ChannelBar />
        </div>
        <WelcomeChannel users={users} />
        <div className='hidden lg:flex'>
          <UsersList />
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const users: { id: string }[] = []

  onSnapshot(query(collection(db, 'users')), (snapshot) => {
    snapshot.docs.map((doc) => {
      users.push({
        ...doc.data(),
        id: doc.id,
      })
    })
  })

  return {
    props: { users: JSON.stringify(users) },
  }
}

export default Home

import type { NextPage } from 'next'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import ChannelBar from 'components/ChannelBar/ChannelBar'
import ChatFeed from 'components/ChatFeed/ChatFeed'
import SideBar from 'components/SideBar/SideBar'
import UsersList from 'components/UsersList/UsersList'
import SignInForm from 'components/SignInForm/SignInForm'
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner'
import { collection, onSnapshot, query } from '@firebase/firestore'
import { auth, db } from 'firebase-config'
import { useAuthState } from 'react-firebase-hooks/auth'

const Channel: NextPage = ({
  messages,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [user, loading, error] = useAuthState(auth)
  const router = useRouter()

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
        title={`Chatify | ${router.query.name}`}
        description='Group chat communicator'
        openGraph={{
          type: 'website',
          title: `Chatify | ${router.query.name}`,
          url: `https://${process.env.NEXT_PUBLIC_URL!}${router.asPath}`,
          description: 'Group chat communicator',
          site_name: 'Chatify',
        }}
      />
      <div className='flex h-screen'>
        <div className='hidden md:flex'>
          <SideBar />
          <ChannelBar />
        </div>
        <ChatFeed messages={messages} />
        <div className='hidden lg:flex'>
          <UsersList />
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const messages: { id: string }[] = []
  const channelId: string = context?.params?.id as string

  onSnapshot(
    query(collection(db, 'channels', channelId, 'messages')),
    (snapshot) => {
      snapshot.docs.map((doc) => {
        messages.push({
          ...doc.data(),
          id: doc.id,
        })
      })
    }
  )

  return {
    props: { messages: JSON.stringify(messages) },
  }
}

export default Channel

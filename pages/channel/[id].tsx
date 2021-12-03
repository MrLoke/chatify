import type { NextPage } from 'next'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ChannelBar from 'components/ChannelBar/ChannelBar'
import ChatFeed from 'components/ChatFeed/ChatFeed'
import SideBar from 'components/SideBar/SideBar'
import { collection, getDocs } from '@firebase/firestore'
import { auth, db } from 'firebase-config'
import { useAuthState } from 'react-firebase-hooks/auth'
import SignInForm from 'components/SignInForm/SignInForm'

const Channel: NextPage = ({
  messages,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [user, loading, error] = useAuthState(auth)
  const router = useRouter()

  if (loading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-t-2 border-blue-200'></div>
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
    return <div className='flex'>{error}</div>
  }

  return (
    <>
      <Head>
        <title>Chatify | {router.query.name}</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='flex h-screen'>
        <SideBar />
        <ChannelBar />
        <ChatFeed messages={messages} />
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const messages: { id: string }[] = []

  const querySnapshot = await getDocs(
    //@ts-ignore
    collection(db, 'channels', context?.params?.id, 'messages')
  )

  querySnapshot.forEach((doc) => {
    messages.push({
      ...doc.data(),
      id: doc.id,
    })
  })

  return {
    props: { messages: JSON.stringify(messages) },
  }
}

export default Channel

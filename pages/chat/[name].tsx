import { useRouter } from 'next/router'
import Head from 'next/head'
import ChannelBar from 'components/ChannelBar/ChannelBar'
import SideBar from 'components/SideBar/SideBar'
import UsersList from 'components/UsersList/UsersList'
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner'
import SignInForm from 'components/SignInForm/SignInForm'
import { auth, db } from 'firebase-config'
import { useAuthState } from 'react-firebase-hooks/auth'
import { addDoc, collection, query, where } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'

const Chat = () => {
  const [user, loading, error] = useAuthState(auth)
  const router = useRouter()
  const usersChatRef = query(
    collection(db, 'chats'),
    where('users', 'array-contains', 'test@wp.pl')
  )
  const [chatsSnapshot] = useCollection(usersChatRef)
  const email = router.query.name
  console.log(router)
  console.log(auth.currentUser?.email)
  console.log(user?.email)

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

  const createChat = async () => {
    // const input = prompt('Enter email')

    // if (!input) return null

    //@ts-ignore
    if (!chatAlreadyExist(email) && email !== user?.email) {
      await addDoc(collection(db, 'chats'), {
        users: [user?.email, email],
      })
    }
  }

  const chatAlreadyExist = (recipientEmail: any) => {
    !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user: any) => user === recipientEmail)?.length >
        0
    )
  }

  return (
    <>
      <Head>
        <title>{`Chatify | ${email}`}</title>
      </Head>
      <div className='flex h-screen'>
        <div className='hidden md:flex'>
          <SideBar />
          <ChannelBar />
        </div>
        <div className='flex flex-col bg-gray-300 dark:bg-gray-700 h-full w-full overflow-y-scroll'>
          <h3>{email}</h3>
          <button
            onClick={createChat}
            className='bg-blue-500 hover:bg-blue-800 transition-all rounded-md p-3'>
            Start chatting
          </button>
        </div>
        <div className='hidden lg:flex'>
          <UsersList />
        </div>
      </div>
    </>
  )
}

export default Chat

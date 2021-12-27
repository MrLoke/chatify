import { useRouter } from 'next/router'
import Head from 'next/head'
import ChannelBar from 'components/ChannelBar/ChannelBar'
import SideBar from 'components/SideBar/SideBar'
import UsersList from 'components/UsersList/UsersList'
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner'
import SignInForm from 'components/SignInForm/SignInForm'
import { auth, db } from 'firebase-config'
import { useAuthState } from 'react-firebase-hooks/auth'
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
  updateDoc,
  where,
} from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'
import TopNavigation from 'components/TopNavigation/TopNavigation'
import { useState } from 'react'

const Chat = () => {
  const [user, loading, error] = useAuthState(auth)
  const [chat, setChat] = useState('')
  const [messages, setMessages] = useState<
    QueryDocumentSnapshot<DocumentData>[]
  >([])

  const user1 = auth.currentUser?.uid
  const router = useRouter()
  const email = router.query.name
  console.log(router)
  // const id:string = router.query.id || ''

  //  useEffect(() => {
  //    const usersRef = doc(db, 'users', id)
  //    const q = query(usersRef, where('uid', 'not-in', [auth.currentUser?.uid]))
  //    const unsubscribe = onSnapshot(q, (snapshot) => {
  //      setMessagesList(snapshot.docs)
  //    })
  //    return () => unsubscribe()
  //  }, [])

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

  const selectUser = async (user: any) => {
    setChat(user)
    console.log(chat)

    const user2 = user.uid
    const id = user1! > user2 ? `${user1 + user2}` : `${user2 + user1}`

    const msgsRef = collection(db, 'messages', id, 'chat')
    const q = query(msgsRef, orderBy('createdAt', 'asc'))

    onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs)
    })

    // get last message b/w logged in user and selected user
    const docSnap = await getDoc(doc(db, 'lastMsg', id))
    // if last message exists and message is from selected user
    if (docSnap.data() && docSnap.data()?.from !== user1) {
      // update last message doc, set unread to false
      await updateDoc(doc(db, 'lastMsg', id), { unread: false })
    }
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
        <div className='flex flex-col bg-gray-300 dark:bg-gray-700 m-0 h-full w-full overflow-hidden'>
          <TopNavigation />
          <div className='flex flex-col bg-gray-300 dark:bg-gray-700 h-full w-full overflow-y-scroll'>
            <h3>{email}</h3>
            <button
              onClick={selectUser}
              className='bg-blue-500 hover:bg-blue-800 transition-all rounded-md p-3'>
              Send message
            </button>
          </div>
        </div>
        <div className='hidden lg:flex'>
          <UsersList />
        </div>
      </div>
    </>
  )
}

export default Chat

import PrivateMessage from 'components/PrivateMessage/PrivateMessage'
import { auth, db } from 'firebase-config'
import { addDoc, collection, query, where } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'

const MessagesList = () => {
  const [user] = useAuthState(auth)
  const [chatsSnapshot] = useCollection(
    query(
      collection(db, 'chats'),
      where('users', 'array-contains', user?.email)
    )
  )

  const createChat = async () => {
    const input = prompt('Enter email')

    if (!input) return null

    //@ts-ignore
    if (!chatAlreadyExist(input) && input !== user?.email) {
      await addDoc(collection(db, 'chats'), {
        users: [user?.email, input],
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
    <div className='h-2/4 overflow-y-scroll'>
      <p>Private Messages</p>
      {chatsSnapshot?.docs.map((chat) => (
        <PrivateMessage key={chat.id} users={chat.data().users} />
      ))}
    </div>
  )
}

export default MessagesList

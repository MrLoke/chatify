import { auth, db } from 'firebase-config'
import { collection, DocumentData, query, where } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import getRecipientEmail from 'utils/getRecipientEmail'

const PrivateMessage = ({ users }: { users: DocumentData }) => {
  const [user] = useAuthState(auth)
  const [recipientSnapshot] = useCollection(
    query(
      collection(db, 'users'),
      where('email', '==', getRecipientEmail(users, user))
    )
  )

  const recipient = recipientSnapshot?.docs?.[0]?.data()
  const recipientEmail = getRecipientEmail(users, user)
  console.log(recipientEmail, users)

  return (
    <div>
      {recipient ? (
        <img src={recipient?.photoURL} />
      ) : (
        <img src={recipientEmail[0]} />
      )}
      <div>{recipientEmail}</div>
    </div>
  )
}

export default PrivateMessage

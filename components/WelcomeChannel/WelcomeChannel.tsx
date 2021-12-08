import { collection, orderBy, query } from '@firebase/firestore'
import TopNavigation from 'components/TopNavigation/TopNavigation'
import WelcomeUser from 'components/WelcomeUser/WelcomeUser'
import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from 'firebase-config'

const WelcomeChannel = ({ users }: { users: string }) => {
  const [usersSnapshot] = useCollection(
    query(collection(db, 'users'), orderBy('timestamp', 'asc'))
  )

  const showUsers = () => {
    if (usersSnapshot) {
      return usersSnapshot.docs.map((data) => (
        <WelcomeUser key={data.id} data={data.data()} />
      ))
    } else {
      return JSON.parse(users).map((data: any) => (
        <WelcomeUser key={data.id} data={data} />
      ))
    }
  }

  return (
    <div className='content-container'>
      <TopNavigation />
      <div className='content-list'>{showUsers()}</div>
    </div>
  )
}

export default WelcomeChannel

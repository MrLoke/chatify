import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  collection,
  DocumentData,
  onSnapshot,
  query,
  QueryDocumentSnapshot,
} from '@firebase/firestore'
import { HashtagIcon } from '@heroicons/react/solid'
import { db } from 'firebase-config'

const Channels = ({ id }: { id: string }) => {
  const [channels, setChannels] = useState<
    QueryDocumentSnapshot<DocumentData>[]
  >([])
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'channels', id, 'channelName')),
      (snapshot) => {
        setChannels(snapshot.docs)
      }
    )
    return () => unsubscribe()
  }, [])

  return (
    <>
      {channels.map((channel) => (
        <div
          key={channel.id}
          className='dropdown-selection'
          onClick={() =>
            router.push({
              pathname: `/channel/${channel.id}`,
              query: { name: `${channel.data().channelName}` },
            })
          }>
          <HashtagIcon className='text-gray-500 dark:text-gray-600 w-7 h-7 mr-2' />
          <h5 className='dropdown-selection-text'>
            {channel.data().channelName}
          </h5>
        </div>
      ))}
    </>
  )
}

export default Channels

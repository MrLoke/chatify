import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  ChevronDownIcon,
  ChevronRightIcon,
  PlusIcon,
} from '@heroicons/react/solid'
import Channel from 'components/Channel/Channel'
import {
  collection,
  DocumentData,
  onSnapshot,
  query,
  QueryDocumentSnapshot,
} from '@firebase/firestore'
import { db } from 'firebase-config'
import { HashtagIcon } from '@heroicons/react/outline'

const ChannelBar = () => {
  const [expanded, setExpanded] = useState(true)
  const [channelsList, setChannelsList] = useState<
    QueryDocumentSnapshot<DocumentData>[]
  >([])
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'channels')),
      (snapshot) => {
        setChannelsList(snapshot.docs)
      }
    )
    return () => unsubscribe()
  }, [])

  return (
    <div className='channel-bar'>
      <div className='channel-block'>
        <h5 className='channel-block-text'>Channels</h5>
      </div>

      <div className='dropdown'>
        <div
          className='dropdown-selection mb-2'
          onClick={() => router.push('/')}>
          <HashtagIcon className='text-gray-500 dark:text-gray-600 w-7 h-7 mr-2' />
          <h5 className='dropdown-selection-text'>Home</h5>
        </div>
        <div
          className='dropdown-selection mb-2'
          onClick={() => router.push('/settings')}>
          <HashtagIcon className='text-gray-500 dark:text-gray-600 w-7 h-7 mr-2' />
          <h5 className='dropdown-selection-text'>Settings</h5>
        </div>
        <div className='dropdown-header'>
          <div onClick={() => setExpanded(!expanded)}>
            <ChevronIcon expanded={expanded} />
          </div>
          <h5
            onClick={() => setExpanded(!expanded)}
            className={
              expanded
                ? 'dropdown-header-text-selected'
                : 'dropdown-header-text'
            }>
            Topics
          </h5>
          <div className='text-accent text-opacity-80 my-auto ml-auto'>
            <PlusIcon className='text-accent text-opacity-80 my-auto ml-auto w-7 h-7 text-blue-200' />
          </div>
        </div>
        <div className='channel-container'>
          {expanded &&
            channelsList.map((channel) => (
              <Channel
                key={channel.id}
                channelName={channel.data().channelName}
                id={channel.id}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

const ChevronIcon = ({ expanded }: { expanded: boolean }) => {
  const chevClass =
    'text-accent text-opacity-80 my-auto mr-1 w-7 h-7 text-blue-200'
  return expanded ? (
    <ChevronDownIcon className={chevClass} />
  ) : (
    <ChevronRightIcon className={chevClass} />
  )
}

export default ChannelBar

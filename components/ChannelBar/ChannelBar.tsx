import { useEffect, useState } from 'react'
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

interface DropdownProps {
  id: string
  channelName: string
}

const ChannelBar = () => {
  const [channelsList, setChannelsList] = useState<
    QueryDocumentSnapshot<DocumentData>[]
  >([])

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
    <div className='channel-bar shadow-lg'>
      <div className='channel-block'>
        <h5 className='channel-block-text'>Channels</h5>
      </div>

      <div className='channel-container'>
        {channelsList.map((channel) => (
          <Dropdown
            key={channel.id}
            channelName={channel.data().channelName}
            id={channel.id}
          />
        ))}
      </div>
    </div>
  )
}

const ChevronIcon = ({ expanded }: { expanded: boolean }) => {
  const chevClass = 'text-accent text-opacity-80 my-auto mr-1 w-7 h-7'
  return expanded ? (
    <ChevronDownIcon className={chevClass} />
  ) : (
    <ChevronRightIcon className={chevClass} />
  )
}

const Dropdown = ({ id, channelName }: DropdownProps) => {
  const [expanded, setExpanded] = useState(true)

  return (
    <div className='dropdown'>
      <div className='dropdown-header'>
        <div onClick={() => setExpanded(!expanded)}>
          <ChevronIcon expanded={expanded} />
        </div>
        <h5
          onClick={() => setExpanded(!expanded)}
          className={
            expanded ? 'dropdown-header-text-selected' : 'dropdown-header-text'
          }>
          Topics
        </h5>
        <div className='text-accent text-opacity-80 my-auto ml-auto'>
          <PlusIcon className='text-accent text-opacity-80 my-auto ml-auto w-7 h-7' />
        </div>
      </div>
      {expanded && <Channel id={id} channelName={channelName} />}
    </div>
  )
}

export default ChannelBar

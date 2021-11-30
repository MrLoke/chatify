import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  ChevronDownIcon,
  ChevronRightIcon,
  PlusIcon,
} from '@heroicons/react/solid'
import Modal from 'components/Modal/Modal'
import Channels from 'components/Channels/Channels'
import {
  addDoc,
  collection,
  DocumentData,
  onSnapshot,
  query,
  QueryDocumentSnapshot,
} from '@firebase/firestore'
import { db } from 'firebase-config'

interface DropdownProps {
  id: string
  sectionName: string
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  sectionIdRef: RefObject<HTMLDivElement>
}

const ChannelBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [channelName, setchannelName] = useState('')
  const [channelsList, setChannelsList] = useState<
    QueryDocumentSnapshot<DocumentData>[]
  >([])
  const sectionIdRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'channels')),
      (snapshot) => {
        setChannelsList(snapshot.docs)
      }
    )
    return () => unsubscribe()
  }, [])

  const handleCloseModal = () => setIsModalOpen(false)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setchannelName(e.target.value)

  const submitModal = async (e: FormEvent<HTMLFormElement>, sectionId: any) => {
    e.preventDefault()

    if (channelName.length > 0) {
      await addDoc(collection(db, 'channels', sectionId, 'channelName'), {
        channelName: channelName,
      })
    } else return

    handleCloseModal()
  }

  return (
    <div className='channel-bar shadow-lg'>
      <div className='channel-block'>
        <h5 className='channel-block-text'>Channels</h5>
      </div>

      <div className='channel-container'>
        {channelsList.map((channel) => (
          <Dropdown
            key={channel.id}
            sectionIdRef={sectionIdRef}
            setIsModalOpen={setIsModalOpen}
            sectionName={channel.data().sectionName}
            id={channel.id}
          />
        ))}
      </div>

      <Modal
        header='Create channel name'
        isModalOpen={isModalOpen}
        inputValue={channelName}
        handleInputChange={handleInputChange}
        submitModal={(e: FormEvent<HTMLFormElement>) =>
          submitModal(e, sectionIdRef.current?.dataset.id)
        }
        handleCloseModal={handleCloseModal}
      />
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

const Dropdown = ({
  id,
  sectionName,
  setIsModalOpen,
  sectionIdRef,
}: DropdownProps) => {
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
          {sectionName}
        </h5>
        <div
          ref={sectionIdRef}
          data-id={`${id}`}
          className='text-accent text-opacity-80 my-auto ml-auto'>
          <PlusIcon
            onClick={() => setIsModalOpen(true)}
            className='text-accent text-opacity-80 my-auto ml-auto w-7 h-7'
          />
        </div>
      </div>
      {expanded && <Channels id={id} />}
    </div>
  )
}

export default ChannelBar

import { useRouter } from 'next/router'
import { HashtagIcon } from '@heroicons/react/solid'

interface ChannelProps {
  id: string
  channelName: string
}

const Channel = ({ id, channelName }: ChannelProps) => {
  const router = useRouter()

  return (
    <div
      key={id}
      className='dropdown-selection'
      onClick={() =>
        router.push({
          pathname: `/channel/${id}`,
          query: { name: `${channelName}` },
        })
      }>
      <HashtagIcon className='text-gray-500 dark:text-gray-600 w-7 h-7 mr-2' />
      <h5 className='dropdown-selection-text'>{channelName}</h5>
    </div>
  )
}

export default Channel
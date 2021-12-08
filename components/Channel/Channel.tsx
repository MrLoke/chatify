import { useRouter } from 'next/router'
import { HashtagIcon } from '@heroicons/react/solid'
import { ChannelPropsTypes } from 'types/types'

const Channel = ({ id, channelName }: ChannelPropsTypes) => {
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
      <div className='flex w-7 h-7 mr-2'>
        <HashtagIcon className='text-gray-500 dark:text-gray-600' />
      </div>
      <h5 className='dropdown-selection-text'>{channelName}</h5>
    </div>
  )
}

export default Channel

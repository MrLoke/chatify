import Image from 'next/image'
import { DocumentData } from '@firebase/firestore'
import formatDistance from 'date-fns/formatDistance'

const WelcomeUser = ({ data }: { data: DocumentData }) => {
  return (
    <div className='post items-center flex-wrap justify-between'>
      <div className='flex items-center'>
        <p className='mr-2'>Welcome</p>
        <div className='relative w-10 h-10 mr-2'>
          <Image
            src={data.avatar}
            alt={`${data.userName} avatar`}
            layout='fill'
            objectFit='cover'
            className='rounded-full'
          />
        </div>
        <p className='text-blue-200 cursor-pointer'>@{data.displayName}</p>
        <p className='ml-2'>in Chatify!</p>
      </div>
      &nbsp;&nbsp;
      <span className='text-gray-500 dark:text-gray-400 text-sm'>
        Created{' '}
        {formatDistance(new Date(data.created), new Date(), {
          addSuffix: true,
        })}
      </span>
    </div>
  )
}

export default WelcomeUser

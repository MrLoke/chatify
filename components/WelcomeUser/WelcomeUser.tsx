import Image from 'next/image'
import { DocumentData } from '@firebase/firestore'
import formatDistance from 'date-fns/formatDistance'

const WelcomeUser = ({ data }: { data: DocumentData }) => {
  return (
    <div className='flex-col w-full my-2 py-1 px-4 md:px-8 hover:bg-gray-400 dark:hover:bg-gray-800 transition-all'>
      <span className='text-gray-500 text-sm'>
        Created{' '}
        {formatDistance(new Date(data.created), new Date(), {
          addSuffix: true,
        })}
      </span>
      <div className='flex items-center flex-wrap mt-2'>
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
        <p className='text-blue-200 mr-2 cursor-pointer truncate'>
          @{data.displayName}
        </p>
        <p>in Chatify!</p>
      </div>
    </div>
  )
}

export default WelcomeUser

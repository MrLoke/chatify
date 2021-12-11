import { useState } from 'react'
import Image from 'next/image'
import { DocumentData } from '@firebase/firestore'
import formatDistance from 'date-fns/formatDistance'

const ChatMessage = ({ data }: { data: DocumentData }) => {
  const [width, setWidth] = useState(300)
  const [height, setHeight] = useState(300)

  return (
    <div className='post'>
      <div className='avatar-wrapper'>
        <div className='w-12 h-12 relative'>
          <Image
            src={data.profileImage}
            alt={`${data.userName} avatar`}
            layout='fill'
            objectFit='cover'
            className='rounded-full'
          />
        </div>
      </div>

      <div className='post-content relative'>
        <p className='post-owner'>
          {data.userName}
          <small className='timestamp'>
            {data.timestamp
              ? formatDistance(
                  new Date(data.timestamp.seconds * 1000),
                  new Date(),
                  {
                    addSuffix: true,
                  }
                )
              : null}
          </small>
        </p>
        <p className='post-text'>{data.message}</p>
        {data.image ? (
          <div className='relative mt-2'>
            <Image
              src={data.image}
              alt={`Image post by ${data.userName}`}
              priority
              onLoadingComplete={(e) => {
                const ratio = Math.min(
                  300 / e.naturalWidth,
                  500 / e.naturalHeight
                )
                setWidth(e.naturalWidth * ratio)
                setHeight(e.naturalHeight * ratio)
              }}
              width={width}
              height={height}
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default ChatMessage

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import TopNavigation from 'components/TopNavigation/TopNavigation'
import ChatTextarea from 'components/ChatTextarea/ChatTextarea'
import ChatMessage from 'components/ChatMessage/ChatMessage'
import { ArrowCircleDownIcon } from '@heroicons/react/solid'
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection, orderBy, query } from '@firebase/firestore'
import useScrollToBottom from 'hooks/useScrollToBottom'
import { db } from 'firebase-config'

const ChatFeed = ({ messages }: { messages: string }) => {
  const [visible, setVisible] = useState(false)
  const router = useRouter()
  const contentRef = useRef<HTMLDivElement>(null)
  const { contentEndRef, scrollToBottom } = useScrollToBottom()
  const [messagesSnapshot] = useCollection(
    query(
      //@ts-ignore
      collection(db, 'channels', router.query.id, 'messages'),
      orderBy('timestamp', 'asc')
    )
  )

  useEffect(() => {
    contentRef.current?.addEventListener('scroll', () => {
      //@ts-ignore
      if (contentRef.current?.scrollTop <= 600) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [])

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((data) => (
        <ChatMessage key={data.id} data={data.data()} />
      ))
    } else {
      return JSON.parse(messages).map((data: any) => (
        <ChatMessage key={data.id} data={data} />
      ))
    }
  }

  return (
    <div className='content-container'>
      <TopNavigation />
      <div className='content-list' ref={contentRef}>
        {showMessages()}
        {visible ? (
          <button className='fixed right-10 bottom-24' onClick={scrollToBottom}>
            <ArrowCircleDownIcon className='w-8 h-8 text-blue-200' />
          </button>
        ) : null}
        <div ref={contentEndRef} />
      </div>
      <ChatTextarea />
    </div>
  )
}

export default ChatFeed

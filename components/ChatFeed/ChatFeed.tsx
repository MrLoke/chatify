import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import TopNavigation from 'components/TopNavigation/TopNavigation'
import ChatTextarea from 'components/ChatTextarea/ChatTextarea'
import ChatMessage from 'components/ChatMessage/ChatMessage'
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection, orderBy, query } from '@firebase/firestore'
import { db } from 'firebase-config'

const ChatFeed = ({ messages }: { messages: string }) => {
  const router = useRouter()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const channelId: string = router.query.id as string
  const [messagesSnapshot] = useCollection(
    query(
      collection(db, 'channels', channelId, 'messages'),
      orderBy('timestamp', 'asc')
    )
  )

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto' })
  }

  useEffect(scrollToBottom, [messagesSnapshot, router.query.name])

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
      <div className='content-list'>
        {showMessages()}
        <div ref={messagesEndRef} />
      </div>
      <ChatTextarea />
    </div>
  )
}

export default ChatFeed

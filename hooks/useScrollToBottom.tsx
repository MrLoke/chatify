import { useRef } from 'react'

const useScrollToBottom = () => {
  const contentEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    contentEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return { contentEndRef, scrollToBottom }
}

export default useScrollToBottom

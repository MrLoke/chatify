import { ChangeEvent, FormEvent, useCallback, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import {
  PlusCircleIcon,
  ArrowSmRightIcon,
  EmojiHappyIcon,
} from '@heroicons/react/solid'
import { addDoc, collection, serverTimestamp } from '@firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage'
import { auth, db, storage } from 'firebase-config'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import useOnClickOutside from 'hooks/useOnClickOutside'

const ChatTextarea = () => {
  const [user] = useAuthState(auth)
  const [message, setMessage] = useState('')
  const [showPicker, setShowPicker] = useState(false)
  const [selectedFile, setSelectedFile] = useState<any>(null)
  const emojiPickerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const channelId: string = router.query.id as string
  useOnClickOutside(emojiPickerRef, () => setShowPicker(false))

  const handleMessageChange = (e: ChangeEvent<HTMLInputElement>) =>
    setMessage(e.target.value)

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (selectedFile !== null) {
      const fileRef = ref(storage, `messages/${channelId}/${selectedFile.name}`)

      await uploadBytes(fileRef, selectedFile).then(async (snapshot) => {
        const downloadURL = await getDownloadURL(fileRef)
        await addDoc(collection(db, 'channels', channelId, 'messages'), {
          userName: user?.displayName,
          profileImage: user?.photoURL,
          message: message,
          image: downloadURL,
          timestamp: serverTimestamp(),
        })
      })
      setMessage('')
      setSelectedFile(null)
    }

    if (message.length > 0 && selectedFile === null) {
      await addDoc(collection(db, 'channels', channelId, 'messages'), {
        userName: user?.displayName,
        profileImage: user?.photoURL,
        message: message,
        timestamp: serverTimestamp(),
      })
      setMessage('')
    } else return
  }

  const onUploadFile = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setSelectedFile(e.target.files[0])
    }
  }, [])

  return (
    <div className='bottom-bar'>
      <form
        onSubmit={sendMessage}
        className='flex w-full relative items-center'>
        <div className='flex items-center mr-2'>
          <label htmlFor='upload-file' className='cursor-pointer'>
            <PlusCircleIcon className='text-blue-200 w-8 h-8' />
          </label>
          {selectedFile ? (
            <span className='w-32 truncate ml-2'>{selectedFile.name}</span>
          ) : null}
          <input
            style={{ display: 'none' }}
            onChange={onUploadFile}
            type='file'
            accept='.jpg, .jpeg, .png .webp .avif'
            id='upload-file'
          />
        </div>

        <input
          type='text'
          value={message}
          onChange={handleMessageChange}
          placeholder={`Enter message in ${router.query.name}`}
          className='bottom-bar-input'
        />

        <button type='submit'>
          <ArrowSmRightIcon className='text-blue-200 w-10 h-10' />
        </button>

        <div
          className='px-1 cursor-pointer'
          onClick={() => setShowPicker(!showPicker)}>
          <EmojiHappyIcon className='w-7 h-7 rounded-full bg-gray-600 text-yellow-300' />
        </div>
        {showPicker && (
          <div ref={emojiPickerRef}>
            <Picker
              style={{
                position: 'absolute',
                bottom: '100%',
                right: '0%',
                cursor: 'pointer',
              }}
              set='twitter'
              theme='dark'
              onSelect={(emoji) => {
                //@ts-ignore
                setMessage((prevState) => prevState + emoji.native)
              }}
            />
          </div>
        )}
      </form>
    </div>
  )
}

export default ChatTextarea

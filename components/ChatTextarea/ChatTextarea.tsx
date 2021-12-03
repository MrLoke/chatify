import { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import { PlusCircleIcon, ArrowSmRightIcon } from '@heroicons/react/solid'
import { addDoc, collection, serverTimestamp } from '@firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage'
import { auth, db, storage } from 'firebase-config'
import { useAuthState } from 'react-firebase-hooks/auth'

const ChatTextarea = () => {
  const [user] = useAuthState(auth)
  const [message, setMessage] = useState('')
  const [selectedFile, setSelectedFile] = useState<any>(null)
  const router = useRouter()

  const handleMessageChange = (e: ChangeEvent<HTMLInputElement>) =>
    setMessage(e.target.value)

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (selectedFile !== null) {
      const fileRef = ref(
        storage,
        `messages/${router.query.id}/${selectedFile.name}`
      )

      await uploadBytes(fileRef, selectedFile).then(async (snapshot) => {
        const downloadURL = await getDownloadURL(fileRef)
        //@ts-ignore
        await addDoc(collection(db, 'channels', router.query.id, 'messages'), {
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
      await addDoc(
        //@ts-ignore
        collection(db, 'channels', router.query.id, 'messages'),
        {
          userName: user?.displayName,
          profileImage: user?.photoURL,
          message: message,
          timestamp: serverTimestamp(),
        }
      )
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
      <form onSubmit={sendMessage} className='flex w-full'>
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
          placeholder='Enter message in'
          className='bottom-bar-input'
        />

        <button type='submit'>
          <ArrowSmRightIcon className='text-blue-200 w-10 h-10' />
        </button>
      </form>
    </div>
  )
}

export default ChatTextarea

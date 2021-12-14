import { useEffect, useState } from 'react'
import Image from 'next/image'
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner'
import {
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
} from 'firebase/firestore'
import formatDistance from 'date-fns/formatDistance'
import { db } from 'firebase-config'
import { SearchIcon } from '@heroicons/react/solid'

const UsersList = () => {
  const [users, setUsers] = useState<QueryDocumentSnapshot<DocumentData>[]>([])
  const [searchingUser, setSearchingUser] = useState('')

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'users'), orderBy('timestamp', 'desc')),
      (snapshot) => {
        setUsers(snapshot.docs)
      }
    )
    return () => unsubscribe()
  }, [])

  return (
    <div className='w-60 px-4 h-screen overflow-x-hidden overflow-y-scroll flex-col bg-gray-200 dark:bg-gray-800'>
      <div className='search'>
        <input
          className='search-input'
          type='text'
          placeholder='Search user'
          value={searchingUser}
          onChange={(e) => setSearchingUser(e.target.value.toLowerCase())}
        />
        <SearchIcon className='w-7 h-7 text-secondary my-auto' />
      </div>
      {users.length > 0 ? (
        users
          .filter((user) =>
            user.data().displayName.toLowerCase().includes(searchingUser)
          )
          .map((user) => (
            <div
              key={user.id}
              className='flex flex-col my-2 py-1 w-full items-center rounded-md cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700'>
              <div className='flex w-full'>
                <div className='relative mr-2'>
                  <Image
                    src={user.data().avatar}
                    alt={`${user.data().displayName} avatar`}
                    layout='fixed'
                    width={40}
                    height={40}
                    objectFit='cover'
                    className='rounded-full'
                  />
                </div>
                <div className='flex flex-col w-full'>
                  <p className='truncate w-full'>{user.data().displayName}</p>
                  <p className='truncate text-xs text-gray-500'>
                    Last sign in:{' '}
                    {formatDistance(new Date(user.data().status), new Date(), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))
      ) : (
        <div className='w-full flex justify-center'>
          <LoadingSpinner />
        </div>
      )}
    </div>
  )
}

export default UsersList

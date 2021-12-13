import { useRouter } from 'next/router'
import Drawer from 'components/Drawer/Drawer'
import { HashtagIcon, BellIcon, UserCircleIcon } from '@heroicons/react/solid'

const TopNavigation = () => {
  const router = useRouter()
  console.log(router)

  return (
    <div className='top-navigation'>
      <Drawer />

      <HashtagIcon className='w-7 h-7 title-hashtag' />
      <h5 className='title-text truncate text-gray-600 dark:text-gray-400'>
        {router.route === '/settings' && 'Settings'}
        {router.route === '/' && 'New register users'}
        {router.route === '/channel/[id]' && router.query.name}
      </h5>
      <div className='hidden sm:flex'>
        <BellIcon className='w-7 h-7 top-navigation-icon' />
        <UserCircleIcon className='w-7 h-7 top-navigation-icon' />
      </div>
    </div>
  )
}

export default TopNavigation

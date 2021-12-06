import { useRouter } from 'next/router'
import Drawer from 'components/Drawer/Drawer'
import {
  HashtagIcon,
  SearchIcon,
  BellIcon,
  UserCircleIcon,
} from '@heroicons/react/solid'

const TopNavigation = () => {
  const router = useRouter()

  return (
    <div className='top-navigation'>
      <Drawer />

      <HashtagIcon className='w-7 h-7 title-hashtag' />
      <h5 className='title-text truncate text-gray-600 dark:text-gray-400'>
        {router.query.name ? router.query.name : 'New register users'}
      </h5>
      <Search />
      <div className='hidden sm:flex'>
        <BellIcon className='w-7 h-7 top-navigation-icon' />
        <UserCircleIcon className='w-7 h-7 top-navigation-icon' />
      </div>
    </div>
  )
}

const Search = () => (
  <div className='search'>
    <input className='search-input' type='text' placeholder='Search...' />
    <SearchIcon className='w-7 h-7 text-secondary my-auto' />
  </div>
)

export default TopNavigation

import { useRef, useState } from 'react'
import Portal from '@reach/portal'
import { MenuIcon } from '@heroicons/react/outline'
import ChannelBar from 'components/ChannelBar/ChannelBar'
import SideBar from 'components/SideBar/SideBar'
import useOnClickOutside from 'hooks/useOnClickOutside'

const Drawer = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDrawer = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className='m-2 flex md:hidden'>
      <MenuIcon onClick={toggleDrawer} className='w-7 h-7 text-blue-200' />
      <DrawerElement isOpen={isOpen} toggleDrawer={toggleDrawer}>
        <div className={style.body}>
          <SideBar />
          <ChannelBar />
        </div>
      </DrawerElement>
    </div>
  )
}

const style = {
  orientation: {
    left: `flex h-full left-0 mx-0 my-0 absolute focus:outline-none `,
  },
  animation: {
    left: 'animate-drawer-left',
  },
  body: `flex-shrink flex-grow`,
  content: `relative flex flex-col w-full pointer-events-auto`,
  container: `fixed top-0 left-0 z-40 w-full h-full m-0 overflow-hidden`,
  overlay: `fixed top-0 left-0 z-30 w-screen h-screen bg-black opacity-50`,
}

interface DrawerTypes {
  children: any
  isOpen: boolean
  toggleDrawer: () => void
}

const DrawerElement = ({ children, isOpen, toggleDrawer }: DrawerTypes) => {
  const ref = useRef<HTMLDivElement>(null)
  useOnClickOutside(ref, toggleDrawer)

  return (
    <Portal>
      {isOpen && (
        <>
          <div className={style.overlay} />
          <div className={style.container}>
            <div
              aria-modal={true}
              className={style.orientation.left}
              ref={ref}
              role='dialogue'
              tabIndex={-1}>
              <div className={`${style.animation.left} ${style.content}`}>
                {children}
              </div>
            </div>
          </div>
        </>
      )}
    </Portal>
  )
}

export default Drawer

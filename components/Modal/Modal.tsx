import { ReactNode, useRef } from 'react'
import Portal from '@reach/portal'
import useOnClickOutside from 'hooks/useOnClickOutside'
import { ModalPropsTypes } from 'types/types'

const Modal = ({
  header,
  isModalOpen,
  inputValue,
  handleInputChange,
  submitModal,
  handleCloseModal,
}: ModalPropsTypes) => {
  return (
    <ModalElement isOpen={isModalOpen} handleCloseModal={handleCloseModal}>
      <div className='flex items-start justify-between p-5'>
        <h3 className='text-gray-800 text-2xl font-semibold'>{header}</h3>
      </div>
      <form onSubmit={submitModal} className='p-3'>
        <div className='relative flex-auto'>
          <input
            value={inputValue}
            onChange={handleInputChange}
            type='text'
            placeholder='Channel name'
            className='p-2 w-full border-2 outline-none border-blue-500 rounded bg-gray-100 text-gray-800 placeholder-gray-500'
          />
        </div>
        <div className='flex items-center justify-center py-6 px-3'>
          <button
            className='w-9/12 bg-blue-200 text-gray-100 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
            type='submit'>
            Add
          </button>
          <button
            className='text-red-500 border-2 rounded border-red-300 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none mr-1 mb-1 ease-linear transition-all duration-150'
            type='button'
            onClick={handleCloseModal}>
            Close
          </button>
        </div>
      </form>
    </ModalElement>
  )
}

const style = {
  content: `relative flex flex-col mt-64 rounded bg-white pointer-events-auto`,
  container: `fixed top-0 overflow-y-auto left-0 z-40 w-full h-full m-0`,
  overlay: `fixed top-0 left-0 z-30 w-screen h-screen bg-black opacity-50`,
  orientation: `mx-8 md:m-auto md:w-6/12 lg:w-4/12 xl:w-3/12 focus:outline-none`,
}

interface ModalTypes {
  children: ReactNode
  isOpen: boolean
  handleCloseModal: () => void
}

const ModalElement = ({ children, isOpen, handleCloseModal }: ModalTypes) => {
  const modalRef = useRef<HTMLDivElement>(null)
  useOnClickOutside(modalRef, handleCloseModal)

  return (
    <Portal>
      {isOpen && (
        <>
          <div className={style.overlay} />
          <div className={style.container}>
            <div
              aria-modal={true}
              className={style.orientation}
              ref={modalRef}
              role='dialogue'
              tabIndex={-1}>
              <div className={style.content}>{children}</div>
            </div>
          </div>
        </>
      )}
    </Portal>
  )
}

export default Modal

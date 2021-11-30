import { useRef } from 'react'
import useOnClickOutside from 'hooks/useOnClickOutside'

interface ModalProps {
  header: string
  isModalOpen: boolean
  inputValue: any
  handleInputChange: any
  submitModal: any
  handleCloseModal: any
}

const Modal = ({
  header,
  isModalOpen,
  inputValue,
  handleInputChange,
  submitModal,
  handleCloseModal,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)
  useOnClickOutside(modalRef, handleCloseModal)

  return (
    <>
      {isModalOpen ? (
        <>
          <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
            <div className='relative w-auto my-6 mx-auto max-w-sm'>
              {/*content*/}
              <div
                ref={modalRef}
                className='border-0 px-3 py-2 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                {/*header*/}
                <div className='flex items-start justify-between p-5'>
                  <h3 className='text-gray-800 text-2xl font-semibold'>
                    {header}
                  </h3>
                </div>
                {/*body*/}
                <form onSubmit={submitModal}>
                  <div className='relative p-3 flex-auto'>
                    <input
                      value={inputValue}
                      onChange={handleInputChange}
                      type='text'
                      placeholder='Channel name'
                      className='p-2 w-full border-2 outline-none border-blue-500 rounded bg-gray-100 text-gray-800 placeholder-gray-500'
                    />
                  </div>
                  {/*footer*/}
                  <div className='flex items-center justify-center py-6 px-3'>
                    <button
                      className='w-9/12 bg-blue-200 text-gray-100 font-bold uppercase text-sm px-6 py-3 rounded shadow
                      hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
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
              </div>
            </div>
          </div>
          <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
        </>
      ) : null}
    </>
  )
}

export default Modal

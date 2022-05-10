//@ts-nocheck
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Typography from '../Typography'

interface ModalProps {
    label?: string | JSX.Element
    buttonLabel?: string
    title: string
    children: React.ReactNode
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
    variant: 'success' | 'error'
    initialState?: boolean
}

const VARIANT = {
    success:
        'inline-flex justify-center rounded-md border border-transparent bg-gray-900 px-4 py-2 text-sm font-medium text-gray-100 hover:bg-gray-700 hover:text-gray-300',
    error: 'inline-flex justify-center rounded-md border border-transparent bg-red-700 px-4 py-2 text-sm font-medium text-red-100 hover:bg-red-800 hover:text-red-200',
}
const Modal: React.FC<ModalProps> = ({
    label,
    buttonLabel,
    title,
    children,
    variant = 'success',
    initialState = false,
    onClick = () => {},
}) => {
    const [isOpen, setIsOpen] = useState(initialState)

    const closeModal = () => {
        setIsOpen(false)
    }

    const openModal = () => {
        setIsOpen(true)
    }

    return (
        <>
            <div className="flex items-center justify-center">
                <Typography onClick={openModal}>{label}</Typography>
            </div>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        {title}
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <Typography className="text-sm text-gray-500">
                                            {children}
                                        </Typography>
                                    </div>

                                    <div className="mt-4 flex gap-2">
                                        {variant === 'success' ? (
                                            <>
                                                <button
                                                    type="button"
                                                    className={VARIANT[variant]}
                                                    onClick={() => {
                                                        onClick && onClick()
                                                        closeModal()
                                                    }}
                                                >
                                                    {buttonLabel}
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    type="button"
                                                    className={VARIANT[variant]}
                                                    onClick={() => {
                                                        onClick()
                                                        closeModal()
                                                    }}
                                                >
                                                    {buttonLabel}
                                                </button>
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-300 hover:text-gray-700 "
                                                    onClick={closeModal}
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default Modal

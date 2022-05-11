//@ts-nocheck
import { classNames } from '@/utils/styling'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef, useState } from 'react'
import Typography from '../Typography'

interface ModalProps {
    className?: string
    label?: string | JSX.Element
    buttonLabel?: string
    secondaryButtonLabel?: string
    title: string
    children: React.ReactNode
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
    onClickSecondary?: (event: React.MouseEvent<HTMLDivElement>) => void
    onCancel?: (event: React.MouseEvent<HTMLDivElement>) => void
    onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void
    variant: 'success' | 'error' | 'base'
    initialState?: boolean
}

const VARIANT = {
    success:
        'inline-flex justify-center rounded-md border border-transparent bg-green-700 px-4 py-2 text-sm font-medium text-green-100 hover:opacity-80 hover:text-gray-300',
    error: 'inline-flex justify-center rounded-md border border-transparent bg-red-700 px-4 py-2 text-sm font-medium text-red-100 hover:opacity-80 hover:text-red-200',
    base: 'inline-flex justify-center rounded-md border border-transparent bg-gray-700 px-4 py-2 text-sm font-medium text-gray-100 hover:opacity-80 hover:text-gray-200',
}

const SecondaryActionModal: React.FC<ModalProps> = ({
    className,
    label,
    buttonLabel,
    secondaryButtonLabel,
    title,
    children,
    variant = 'success',
    initialState = false,
    onClick = () => {},
    onClickSecondary = () => {},
    onCancel = () => {},
    onKeyDown = () => {},
}) => {
    const [isOpen, setIsOpen] = useState(initialState)
    const titleRef = useRef(null)

    const closeModal = () => {
        setIsOpen(false)
    }

    const openModal = () => {
        setIsOpen(true)
    }

    return (
        <>
            <div
                className={classNames(
                    className,
                    'flex items-center justify-center'
                )}
            >
                <Typography
                    variant="md"
                    onClick={openModal}
                    className="cursor-pointer"
                >
                    {label}
                </Typography>
            </div>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-10 "
                    initialFocus={titleRef}
                    onClose={closeModal}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            onKeyDown && onKeyDown(e)
                            closeModal()
                        }
                    }}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-50 blur-sm" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto ">
                        <div className="flex min-h-full items-center justify-center p-4 text-center ">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className=" w-full max-w-screen-lg  transform overflow-hidden rounded-xl bg-white p-6 text-left  shadow-xl transition-all">
                                    <div className="flex items-center justify-between w-full">
                                        <Dialog.Title
                                            ref={titleRef}
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            {title}
                                        </Dialog.Title>
                                        <button
                                            type="button"
                                            className={VARIANT[variant]}
                                            onKeyDown={() => {
                                                onClickSecondary()
                                                closeModal()
                                            }}
                                            onClick={() => {
                                                onClickSecondary()
                                                closeModal()
                                            }}
                                        >
                                            {secondaryButtonLabel}
                                        </button>
                                    </div>
                                    <div className="mt-2">
                                        <Typography className="text-sm text-gray-500">
                                            {children}
                                        </Typography>
                                    </div>

                                    <div className="mt-4 flex gap-2 ">
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
                                                    onKeyDown={() => {
                                                        onClick()
                                                        closeModal()
                                                    }}
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
                                                    onClick={() => {
                                                        onCancel && onCancel()
                                                        closeModal()
                                                    }}
                                                >
                                                    Close
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

export default SecondaryActionModal

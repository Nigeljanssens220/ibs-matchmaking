import { Resume } from '@/types/database'
import { Popover, Transition } from '@headlessui/react'
import {
    DownloadIcon,
    HeartIcon,
    PaperAirplaneIcon,
} from '@heroicons/react/outline'
import {
    DotsVerticalIcon,
    HeartIcon as HeartIconSolid,
    PaperAirplaneIcon as PaperAirplaneIconSolid,
} from '@heroicons/react/solid'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { Fragment, useState } from 'react'
import { useSWRConfig } from 'swr'
import Typography from '../Typography'
import PopoverItem from './PopoverItem'

interface PopoverProps {
    data: Resume
}

const PopOver: React.FC<PopoverProps> = ({ data }) => {
    const { data: session, status } = useSession()
    const [resume, setResume] = useState(data)
    const { mutate } = useSWRConfig()

    const downloadHandler = async (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault()
        const config = {
            headers: {
                Authorization: `Bearer ${session!.accessToken}`,
            },
            params: {
                blobName: data.id,
            },
        }

        // send request to backend to download resume
        const response = await axios.get(
            'https://ibs-matchmaking-api.azurewebsites.net/downloadBlob',
            config
        )

        const link = document.createElement('a')
        link.download = resume.id
        link.href = response.data.blobURI
        link.click()
        link.remove()
    }

    const activateHandler = async (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault()

        if (data.matchmaking) return

        const config = {
            headers: {
                Authorization: `Bearer ${session!.accessToken}`,
            },
        }

        // send request to backend to update resume
        const response = await axios.post(
            'https://ibs-matchmaking-api.azurewebsites.net/updateItem',
            {
                fileName: data.id,
                description: data.description,
                matchmaking: true,
            },
            config
        )

        // update existing data in cache with newly uploaded resume
        mutate(
            status !== 'authenticated'
                ? null
                : [
                      'https://ibs-matchmaking-api.azurewebsites.net/readItems',
                      session!.accessToken,
                  ]
        )
        setResume(data)
    }

    return (
        <Popover className="relative">
            {({ open }) => (
                <>
                    <Popover.Button
                        // onClick={}
                        className={`
                ${open ? '' : 'text-opacity-80'}
                group inline-flex items-center rounded-md px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                    >
                        <DotsVerticalIcon
                            className={`${open ? '' : 'text-opacity-70'}
                  ml-2 h-5 w-5 text-gray-100 transition duration-150 ease-in-out group-hover:text-opacity-80`}
                            aria-hidden="true"
                        />
                    </Popover.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                        //@ts-ignore
                        className="absolute md:w-72 rounded-md bg-white shadow-lg bottom-full right-0"
                    >
                        <Popover.Panel className="absolute left-1/2 z-10 mt-3 whitespace-nowrap -translate-x-1/2 transform px-4 lg:max-w-3xl">
                            {({ close }) => (
                                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div className="relative grid space-y-2 bg-white p-2 w-full text-gray-900 ">
                                        <div className="flex group w-full pr-2 py-2 rounded-lg text-gray-800 hover:bg-gray-900 hover:text-gray-100 cursor-pointer ">
                                            <PopoverItem
                                                className="flex items-center gap-4"
                                                startIcon={
                                                    <>
                                                        <HeartIcon className="flex  group-hover:hidden shrink-0 w-8 h-8 items-center justify-center group-hover:text-yellow-500 transition-colors duration-100 " />
                                                        <HeartIconSolid className="hidden group-hover:flex shrink-0 w-8 h-8 items-center justify-center  group-hover:text-yellow-500 transition-colors duration-100 " />
                                                    </>
                                                }
                                            >
                                                <div
                                                    onClick={(e) => {
                                                        activateHandler(e)
                                                        close()
                                                    }}
                                                    className="flex flex-col text-left"
                                                >
                                                    <Typography className="px-2">
                                                        Activate
                                                    </Typography>
                                                    <Typography className="hidden md:block text-gray-500 group-hover:text-gray-300 transition-colors duration-400 px-2">
                                                        Activate this resume for
                                                        matchmaking
                                                    </Typography>
                                                </div>
                                            </PopoverItem>
                                        </div>
                                        <div className="flex group w-full pr-2 py-2 rounded-lg text-gray-800 hover:bg-gray-900 hover:text-gray-100 cursor-pointer">
                                            <PopoverItem
                                                className="flex items-center gap-4"
                                                href="mailto:?body=Attach your downloaded CV to this email!"
                                                startIcon={
                                                    <>
                                                        <PaperAirplaneIcon className="flex group-hover:hidden shrink-0 w-8 h-8 items-center justify-center group-hover:text-yellow-500 transition-colors duration-100" />
                                                        <PaperAirplaneIconSolid className="hidden group-hover:flex  shrink-0 w-8 h-8 items-center justify-center group-hover:text-yellow-500 transition-colors duration-100" />
                                                    </>
                                                }
                                            >
                                                <div
                                                    className="flex flex-col text-left"
                                                    onClick={() => {
                                                        close()
                                                    }}
                                                >
                                                    <Typography className="px-2">
                                                        Share
                                                    </Typography>
                                                    <Typography className="hidden md:block text-gray-500 group-hover:text-gray-300 transition-colors duration-400 px-2">
                                                        Share your resume
                                                    </Typography>
                                                </div>
                                            </PopoverItem>
                                        </div>
                                        <div className="flex group w-full pr-2 py-2 rounded-lg text-gray-800 hover:bg-gray-900 hover:text-gray-100 cursor-pointer ">
                                            <PopoverItem
                                                className="flex items-center gap-4"
                                                startIcon={
                                                    <DownloadIcon className="flex shrink-0 w-8 h-8 items-center justify-center group-hover:text-yellow-500 transition-colors duration-100" />
                                                }
                                            >
                                                <div
                                                    onClick={(e) => {
                                                        downloadHandler(e)
                                                        close()
                                                    }}
                                                    className="flex flex-col text-left"
                                                >
                                                    <Typography className="px-2">
                                                        Download
                                                    </Typography>
                                                    <Typography className="hidden md:block text-gray-500 group-hover:text-gray-300 transition-colors duration-400 px-2">
                                                        Download your resume
                                                    </Typography>
                                                </div>
                                            </PopoverItem>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    )
}

export default PopOver

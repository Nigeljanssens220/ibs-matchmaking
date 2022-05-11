/* eslint-disable @next/next/no-img-element */
import { dashboardItems } from '@/lib/dashboardItems'
import { Dialog, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { LogoutIcon } from '@heroicons/react/solid'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Fragment, useState } from 'react'
import NavLink from '../NavLink'
import Typography from '../Typography'
import SidebarItem from './SidebarItem'

const Sidebar: React.FC = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { data: session } = useSession()
    const router = useRouter()

    const handleLogout = () => {
        if (!session) {
            router.push('/')
        }

        signOut({ callbackUrl: '/' })
    }

    return (
        <div className="h-screen bg-gray-800 overflow-auto no-scrollbar w-full ">
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 flex z-40 md:hidden"
                    onClose={setSidebarOpen}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-800 bg-opacity-75" />
                    </Transition.Child>
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-700">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-in-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in-out duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="absolute top-0 right-0 -mr-12 pt-2">
                                    <button
                                        type="button"
                                        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <span className="sr-only">
                                            Close sidebar
                                        </span>
                                        <XIcon
                                            className="h-12 w-12 text-white"
                                            aria-hidden="true"
                                        />
                                    </button>
                                </div>
                            </Transition.Child>
                            <div className="flex-1 h-0 py-4 overflow-y-auto">
                                <div className="flex-shrink-0 flex items-center px-4">
                                    <NavLink href="/">
                                        <Typography
                                            component="span"
                                            className="text-white cursor-pointer"
                                            variant="lg"
                                            weight="medium"
                                        >
                                            MATCHIFY
                                        </Typography>
                                    </NavLink>
                                </div>
                                {dashboardItems.map((item) => (
                                    <div className="flex" key={item.label}>
                                        <SidebarItem
                                            href={item.href}
                                            startIcon={
                                                <item.icon
                                                    width={32}
                                                    height={32}
                                                    className="mx-5"
                                                />
                                            }
                                        >
                                            {item.label}
                                        </SidebarItem>
                                    </div>
                                ))}
                                <div>
                                    <button
                                        onClick={handleLogout}
                                        className={
                                            'text-gray-400 hover:text-yellow-500/80 w-full flex items-center p-2 my-2 transition-colors duration-400 justify-start '
                                        }
                                    >
                                        <Typography
                                            component="span"
                                            weight="medium"
                                            variant="base"
                                            className={'flex items-center '}
                                        >
                                            <LogoutIcon
                                                width={32}
                                                height={32}
                                                className="mx-5"
                                            />
                                            Logout
                                        </Typography>
                                    </button>
                                </div>
                            </div>
                            <div className="flex-shrink-0 flex bg-gray-700 p-4 pl-4">
                                <NavLink
                                    href="/profile"
                                    className="flex-shrink-0 w-full group block"
                                >
                                    <div className="flex items-center">
                                        <div>
                                            <img
                                                className="inline-block h-9 w-9 rounded-full"
                                                src="/illustrations/AvatarGirl.svg"
                                                alt=""
                                            />
                                        </div>
                                        <div className="ml-3">
                                            <Typography
                                                component="p"
                                                variant="sm"
                                                weight="medium"
                                                className="text-gray-100"
                                            >
                                                {session?.user?.name}
                                            </Typography>
                                            <Typography
                                                component="p"
                                                variant="sm"
                                                weight="medium"
                                                className="text-gray-100 group-hover:text-gray-300"
                                            >
                                                View profile
                                            </Typography>
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                        </div>
                    </Transition.Child>
                    <div className="flex-shrink-0 w-14">
                        {/* Force sidebar to shrink to fit close icon */}
                    </div>
                </Dialog>
            </Transition.Root>

            {/* Static sidebar for desktop */}
            <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
                <div className="flex-1 flex flex-col min-h-0 bg-gray-700">
                    <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                        <div className="flex items-center flex-shrink-0 p-4 justify-center">
                            <NavLink href="/">
                                <Typography
                                    component="span"
                                    className="text-white cursor-pointer hover:text-yellow-500"
                                    variant="h3"
                                    weight="medium"
                                >
                                    MATCHIFY
                                </Typography>
                            </NavLink>
                        </div>
                        {dashboardItems.map((item) => (
                            <div className="flex" key={item.label}>
                                <SidebarItem
                                    href={item.href}
                                    startIcon={
                                        <item.icon
                                            width={32}
                                            height={32}
                                            className="mx-5"
                                        />
                                    }
                                >
                                    {item.label}
                                </SidebarItem>
                            </div>
                        ))}
                        <div>
                            <button
                                onClick={handleLogout}
                                className={
                                    'text-gray-400 hover:text-yellow-500/80 w-full flex items-center p-2 my-2 transition-colors duration-400 justify-start '
                                }
                            >
                                <Typography
                                    component="span"
                                    weight="medium"
                                    variant="base"
                                    className={'flex items-center '}
                                >
                                    <LogoutIcon
                                        width={32}
                                        height={32}
                                        className="mx-5"
                                    />
                                    Logout
                                </Typography>
                            </button>
                        </div>
                    </div>
                    <div className="flex-shrink-0 flex bg-gray-700 p-4 justify-center ">
                        <NavLink
                            href="/profile"
                            className="flex-shrink-0 w-full group block"
                        >
                            <div className="flex items-center">
                                <div>
                                    <img
                                        className="inline-block h-9 w-9 rounded-full"
                                        src="/illustrations/AvatarGirl.svg"
                                        alt=""
                                    />
                                </div>
                                <div className="ml-3 ">
                                    <Typography
                                        component="p"
                                        variant="sm"
                                        weight="medium"
                                        className="text-gray-100 group-hover:text-gray-300"
                                    >
                                        {session?.user?.name}
                                    </Typography>
                                    <Typography
                                        component="p"
                                        variant="sm"
                                        weight="medium"
                                        className="text-gray-100 group-hover:text-gray-300"
                                    >
                                        View profile
                                    </Typography>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className="md:pl-64 flex flex-col flex-1">
                <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-700">
                    <button
                        type="button"
                        className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-100"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <MenuIcon
                            className="h-6 w-6 text-gray-100"
                            aria-hidden="true"
                        />
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}

export default Sidebar

import { Menu, Transition } from '@headlessui/react'
import { FC, Fragment } from 'react'
import {
    UserCircleIcon,
    LogoutIcon,
    CogIcon,
    PencilIcon,
    BookOpenIcon,
} from '@heroicons/react/solid'
import Button from '@/components/Button'
import { signIn, signOut, useSession } from 'next-auth/react'

const NavBarMenu: FC = () => {
    const { data: session } = useSession()

    const handleLoginLogout = () => {
        session ? signOut() : signIn()
    }

    return (
        <div className="w-56 text-right">
            {session ? (
                <Menu as="div" className="relative inline-block text-left">
                    <div className="hidden sm:block">
                        <Menu.Button className="inline-flex justify-center w-full px-4 py-2 items-center font-medium text-zinc-800 bg-white rounded-md  hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                            Account
                            <UserCircleIcon
                                className="w-8 h-8 ml-2 -mr-1 text-zinc-800 hover:text-zinc-700"
                                aria-hidden="true"
                            />
                        </Menu.Button>
                    </div>
                    <div className="block sm:hidden">
                        <Menu.Button className="inline-flex justify-center w-full items-center font-medium rounded-full  hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                            <UserCircleIcon
                                className="w-12 h-12  text-white hover:text-zinc-400"
                                aria-hidden="true"
                            />
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="px-1 py-1 ">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className={`${
                                                active
                                                    ? 'bg-zinc-500 text-white font-semibold'
                                                    : 'text-gray-900'
                                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                        >
                                            {active ? (
                                                <PencilIcon
                                                    className="w-5 h-5 mr-2 text-white"
                                                    aria-hidden="true"
                                                />
                                            ) : (
                                                <PencilIcon
                                                    className="w-5 h-5 mr-2 text-black"
                                                    aria-hidden="true"
                                                />
                                            )}
                                            Edit
                                        </button>
                                    )}
                                </Menu.Item>
                            </div>
                            <div className="px-1 py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className={`${
                                                active
                                                    ? 'bg-zinc-500 text-white font-semibold'
                                                    : 'text-gray-900'
                                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                        >
                                            {active ? (
                                                <BookOpenIcon
                                                    className="w-5 h-5 mr-2"
                                                    aria-hidden="true"
                                                />
                                            ) : (
                                                <BookOpenIcon
                                                    className="w-5 h-5 mr-2"
                                                    aria-hidden="true"
                                                />
                                            )}
                                            My matches
                                        </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className={`${
                                                active
                                                    ? 'bg-zinc-500 text-white font-semibold'
                                                    : 'text-gray-900'
                                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                        >
                                            {active ? (
                                                <CogIcon
                                                    className="w-5 h-5 mr-2"
                                                    aria-hidden="true"
                                                />
                                            ) : (
                                                <CogIcon
                                                    className="w-5 h-5 mr-2"
                                                    aria-hidden="true"
                                                />
                                            )}
                                            Settings
                                        </button>
                                    )}
                                </Menu.Item>
                            </div>
                            <div className="px-1 py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className={`${
                                                active
                                                    ? 'bg-zinc-500 text-white font-semibold'
                                                    : 'text-gray-900'
                                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                            onClick={handleLoginLogout}
                                        >
                                            {active ? (
                                                <LogoutIcon
                                                    className="w-5 h-5 mr-2 text-white"
                                                    aria-hidden="true"
                                                />
                                            ) : (
                                                <LogoutIcon
                                                    className="w-5 h-5 mr-2 text-black"
                                                    aria-hidden="true"
                                                />
                                            )}
                                            Log out
                                        </button>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            ) : (
                <Button className="px-6 py-3" onClick={handleLoginLogout}>
                    Log in
                </Button>
            )}
        </div>
    )
}

export default NavBarMenu

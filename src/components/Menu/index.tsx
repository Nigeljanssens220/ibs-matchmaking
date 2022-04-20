/* eslint-disable @next/next/no-img-element */
import React, { FC, useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Button from '@/components/ButtonNew'
import { MenuIcon, XIcon } from '@heroicons/react/solid'
import NavLink from '../NavLink'
import Typography from '../Typography'
import { headers } from '@/lib/headers'

const Menu: FC = () => {
    const [show, setShow] = useState(false)
    const { data: session } = useSession()

    const handleClick = (e: any) => {
        e.preventDefault()
        setShow(!show)
    }
    const handleLoginLogout = async () => {
        session ? signOut() : signIn()
    }

    return (
        <div className="flex flex-row items-center">
            <div>
                <button
                    onClick={handleClick}
                    className="block md:hidden text-black hover:text-gray-700 focus:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                    <MenuIcon
                        className="text-white m-2"
                        width={32}
                        height={32}
                    />
                </button>
                <div
                    id="menu"
                    className={`md:block lg:block ${show ? '' : 'hidden'} `}
                >
                    <button
                        onClick={handleClick}
                        className="p-2 block md:hidden text-black hover:text-gray-700 focus:text-gray-700 fixed focus:outline-none focus:ring-2 focus:ring-gray-500 bg-white md:bg-transparent z-30 top-7 right-4"
                    >
                        <XIcon className="text-black " width={32} height={32} />
                    </button>
                    <ul className="flex flex-col md:flex md:flex-row items-center justify-center fixed md:relative top-0 bottom-0 left-0 right-0 bg-white md:bg-transparent z-20 space-y-10 md:space-y-0 md:space-x-10">
                        {headers.map(({ label, href }) => (
                            <li
                                className="text-zinc-900 md:text-gray-200 hover:text-gray-500 cursor-pointer "
                                key={label}
                            >
                                <NavLink href={href}>{label}</NavLink>
                            </li>
                        ))}
                        <li className=" text-zinc-900 text-lg hover:text-gray-700 cursor-pointer ">
                            {session ? (
                                <>
                                    <Button
                                        onClick={handleLoginLogout}
                                        variant={'whiteFilled'}
                                        className=" hidden md:inline"
                                    >
                                        Log out
                                    </Button>
                                    <button
                                        onClick={handleLoginLogout}
                                        className="md:hidden"
                                    >
                                        <Typography
                                            variant="lg"
                                            weight="medium"
                                            className="p-2"
                                        >
                                            Log out
                                        </Typography>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        onClick={handleLoginLogout}
                                        variant={'whiteFilled'}
                                        className=" hidden md:inline"
                                    >
                                        Log in
                                    </Button>
                                    <button
                                        onClick={handleLoginLogout}
                                        className="md:hidden"
                                    >
                                        <Typography
                                            variant="lg"
                                            weight="medium"
                                            className="p-2"
                                        >
                                            Log in
                                        </Typography>
                                    </button>
                                </>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Menu

import { CogIcon, LogoutIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import React, { FC } from 'react'
import Typography from '../Typography'
import SidebarItem, { SidebarItemProps } from './SidebarItem'
import { signOut } from 'next-auth/react'

interface SidebarProps {
    label: string
    items: SidebarItemProps[]
}

const Sidebar: FC<SidebarProps> = ({ label, items }) => {
    const handleLogout = () => {
        signOut({ callbackUrl: '/' })
    }
    return (
        <div className="h-screen hidden lg:block shadow-lg relative w-80">
            <div className="h-full bg-gray-700">
                <div className="flex items-center justify-center py-6 mx-auto">
                    <Link href="/" passHref>
                        <Typography
                            component="p"
                            className="text-white cursor-pointer"
                            variant="h3"
                            weight="medium"
                        >
                            {label}
                        </Typography>
                    </Link>
                </div>
                <nav className="mt-6">
                    <div>
                        {items.map(({ label, href, startIcon }) => (
                            <div className="flex" key={label}>
                                <SidebarItem href={href} startIcon={startIcon}>
                                    {label}
                                </SidebarItem>
                            </div>
                        ))}
                    </div>
                    <div className="absolute bottom-0 border-t-2 border-white w-full ">
                        <SidebarItem
                            href="/dashboard/settings"
                            startIcon={
                                <CogIcon
                                    width={32}
                                    height={32}
                                    className="mx-5"
                                />
                            }
                        >
                            Settings
                        </SidebarItem>
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
                                    variant="lg"
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
                </nav>
            </div>
        </div>
    )
}

export default Sidebar

/* eslint-disable @next/next/no-html-link-for-pages */
import { classNames } from '@/utils/styling'
import {
    BriefcaseIcon,
    CogIcon,
    FolderIcon,
    HomeIcon,
} from '@heroicons/react/solid'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC, ReactNode } from 'react'
import NavLink from '../NavLink'
import Typography from '../Typography'

const items = [
    {
        label: 'Home',
        href: '/dashboard',
    },
    {
        label: 'Projects',
        href: '/dashboard/projects',
    },
    {
        label: 'Resources',
        href: '/dashboard/resources',
    },
    {
        label: 'Settings',
        href: '/dashboard/settings',
    },
]

interface SidebarItemProps extends React.HTMLProps<HTMLAnchorElement> {
    href: string
    children?: ReactNode
    className?: string
    startIcon?: ReactNode
}

//@ts-ignore
const SidebarItem: FC<SidebarItemProps> = ({
    href,
    children,
    className,
    startIcon,
}) => {
    const router = useRouter()
    const isActive = router.pathname === href

    return (
        <Link href={href} passHref>
            <a
                className={classNames(
                    className,
                    isActive
                        ? 'text-white border-l-4 border-yellow-500 pointer-events-none '
                        : 'text-gray-400 hover:text-yellow-500/80',
                    'w-full flex items-center pl-6 p-2 my-2 transition-colors duration-300 justify-start '
                )}
                href="#"
            >
                <Typography
                    component="span"
                    weight="medium"
                    variant="lg"
                    className={classNames(
                        isActive ? 'text-xl ml-3 text-' : '',
                        'flex items-center '
                    )}
                >
                    {startIcon && startIcon}
                    {children}
                </Typography>
            </a>
        </Link>
    )
}

const Sidebar = () => {
    return (
        <div className="h-screen hidden lg:block shadow-lg relative w-80">
            <div className="h-full bg-gray-700 ">
                <div className="flex items-center justify-start pt-6 ml-8">
                    <Link href="/" passHref>
                        <Typography
                            component="p"
                            className="text-white cursor-pointer"
                            variant="h3"
                            weight="medium"
                        >
                            IBS Matchmaking
                        </Typography>
                    </Link>
                </div>
                <nav className="mt-6">
                    <div>
                        <div className="flex">
                            <SidebarItem
                                href="/dashboard"
                                startIcon={
                                    <HomeIcon
                                        width={32}
                                        height={32}
                                        className="mr-5"
                                    />
                                }
                            >
                                Home
                            </SidebarItem>
                        </div>
                        <div className="flex">
                            <SidebarItem
                                href="/dashboard/projects"
                                startIcon={
                                    <BriefcaseIcon
                                        width={32}
                                        height={32}
                                        className="mr-5"
                                    />
                                }
                            >
                                Projects
                            </SidebarItem>
                        </div>

                        <div className="flex">
                            <SidebarItem
                                href="/dashboard/resources"
                                startIcon={
                                    <FolderIcon
                                        width={32}
                                        height={32}
                                        className="mr-5"
                                    />
                                }
                            >
                                Resources
                            </SidebarItem>
                        </div>
                    </div>
                </nav>
                <div className="absolute bottom-0 border-t-2 border-white w-full flex">
                    <SidebarItem
                        href="/dashboard/settings"
                        startIcon={
                            <CogIcon width={32} height={32} className="mr-5" />
                        }
                    >
                        Settings
                    </SidebarItem>
                </div>
            </div>
        </div>
    )
}

export default Sidebar

/* eslint-disable @next/next/no-html-link-for-pages */
import { classNames } from '@/utils/styling'
import {
    AcademicCapIcon,
    BriefcaseIcon,
    CogIcon,
    HomeIcon,
} from '@heroicons/react/solid'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC, ReactNode } from 'react'
import Typography from '../Typography'

const items = [
    {
        label: 'Home',
        href: '/dashboard',
        startIcon: <HomeIcon width={32} height={32} className="mx-5" />,
    },
    {
        label: 'Projects',
        href: '/dashboard/projects',
        startIcon: <BriefcaseIcon width={32} height={32} className="mx-5" />,
    },
    {
        label: 'Resumes',
        href: '/dashboard/resumes',
        startIcon: <AcademicCapIcon width={32} height={32} className="mx-5" />,
    },
    // add more sidebar items here
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
            <div className="h-full bg-gradient-to-br from-cyan-700/50 to-cyan-900">
                <div className="flex items-center justify-start pt-6 ml-12">
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
                        {items.map(({ label, href, startIcon }) => (
                            <div className="flex" key={label}>
                                <SidebarItem href={href} startIcon={startIcon}>
                                    {label}
                                </SidebarItem>
                            </div>
                        ))}
                    </div>
                </nav>
                <div className="absolute bottom-0 border-t-2 border-white w-full flex">
                    <SidebarItem
                        href="/dashboard/settings"
                        startIcon={
                            <CogIcon width={32} height={32} className="mx-5" />
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

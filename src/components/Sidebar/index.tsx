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
import NavLink from '../NavLink'
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

const Sidebar: FC = () => {
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
                            IBS Matchmaking
                        </Typography>
                    </Link>
                </div>
                <nav className="mt-6">
                    <div>
                        {items.map(({ label, href, startIcon }) => (
                            <div className="flex" key={label}>
                                <NavLink href={href} startIcon={startIcon}>
                                    {label}
                                </NavLink>
                            </div>
                        ))}
                    </div>
                </nav>
                <div className="absolute bottom-0 border-t-2 border-white w-full flex">
                    <NavLink
                        href="/dashboard/settings"
                        startIcon={
                            <CogIcon width={32} height={32} className="mx-5" />
                        }
                    >
                        Settings
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Sidebar

import { CogIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import React, { FC } from 'react'
import Typography from '../Typography'
import SidebarItem from './SidebarItem'
import { SidebarItems } from '@/lib/DashboardSidebar'

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
                        {SidebarItems.map(({ label, href, startIcon }) => (
                            <div className="flex" key={label}>
                                <SidebarItem
                                    href={href}
                                    startIcon={startIcon}
                                    className="active:border-l-4 border-yellow-500"
                                >
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

import { NextPage } from 'next'
import React from 'react'

import { SidebarItems } from '@/lib/DashboardSidebar'
import Sidebar from '@/components/Sidebar'
import Menu from '@/components/Menu'
import Typography from '@/components/Typography'
import { dashboardHeaders } from '@/lib/dashboardHeaders'
import { useSession } from 'next-auth/react'

const Projects: NextPage = () => {
    const { data: session } = useSession()
    console.log(session)
    return (
        <main className="bg-gray-800 h-screen overflow-hidden relative">
            <div className="flex flex-col w-full ">
                <div className="flex items-center justify-between p-5 lg:hidden bg-gray-700">
                    <Typography variant="h3" weight="medium">
                        MATCHIFY
                    </Typography>
                    <Menu items={dashboardHeaders} />
                </div>
            </div>
            <div className="flex items-start justify-between">
                <Sidebar label="MATCHIFY" items={SidebarItems} />
            </div>
        </main>
    )
}

export default Projects

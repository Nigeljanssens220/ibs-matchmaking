import Sidebar from '@/components/Sidebar'
import { NextPage } from 'next'
import React from 'react'
import { SidebarItems } from '@/lib/DashboardSidebar'
type Props = {}

const Projects: NextPage = () => {
    return (
        <div className="flex items-start justify-between">
            <Sidebar label="MATCHIFY" items={SidebarItems} />
        </div>
    )
}

export default Projects

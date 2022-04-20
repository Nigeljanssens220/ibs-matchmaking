import Sidebar from '@/components/Sidebar'
import { SidebarItems } from '@/lib/DashboardSidebar'
import { NextPage } from 'next'
import React from 'react'

const Resumes: NextPage = () => {
    return (
        <div className="flex items-start justify-between">
            <Sidebar label="MATCHIFY" items={SidebarItems} />
        </div>
    )
}

export default Resumes

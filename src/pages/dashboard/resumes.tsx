import DashboardLayout from '@/components/Layout/Dashboard'
import Sidebar from '@/components/Sidebar'
import { SidebarItems } from '@/lib/DashboardSidebar'
import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import React from 'react'

const Resumes: NextPage = () => {
    const { data: session } = useSession()
    return (
        <DashboardLayout>
            <div className="flex flex-col w-full p-5 h-screen">
                <h1 className="text-4xl font-semibold text-white">
                    Welcome back, {session?.user?.name?.split(' ')[0]}!
                </h1>
                <h2 className="text-md text-gray-400">
                    Here&#x27;s what happened during your absence.
                </h2>
            </div>
        </DashboardLayout>
    )
}

export default Resumes

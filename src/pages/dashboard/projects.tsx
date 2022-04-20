import { NextPage } from 'next'
import React from 'react'

import { useSession } from 'next-auth/react'
import DashboardLayout from '@/components/Layout/Dashboard'

const Projects: NextPage = () => {
    const { data: session } = useSession()
    console.log(session)
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

export default Projects

import { NextPage } from 'next'
import React from 'react'

import { useSession } from 'next-auth/react'
import DashboardLayout from '@/components/Layout/Dashboard'
import Table from '@/components/Table'

const people = [
    {
        name: 'Gerard Draadjer',
        title: 'Product Owner',
        email: 'gerard.draadjer@isatis-business-solutions.nl',
        role: 'Owner',
    },
    {
        name: 'Furkan Unver',
        title: 'Python Developer',
        email: 'furkan.unver@isatis-business-solutions.nl',
        role: 'Developer',
    },
    {
        name: 'Simone Hartgring',
        title: 'Machine Learning Engineer',
        email: 'simone.hartgring@isatis-business-solutions.nl',
        role: 'Developer',
    },
    {
        name: 'Nigel Janssens',
        title: 'Front-end Developer',
        email: 'nigel.janssens@isatis-business-solutions.nl',
        role: 'Developer',
    },
    // More people...
]

const Projects: NextPage = () => {
    const { data: session } = useSession()
    return (
        <DashboardLayout>
            <div className="flex flex-col w-full p-5 h-screen">
                <Table items={people} />
            </div>
        </DashboardLayout>
    )
}

export default Projects

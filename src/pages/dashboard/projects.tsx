import { useSession } from 'next-auth/react'
import useSWRImmutable from 'swr/immutable'
import type { NextPage } from 'next'

import DashboardLayout from '@/components/Layout/Dashboard'
import Container from '@/components/Container'
import Table from '@/components/Table'
import { useState } from 'react'

const axios = require('axios').default

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
    console.log('rerender')
    const { data: session, status } = useSession()
    const [projects, setProjects] = useState([])

    const fetcher = (url: string, token: string) =>
        axios
            .get(url, { headers: { Authorization: `Bearer ${token}` } })
            .then((res: { data: any }) => console.log(res.data))
            .then((res: { data: any }) => res.data)

    const { data, error, mutate } = useSWRImmutable(
        status !== 'authenticated'
            ? null
            : [
                  'https://ibs-matchmaking-api.azurewebsites.net/readProjects',
                  session!.accessToken,
              ],
        fetcher
    )

    return (
        <DashboardLayout>
            <div className="flex flex-col w-full p-5 h-screen border space-y-2">
                <div className="hidden md:block">
                    <Table items={people} />
                </div>
                {projects && projects.map((project) => JSON.stringify(project))}
            </div>
        </DashboardLayout>
    )
}

export default Projects

import type { NextPage } from 'next'
import React, { useCallback, useEffect, useState } from 'react'
import useSWR from 'swr'
import { useSession } from 'next-auth/react'
const axios = require('axios').default

import DashboardLayout from '@/components/Layout/Dashboard'
import Table from '@/components/Table'
import { setEnvironmentData } from 'worker_threads'

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
    const { data: session, status } = useSession()

    const fetcher = (url: string, token: string) =>
        axios
            .get(url, { headers: { Authorization: `Bearer ${token}` } })
            .then((res: { data: any }) => res.data)

    const { data, error, mutate } = useSWR(
        status !== 'authenticated'
            ? null
            : [
                  'https://ibs-matchmaking-api.azurewebsites.net/readProjects',
                  session!.accessToken,
              ],
        fetcher,
        {
            refreshInterval: 1000 * 60 * 30, // revalidate after 30 minutes
            revalidateOnFocus: false,
        }
    )

    return (
        <DashboardLayout>
            <div className="flex flex-col w-full p-5 h-screen">
                <Table items={people} />
            </div>
        </DashboardLayout>
    )
}

export default Projects

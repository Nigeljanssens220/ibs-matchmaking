import { useSession } from 'next-auth/react'
import useSWRImmutable from 'swr/immutable'
import type { NextPage } from 'next'
import { useCallback, useEffect, useState } from 'react'
import { ExternalLinkIcon } from '@heroicons/react/outline'

import DashboardLayout from '@/components/Layout/Dashboard'
import Container from '@/components/Container'
import Table from '@/components/Table'
import Typography from '@/components/Typography'
import Button from '@/components/ButtonNew'
import { useRouter } from 'next/router'
import NavLink from '@/components/NavLink'

const axios = require('axios').default
const headers = ['Role', 'Provider', 'Organisation', 'Hours']

const Projects: NextPage = () => {
    console.log('rerender')
    const { data: session, status } = useSession()

    const fetcher = (url: string, token: string) =>
        axios
            .get(url, { headers: { Authorization: `Bearer ${token}` } })
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
            <div className="flex flex-col w-full p-5 space-y-2">
                <div className="hidden md:block">
                    {data?.projects && (
                        <Table items={data?.projects} headers={headers} />
                    )}
                </div>
                <div className="block md:hidden space-y-2">
                    {data?.projects &&
                        data.projects.map((project: Project) => (
                            <Container
                                key={project.id}
                                className="bg-gray-700 rounded-xl w-full p-5 flex items-center justify-between "
                            >
                                <div>
                                    <Typography>{project.job_title}</Typography>
                                    <Typography>{project.source}</Typography>
                                    <Typography>{project.employer}</Typography>
                                </div>
                                <div className=" ml-3">
                                    <Button
                                        variant="whiteFilled"
                                        className="hover:bg-yellow-500/50 hover:text-white hover:border-none"
                                        startIcon={
                                            <ExternalLinkIcon
                                                width={20}
                                                height={20}
                                                className="mr-2"
                                            />
                                        }
                                    >
                                        <NavLink
                                            href={project.job_url}
                                            target="_blank"
                                            className="justify-center"
                                        >
                                            View
                                        </NavLink>
                                    </Button>
                                </div>
                            </Container>
                        ))}
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Projects

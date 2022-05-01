import Button from '@/components/ButtonNew'
import Container from '@/components/Container'
import DashboardLayout from '@/components/Layout/Dashboard'
import NavLink from '@/components/NavLink'
import Table from '@/components/Table'
import Typography from '@/components/Typography'
import { ExternalLinkIcon } from '@heroicons/react/outline'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import useSWRImmutable from 'swr/immutable'

const axios = require('axios').default

// Table props for the projects page
const headers = ['Role', 'Provider', 'Organisation', 'Hours']
const keys = ['job_title', 'job_source', 'employer', 'weekly_hours']
const hrefKey = 'job_url'

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
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-xl font-semibold text-gray-200">
                            Projects
                        </h1>
                        <p className="mt-2 text-sm text-gray-300">
                            A list of all the users in your account including
                            their name, title, email and role.
                        </p>
                    </div>
                </div>
                <div className="hidden lg:block">
                    {data?.projects && (
                        <Table
                            items={data?.projects}
                            headers={headers}
                            keys={keys}
                            hrefKey={hrefKey}
                        />
                    )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden space-y-2 md:space-y-0 md:gap-2">
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
                                            blank
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

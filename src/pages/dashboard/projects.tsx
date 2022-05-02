import Button from '@/components/ButtonNew'
import Container from '@/components/Container'
import DashboardLayout from '@/components/Layout/Dashboard'
import NavLink from '@/components/NavLink'
import TableNew from '@/components/TableNew'
import Typography from '@/components/Typography'
import { projectColumns } from '@/lib/projectsTable'
import { ExternalLinkIcon } from '@heroicons/react/outline'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import useSWRImmutable from 'swr/immutable'

const axios = require('axios').default

// Table props for the projects page
const headers = ['Role', 'Provider', 'Organisation', 'Hours', 'Date Created']
const keys = [
    'job_title',
    'job_source',
    'employer',
    'weekly_hours',
    'created_at',
]
const hrefKey = 'job_url'

const Projects: NextPage = () => {
    const { data: session, status } = useSession()
    const [projects, setProjects] = useState<Project[]>([])

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

    useEffect(() => {
        if (data) {
            const modifiedData = data.projects.map((project: Project) => {
                return {
                    ...project,
                    upload_date: new Date(
                        project.upload_date * 1000
                    ).toLocaleDateString(),
                    submission_deadline: new Date(
                        project.submission_deadline * 1000
                    ).toLocaleDateString(),
                }
            })
            setProjects(modifiedData)
        }
        return () => {
            setProjects([])
        }
    }, [data])

    return (
        <DashboardLayout>
            <div className="min-h-screen flex flex-col w-full p-3 lg:p-6 xl:px-8 ">
                <div className="sm:flex sm:items-center pb-6">
                    <div className="sm:flex-auto">
                        <h1 className="text-xl font-semibold text-gray-200">
                            Projects
                        </h1>
                        <p className="mt-2 text-sm text-gray-300 ">
                            Here&apos;s a list of all available projects you
                            have matched with. These included position, hourly
                            rate and weekly hours.
                        </p>
                    </div>
                </div>
                <div className="hidden xl:block">
                    {projects && (
                        <TableNew columns={projectColumns} data={projects} />
                    )}
                </div>
                <div className="flex flex-col xl:hidden divide-y divide-gray-200 ">
                    {data?.projects &&
                        data.projects.map((project: Project) => (
                            <Container
                                key={project.id}
                                maxWidth="2xl"
                                className="bg-gray-800  p-2 flex items-center justify-center space-x-2 sm:space-x-6  border-t"
                            >
                                <div className="container max-w-xs flex flex-col ">
                                    <Typography
                                        variant="md"
                                        className="capitalize "
                                    >
                                        {project.job_title
                                            .replace('/', ' / ')
                                            .replace('  ', ' ')}
                                    </Typography>
                                    <Typography
                                        variant="md"
                                        weight="thin"
                                        className="capitalize"
                                    >
                                        {/* hard-coded because data is not there yet */}
                                        IT infrastructure
                                    </Typography>
                                </div>
                                <div className="flex flex-col text-right">
                                    <Typography variant="lg" className="">
                                        {/* hard-coded becasue data is not there yet */}
                                        {project.hourly_rate
                                            ? project.hourly_rate
                                            : '$69/h'}
                                    </Typography>
                                </div>
                                <div className="flex flex-col space-y-4 w-28">
                                    <div className="flex flex-col text-right ">
                                        <Typography variant="sm" className="">
                                            {/* hard-coded becasue data is not there yet */}
                                            Engineering
                                        </Typography>
                                        <Typography variant="sm" weight="thin">
                                            top skill
                                        </Typography>
                                    </div>
                                    <div className="flex flex-col text-right w-28">
                                        <Typography variant="sm" className="">
                                            {/* hard-coded becasue data is not there yet */}
                                            {project.weekly_hours
                                                ? project.weekly_hours
                                                : '4-20'}
                                        </Typography>
                                        <Typography variant="sm" weight="thin">
                                            hours per week
                                        </Typography>
                                    </div>
                                </div>
                                <div className="pl-2">
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

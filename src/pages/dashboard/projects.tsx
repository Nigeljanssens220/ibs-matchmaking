import Badge from '@/components/Badge'
import Button from '@/components/ButtonNew'
import Container from '@/components/Container'
import DashboardLayout from '@/components/Layout/Dashboard'
import NavLink from '@/components/NavLink'
import TableNew from '@/components/TableNew'
import Typography from '@/components/Typography'
import { projectColumns } from '@/lib/projectsTable'
import { Project } from '@/types/database'
import { fetcher } from '@/utils/fetch'
import {
    ClockIcon,
    ExternalLinkIcon,
    LocationMarkerIcon,
} from '@heroicons/react/solid'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import useSWRImmutable from 'swr/immutable'

const today = new Date()

const diffDays = (d1: Date, d2: Date) => {
    const diff = Math.abs(d1.getTime() - d2.getTime())
    return Math.ceil(diff / (1000 * 3600 * 24))
}

const ProjectStatus = (date: Date) => {
    const days = diffDays(today, date)

    if (days < 7) {
        return (
            <Badge variant="warning" fullWidth className="">
                Closing
            </Badge>
        )
    }

    return (
        <Badge variant="active" fullWidth>
            Available
        </Badge>
    )
}

const ProjectMatch = (matched: number, not_matched: string[]) => {
    const overlap = (matched / not_matched.length) * 100
    if (overlap < 10) {
        return (
            <Badge variant="error" fullWidth className="">
                Poor
            </Badge>
        )
    }

    if (overlap < 20) {
        return (
            <Badge variant="warning" fullWidth className="">
                Average
            </Badge>
        )
    }

    return (
        <Badge variant="active" fullWidth className="">
            Excellent
        </Badge>
    )
}

const Projects: NextPage = () => {
    const { data: session, status } = useSession()
    const [projects, setProjects] = useState<Project[]>([])

    const { data, error, mutate } = useSWRImmutable(
        status !== 'authenticated'
            ? null
            : [
                  'https://ibs-matchmaking-api.azurewebsites.net/readProjects',
                  session!.accessToken,
              ],
        fetcher
    )

    // Some data transformations when data is collected or updated by SWR
    useEffect(() => {
        if (data) {
            let transformedDates = data.projects.map((project: Project) => {
                return {
                    ...project,
                    status: ProjectStatus(
                        new Date(project.submission_deadline * 1000)
                    ),
                    match: project.match_length
                        ? ProjectMatch(project.match_length, project.kw_unique)
                        : null,
                    upload_date: new Date(project.upload_date * 1000),
                    submission_deadline: new Date(
                        project.submission_deadline * 1000
                    ),
                }
            })

            transformedDates.sort((a: Project, b: Project) => {
                return a.submission_deadline - b.submission_deadline
            })

            const modifiedData = transformedDates.map(
                (project: {
                    upload_date: { toLocaleDateString: () => any }
                    submission_deadline: { toLocaleDateString: () => any }
                    job_title: string
                    location: string
                }) => {
                    return {
                        ...project,
                        //@ts-ignore TYPE NEEDS FIXING
                        upload_date: project.upload_date.toLocaleDateString(),
                        // //@ts-ignore
                        submission_deadline:
                            project.submission_deadline.toLocaleDateString(),
                        job_title: project.job_title
                            .replace('/', ' / ')
                            .replace('  ', ' '),
                        location: project.location
                            .replace('/', ' / ')
                            .replace('  ', ' '),
                    }
                }
            )
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
                        <Typography
                            className="md:text-3xl font-semibold text-gray-200"
                            variant="h3"
                            component="h3"
                        >
                            Projects
                        </Typography>
                        <Typography
                            className="mt-2 text-sm text-gray-300 md:text-base"
                            variant="md"
                            weight="medium"
                            component="p"
                        >
                            Here&apos;s a list of all available projects you
                            have matched with. These included position, hourly
                            rate and weekly hours.
                        </Typography>
                    </div>
                </div>
                <div className=" relative hidden xl:block items-center  ">
                    {projects && (
                        <TableNew columns={projectColumns} data={projects} />
                    )}
                </div>
                <div className="flex flex-col xl:hidden divide-y  divide-gray-200 ">
                    {projects &&
                        projects.map((project: Project) => (
                            <Container
                                key={project.id}
                                maxWidth="2xl"
                                className="bg-gray-800 h-32 p-2 flex items-center justify-center space-x-2 sm:space-x-6  border-t"
                            >
                                <div className="container flex flex-col ">
                                    <Typography
                                        variant="sm"
                                        className="capitalize "
                                        component="span"
                                    >
                                        {project.job_title}
                                    </Typography>

                                    <div className="flex items-center py-2">
                                        <LocationMarkerIcon
                                            width={20}
                                            height={20}
                                            className="mr-2"
                                        />
                                        <Typography
                                            variant="xs"
                                            className="capitalize"
                                            component="span"
                                        >
                                            {project.location}
                                        </Typography>
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-2 w-16 mr-2">
                                    <div className="flex flex-col text-left ">
                                        <Typography variant="sm" className="">
                                            {/* hard-coded becasue data is not there yet */}
                                            {project.hourly_rate
                                                ? project.hourly_rate
                                                : '$69/h'}
                                        </Typography>
                                    </div>
                                    <div className="flex text-left w-28">
                                        <ClockIcon
                                            width={20}
                                            height={20}
                                            className="mr-2"
                                        />
                                        <Typography
                                            variant="sm"
                                            className=""
                                            component="span"
                                        >
                                            {/* hard-coded becasue data is not there yet */}
                                            {project.weekly_hours
                                                ? project.weekly_hours + 'h'
                                                : '4-20h'}
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

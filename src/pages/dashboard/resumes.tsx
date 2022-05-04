import Dropbox from '@/components/Dropbox'
import DashboardLayout from '@/components/Layout/Dashboard'
import List from '@/components/List'
import Typography from '@/components/Typography'
import { Resume } from '@/types/database'
import { fetcher } from '@/utils/fetch'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import useSWRImmutable from 'swr/immutable'

const Resumes: NextPage = () => {
    const { data: session, status } = useSession()
    const [resumes, setResumes] = useState<Resume[]>([])

    const { data, error, mutate } = useSWRImmutable(
        status !== 'authenticated'
            ? null
            : [
                  'https://ibs-matchmaking-api.azurewebsites.net/readItems',
                  session!.accessToken,
              ],
        fetcher
    )

    // Some data transformations when data is collected or updated by SWR
    // useEffect(() => {
    //     if (data) {
    //         const modifiedData = data.projects.map((project: Project) => {
    //             return {
    //                 ...project,
    //                 upload_date: new Date(
    //                     project.upload_date * 1000
    //                 ).toLocaleDateString(),
    //                 submission_deadline: new Date(
    //                     project.submission_deadline * 1000
    //                 ).toLocaleDateString(),
    //                 job_title: project.job_title
    //                     .replace('/', ' / ')
    //                     .replace('  ', ' '),
    //                 location: project.location
    //                     .replace('/', ' / ')
    //                     .replace('  ', ' '),
    //             }
    //         })
    //         setProjects(modifiedData)
    //     }
    //     return () => {
    //         setProjects([])
    //     }
    // }, [data])

    useEffect(() => {
        if (data) {
            console.log(data.items)
        }
    }, [data])
    return (
        <DashboardLayout>
            <div className="min-h-screen max-w-screen-2xl flex flex-col w-full p-3 lg:p-6 xl:px-8 ">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center">
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
                                have matched with. These included position,
                                hourly rate and weekly hours.
                            </Typography>
                        </div>
                    </div>
                    <div className="py-20 space-y-5">
                        <Dropbox />
                    </div>
                    <List
                        data={resumes}
                        headers={['File', 'Description', 'Skills', 'Status']}
                    />
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Resumes

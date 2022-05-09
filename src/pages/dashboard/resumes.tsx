import Dropbox from '@/components/Dropbox'
import DashboardLayout from '@/components/Layout/Dashboard'
import ItemList from '@/components/List'
import Typography from '@/components/Typography'
import type { NextPage } from 'next'

const Resumes: NextPage = () => {
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

                    <div className="flex flex-col py-20 space-y-3 md:space-y-4 items-center ">
                        <Dropbox />
                    </div>
                    <ItemList />
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Resumes

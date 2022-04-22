import { SidebarItems } from '@/lib/DashboardSidebar'
import Sidebar from '@/components/Sidebar'
import Menu from '@/components/Menu'
import Typography from '@/components/Typography'
import { dashboardHeaders } from '@/lib/dashboardHeaders'
import { useSession } from 'next-auth/react'
import { FC } from 'react'
import Link from 'next/link'

const DashboardLayout: FC = ({ children }) => {
    return (
        <main className="bg-gray-800 h-screen overflow-hidden relative">
            <div className="flex flex-col w-full ">
                <div className="flex items-center justify-between p-5 lg:hidden bg-gray-700">
                    <Link href="/" passHref>
                        <Typography variant="h3" weight="medium" component="a">
                            MATCHIFY
                        </Typography>
                    </Link>
                    <Menu items={dashboardHeaders} />
                </div>
            </div>
            <div className="flex">
                <Sidebar label="MATCHIFY" items={SidebarItems} />
                {children}
            </div>
        </main>
    )
}

export default DashboardLayout

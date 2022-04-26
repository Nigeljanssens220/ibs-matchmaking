import Sidebar from '@/components/Sidebar'

const DashboardLayout: React.FC = ({ children }) => {
    return (
        <Sidebar>{children}</Sidebar>
        // <main className="bg-gray-800 h-screen overflow-hidden relative">
        //     <div className="flex flex-col w-full ">
        //         <div className="flex items-center justify-between p-5 lg:hidden bg-gray-700">
        //             <Link href="/" passHref>
        //                 <Typography variant="h3" weight="medium" component="a">
        //                     MATCHIFY
        //                 </Typography>
        //             </Link>
        //             <Menu items={dashboardHeaders} />
        //         </div>
        //     </div>
        //     <div className="flex">
        //         <Sidebar label="MATCHIFY" items={SidebarItems} />
        //         {children}
        //     </div>
        // </main>
    )
}

export default DashboardLayout

// <main className="flex-1  p-6">
// <div className="h-screen border">
//     <div className="mx-auto px-4 sm:px-6 lg:px-8 ">
//         <Typography
//             component="h1"
//             variant="h3"
//             weight="medium"
//             className="text-gray-100 "
//         >
//             Dashboard
//         </Typography>
//     </div>
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 items-center justify-center flex flex-1">
//         {/* Replace with your content */}
//         {children}

//         {/* /End replace */}
//     </div>
// </div>
// </main>

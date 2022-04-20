import {
    AcademicCapIcon,
    BriefcaseIcon,
    HomeIcon,
} from '@heroicons/react/solid'

export const SidebarItems = [
    {
        label: 'Home',
        href: '/dashboard',
        startIcon: <HomeIcon width={32} height={32} className="mx-5" />,
    },
    {
        label: 'Projects',
        href: '/dashboard/projects',
        startIcon: <BriefcaseIcon width={32} height={32} className="mx-5" />,
    },
    {
        label: 'Resumes',
        href: '/dashboard/resumes',
        startIcon: <AcademicCapIcon width={32} height={32} className="mx-5" />,
    },
    // add more sidebar items here
]

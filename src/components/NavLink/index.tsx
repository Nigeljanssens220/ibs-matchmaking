import { classNames } from '@/utils/styling'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, ReactNode } from 'react'
import Typography from '../Typography'

interface SidebarItemProps extends React.HTMLProps<HTMLAnchorElement> {
    href: string
    children?: ReactNode
    className?: string
    startIcon?: ReactNode
}

const NavLink: FC<SidebarItemProps> = ({
    href,
    children,
    className,
    startIcon,
}) => {
    const router = useRouter()
    const isActive = router.pathname === href

    return (
        <Link href={href} passHref>
            <a
                className={classNames(
                    className,
                    isActive
                        ? 'text-white border-l-4 border-yellow-500 pointer-events-none '
                        : 'text-gray-400 hover:text-yellow-500/80',
                    'w-full flex items-center pl-6 p-2 my-2 transition-colors duration-400 justify-start '
                )}
                href="#"
            >
                <Typography
                    component="span"
                    weight="medium"
                    variant="lg"
                    className={classNames(
                        isActive ? 'text-xl ml-3 text-' : '',
                        'flex items-center '
                    )}
                >
                    {startIcon && startIcon}
                    {children}
                </Typography>
            </a>
        </Link>
    )
}

export default NavLink

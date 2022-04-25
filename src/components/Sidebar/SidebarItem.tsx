import { classNames } from '@/utils/styling'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, ReactNode } from 'react'
import Typography from '../Typography'

export interface SidebarItemProps extends React.HTMLProps<HTMLAnchorElement> {
    href: string
    children?: ReactNode
    className?: string
    startIcon?: ReactNode
}

const SidebarItem: FC<SidebarItemProps> = ({
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
                        ? 'text-white border-l-4 border-yellow-500 pointer-events-none bg-yellow-300/30 rounded '
                        : 'text-gray-400 hover:text-yellow-500/80',
                    'w-full flex items-center p-2 my-2 transition-colors duration-400 justify-start '
                )}
            >
                <Typography
                    component="span"
                    weight="medium"
                    variant="base"
                    className={classNames(
                        isActive ? 'text-xl' : '',
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

export default SidebarItem

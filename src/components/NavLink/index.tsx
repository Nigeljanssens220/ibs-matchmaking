import { classNames } from '@/utils/styling'
import Link from 'next/link'
import { FC, ReactNode } from 'react'
import Typography from '../Typography'

interface NavLinkProps extends React.HTMLProps<HTMLAnchorElement> {
    href: string
    children?: ReactNode
    className?: string
}

const NavLink: FC<NavLinkProps> = ({ href, children, className }) => {
    return (
        <Link href={href} passHref>
            <a
                className={classNames(
                    className,
                    'w-full flex items-center p-2 transition-colors duration-400 '
                )}
            >
                <Typography
                    component="span"
                    weight="medium"
                    variant="lg"
                    className={'flex items-center '}
                >
                    {children}
                </Typography>
            </a>
        </Link>
    )
}

export default NavLink

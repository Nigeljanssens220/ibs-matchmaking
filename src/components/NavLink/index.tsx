import { classNames } from '@/utils/styling'
import Link from 'next/link'
import { FC, ReactNode } from 'react'

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
                    'w-full flex items-center transition-colors duration-400 '
                )}
            >
                {children}
            </a>
        </Link>
    )
}

export default NavLink

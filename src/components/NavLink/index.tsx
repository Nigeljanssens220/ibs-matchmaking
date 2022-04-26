import { classNames } from '@/utils/styling'
import Link from 'next/link'
import { FC, ReactNode } from 'react'

interface NavLinkProps extends React.HTMLProps<HTMLAnchorElement> {
    href: string
    children?: ReactNode
    className?: string
    target?: '' | '_blank'
}

const NavLink: FC<NavLinkProps> = ({
    href,
    children,
    className,
    target = '',
}) => {
    return (
        <Link href={href} passHref>
            <a
                target={target}
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

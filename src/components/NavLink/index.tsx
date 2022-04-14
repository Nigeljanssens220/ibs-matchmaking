import { classNames } from '@/utils/styling'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC } from 'react'

export interface NavLinkProps extends React.AllHTMLAttributes<HTMLElement> {
    href: string
    children?: React.ReactNode
    className?: string
}

const NavLink: FC<NavLinkProps> = ({ children, className, href }) => {
    const router = useRouter()
    const isActive = router.pathname === href

    return (
        <Link href={href} passHref>
            <a
                className={classNames(
                    isActive ? 'active font-semibold ' : '',
                    'w-full flex items-center pl-6 p-2 my-2 transition-colors duration-200 justify-start '
                )}
            >
                {children}
            </a>
        </Link>
    )
}

export default NavLink

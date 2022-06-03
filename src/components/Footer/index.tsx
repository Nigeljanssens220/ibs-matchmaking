import { aboutFooters, documentationFooters } from '@/lib/footers'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'
import NavLink from '../NavLink'
import Typography from '../Typography'

interface FooterProps {
    children?: React.ReactNode
}

const Footer: FC<FooterProps> = ({ children }) => {
    return (
        // center this div
        <div className="p-10 mt-6 flex flex-col justify-evenly w-full">
            <footer id="footer" className="">
                <div className="flex flex-col md:flex md:flex-row border-y border-zinc-400 pb-8 text-center ">
                    <div className="w-full  mb-8 lg:mb-0 flex flex-1 ">
                        <div className="w-full px-6 ">
                            <ul className="space-y-3 lg:space-y-1 items-center flex flex-col text-white">
                                <li className="mt-6">
                                    <Typography
                                        component="span"
                                        variant="sm"
                                        weight="bold"
                                        className="md:text-lg"
                                    >
                                        Documentation
                                    </Typography>
                                </li>
                                {documentationFooters.map(({ label, href }) => (
                                    <li
                                        className="text-gray-200 hover:text-gray-500 cursor-pointer "
                                        key={label}
                                    >
                                        <NavLink href={href} className="">
                                            {label}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="w-full px-6 ">
                            <ul className="space-y-3 lg:space-y-1 items-center flex flex-col text-white">
                                <li className="mt-6">
                                    <Typography
                                        component="span"
                                        variant="sm"
                                        weight="bold"
                                        className="md:text-lg"
                                    >
                                        About us
                                    </Typography>
                                </li>
                                {aboutFooters.map(({ label, href }) => (
                                    <li
                                        className="text-gray-200 hover:text-gray-500 cursor-pointer "
                                        key={label}
                                    >
                                        <NavLink href={href} className="">
                                            {label}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="w-full  mb-8 lg:mb-0 flex flex-1 ">
                        <div className="w-full px-6 ">
                            <ul className="space-y-3 lg:space-y-1 items-center flex flex-col text-white">
                                <li className="mt-6">
                                    <Typography
                                        component="span"
                                        variant="sm"
                                        weight="bold"
                                        className="md:text-lg"
                                    >
                                        Documentation
                                    </Typography>
                                </li>
                                {documentationFooters.map(({ label, href }) => (
                                    <li
                                        className="text-gray-200 hover:text-gray-500 cursor-pointer "
                                        key={label}
                                    >
                                        <NavLink href={href} className="">
                                            {label}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="w-full px-6 ">
                            <ul className="space-y-3 lg:space-y-1 items-center flex flex-col text-white">
                                <li className="mt-6">
                                    <Typography
                                        component="span"
                                        variant="sm"
                                        weight="bold"
                                        className="md:text-lg"
                                    >
                                        About us
                                    </Typography>
                                </li>
                                {aboutFooters.map(({ label, href }) => (
                                    <li
                                        className="text-gray-200 hover:text-gray-500 cursor-pointer "
                                        key={label}
                                    >
                                        <NavLink href={href} className="">
                                            {label}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className=" flex flex-col justify-center items-center">
                    <Link href="https://isatis-business-solutions.nl/">
                        <a className="py-10">
                            <Image
                                src="/logo.png"
                                alt="Isatis Logo"
                                width={40}
                                height={40}
                                objectFit="cover"
                            />
                        </a>
                    </Link>
                    <Typography
                        component="p"
                        variant="xs"
                        weight="thin"
                        className="md:text-sm leading-none"
                    >
                        {children}
                    </Typography>
                </div>
            </footer>
        </div>
    )
}

export default Footer

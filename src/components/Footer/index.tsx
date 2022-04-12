import React, { FC } from 'react'
import Typography from '../Typography'
import Link from 'next/link'
import Image from 'next/image'

const Footer: FC = ({ children }) => {
    return (
        // center this div
        <div className="p-10 mt-6 flex flex-col justify-evenly w-full">
            <footer id="footer" className="">
                <div className="flex flex-col md:flex md:flex-row border-y border-zinc-400 pb-8 text-center ">
                    <div className="w-full  mb-8 lg:mb-0 flex flex-1 ">
                        <div className="w-full px-6 ">
                            <ul className="space-y-3 lg:space-y-1 ">
                                <li className="mt-6">
                                    <Typography
                                        component="span"
                                        variant="sm"
                                        weight="bold"
                                        className="md:text-base"
                                    >
                                        Documentation
                                    </Typography>
                                </li>
                                <li>
                                    <Link href="/" passHref>
                                        <Typography
                                            component="a"
                                            variant="xs"
                                            weight="thin"
                                            className="md:text-sm leading-none"
                                        >
                                            Getting started
                                        </Typography>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/" passHref>
                                        <Typography
                                            component="a"
                                            variant="xs"
                                            weight="thin"
                                            className="md:text-sm leading-none"
                                        >
                                            How it works
                                        </Typography>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/" passHref>
                                        <Typography
                                            component="a"
                                            variant="xs"
                                            weight="thin"
                                            className="md:text-sm leading-none"
                                        >
                                            Blog
                                        </Typography>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/" passHref>
                                        <Typography
                                            component="a"
                                            variant="xs"
                                            weight="thin"
                                            className="md:text-sm leading-none"
                                        >
                                            Frequently asked questions
                                        </Typography>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="w-full px-6 ">
                            <ul className="space-y-3 lg:space-y-1">
                                <li className="mt-6">
                                    <Typography
                                        component="span"
                                        variant="sm"
                                        weight="bold"
                                        className="md:text-base"
                                    >
                                        About us
                                    </Typography>
                                </li>
                                <li>
                                    <Link href="/" passHref>
                                        <Typography
                                            component="a"
                                            variant="xs"
                                            weight="thin"
                                            className="md:text-sm leading-none"
                                        >
                                            Our company and values
                                        </Typography>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/" passHref>
                                        <Typography
                                            component="a"
                                            variant="xs"
                                            weight="thin"
                                            className="md:text-sm leading-none"
                                        >
                                            Terms of service
                                        </Typography>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/" passHref>
                                        <Typography
                                            component="a"
                                            variant="xs"
                                            weight="thin"
                                            className="md:text-sm leading-none"
                                        >
                                            Privacy policy
                                        </Typography>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/" passHref>
                                        <Typography
                                            component="a"
                                            variant="xs"
                                            weight="thin"
                                            className="md:text-sm leading-none"
                                        >
                                            Cookie policy
                                        </Typography>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full mb-8 lg:mb-0 flex flex-1">
                        <div className="w-full px-6 ">
                            <ul className="space-y-3 lg:space-y-1">
                                <li className="mt-6">
                                    <Typography
                                        component="span"
                                        variant="sm"
                                        weight="bold"
                                        className="md:text-base"
                                    >
                                        Documentation
                                    </Typography>
                                </li>
                                <li>
                                    <Link href="/" passHref>
                                        <Typography
                                            component="a"
                                            variant="xs"
                                            weight="thin"
                                            className="md:text-sm leading-none"
                                        >
                                            Getting started
                                        </Typography>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/" passHref>
                                        <Typography
                                            component="a"
                                            variant="xs"
                                            weight="thin"
                                            className="md:text-sm leading-none"
                                        >
                                            How it works
                                        </Typography>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/" passHref>
                                        <Typography
                                            component="a"
                                            variant="xs"
                                            weight="thin"
                                            className="md:text-sm leading-none"
                                        >
                                            Blog
                                        </Typography>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/" passHref>
                                        <Typography
                                            component="a"
                                            variant="xs"
                                            weight="thin"
                                            className="md:text-sm leading-none"
                                        >
                                            Frequently asked questions
                                        </Typography>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="w-full px-6 ">
                            <ul className="space-y-3 lg:space-y-1">
                                <li className="mt-6">
                                    <Typography
                                        component="span"
                                        variant="sm"
                                        weight="bold"
                                        className="md:text-base"
                                    >
                                        About us
                                    </Typography>
                                </li>
                                <li>
                                    <Link href="/" passHref>
                                        <Typography
                                            component="a"
                                            variant="xs"
                                            weight="thin"
                                            className="md:text-sm leading-none"
                                        >
                                            Our company and values
                                        </Typography>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/" passHref>
                                        <Typography
                                            component="a"
                                            variant="xs"
                                            weight="thin"
                                            className="md:text-sm leading-none"
                                        >
                                            Terms of service
                                        </Typography>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/" passHref>
                                        <Typography
                                            component="a"
                                            variant="xs"
                                            weight="thin"
                                            className="md:text-sm leading-none"
                                        >
                                            Privacy policy
                                        </Typography>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/" passHref>
                                        <Typography
                                            component="a"
                                            variant="xs"
                                            weight="thin"
                                            className="md:text-sm leading-none"
                                        >
                                            Cookie policy
                                        </Typography>
                                    </Link>
                                </li>
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

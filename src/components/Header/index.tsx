import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'
import Menu from '../Menu'
import Typography from '../Typography'

const Header: FC = () => {
    return (
        <header className="flex justify-between items-center lg:mx-auto bg-gradient-to-b from-zinc-900 to-zinc-800 text-zinc-100 ">
            <div className="flex flex-grow max-w-screen-2xl justify-between items-center mx-auto py-6 px-4 sm:px-6 lg:px-8 ">
                <div className="flex items-center hover:cursor-pointer ">
                    <Link href="/" passHref>
                        <div className="hidden lg:block">
                            <Image
                                src="/logo.png"
                                alt="IBS Logo"
                                width={35}
                                height={35}
                                objectFit="contain"
                            />
                        </div>
                    </Link>
                    <Link href="/" passHref>
                        <Typography
                            weight="medium"
                            variant="lg"
                            component="a"
                            className="px-5 md:text-2xl lg:text-3xl"
                        >
                            Isatis Business Solutions
                        </Typography>
                    </Link>
                </div>
                <div className="">
                    <Menu />
                </div>
            </div>
        </header>
    )
}

export default Header

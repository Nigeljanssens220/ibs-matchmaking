import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'
import Button from '../Button'
import Typography from '../Typography'
import NavBarMenu from './Menu'

const Header: FC = () => {
    const handleClick = () => {
        console.log('I was clicked')
    }

    return (
        <header className="flex justify-between items-center lg:mx-auto bg-gradient-to-b from-zinc-900 to-zinc-800/90 text-zinc-100">
            <div className="flex flex-grow max-w-screen-2xl justify-between items-center mx-auto py-6 px-4 sm:px-6 lg:px-8 ">
                <div className="flex hover:cursor-pointer ">
                    <Link href="#" passHref>
                        <Image
                            src="/logo.png"
                            alt="IBS Logo"
                            width={30}
                            height={30}
                            objectFit="contain"
                        />
                    </Link>
                    <Link href="#" passHref>
                        <Typography
                            weight="medium"
                            variant="h3"
                            component="a"
                            className="px-5"
                        >
                            Isatis Business Solutions
                        </Typography>
                    </Link>
                </div>

                <div className="">
                    <NavBarMenu />
                </div>
            </div>
        </header>
    )
}

export default Header

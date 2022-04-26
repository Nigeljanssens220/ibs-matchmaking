import Button from '@/components/Button'
import Typography from '@/components/Typography'
import { NextPage } from 'next'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

const Login: NextPage = () => {
    const handleMicrosoftLogin = () => {
        signIn('azure-ad', { callbackUrl: '/dashboard' })
    }

    return (
        <div className="h-screen bg-gradient-to-tl from-cyan-900 to-fuchsia-700/40 w-full py-40 px-16">
            <div className="flex flex-col items-center justify-center">
                <Image
                    src="/logo.png"
                    alt="IBS Logo"
                    width={40}
                    height={40}
                    objectFit="contain"
                />
                <Typography variant="h2" weight="bold" className="mt-5">
                    Isatis Business Solutions
                </Typography>
                <div className="flex flex-col space-y-2 bg-white shadow rounded-xl lg:w-1/3  md:w-1/2 w-full p-10 mt-16 text-center">
                    <Typography
                        weight="bold"
                        variant="h3"
                        className="leading-6 text-gray-800"
                        component="p"
                    >
                        Login to your account
                    </Typography>
                    <Typography
                        weight="medium"
                        variant="md"
                        className="leading-none text-gray-600"
                        component="p"
                    >
                        Dont have account?{' '}
                        <Typography
                            component="span"
                            className="text-semibold leading-none text-gray-600 underline"
                        >
                            Sign up here
                        </Typography>
                    </Typography>
                    <Button
                        onClick={handleMicrosoftLogin}
                        className="flex flex-1 items-center justify-center rounded-xl hover:bg-zinc-200 hover:text-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border  border-gray-700  w-full mt-10"
                    >
                        <Image
                            className=""
                            src="/Microsoft_logo.svg"
                            alt="Microsoft Logo"
                            width={24}
                            height={24}
                            objectFit="contain"
                        />
                        <Typography component="p" className="ml-5">
                            Continue with Microsoft
                        </Typography>
                    </Button>
                    <Button
                        disabled
                        className="flex flex-1 items-center justify-center rounded-xl hover:bg-zinc-200 hover:text-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border  border-gray-700  w-full"
                    >
                        <Image
                            className=""
                            src="/Google__G__Logo.svg"
                            alt="Google Logo"
                            width={24}
                            height={24}
                            objectFit="contain"
                        />
                        <Typography component="p" className="ml-5">
                            Continue with Google
                        </Typography>
                    </Button>
                    <Button
                        disabled
                        className="flex flex-1 items-center justify-center rounded-xl hover:bg-zinc-200 hover:text-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border  border-gray-700  w-full "
                    >
                        <Image
                            className=""
                            src="/Octicons-mark-github.svg"
                            alt="Microsoft Logo"
                            width={24}
                            height={24}
                            objectFit="contain"
                        />
                        <Typography component="p" className="ml-5">
                            Continue with Github
                        </Typography>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Login

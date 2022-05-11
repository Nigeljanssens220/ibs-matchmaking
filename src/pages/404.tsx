import { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'

const NotFoundPage: NextPage = () => {
    const router = useRouter()
    return (
        <div className="bg-black relative overflow-hidden h-screen items-center justify-center flex flex-col">
            <div className="container mx-auto px-6 md:px-12 flex flex-col z-10 py-16">
                <div className="w-full font-mono flex flex-col z-10 items-center md:items-end justify-end">
                    <h1 className="font-extrabold text-5xl text-center md:text-right text-white leading-tight mt-4 max-w-2xl">
                        Listen, we have a problem!
                    </h1>
                    <p className="font-extrabold text-2xl my-6 text-white text-center md:text-right max-w-2xl">
                        The interplanetary location you are looking for is yet
                        to be discovered.
                    </p>
                    <button
                        onClick={() => router.push('/')}
                        className="bg-white px-4 py-2 mt-4 rounded-lg text-black hover:bg-gray-200 focus:scale-105 transition-transform duration-150 "
                    >
                        Back to misson control
                    </button>
                </div>
            </div>

            <Image
                src="/illustrations/astronaut.jpg"
                className="blur-md md:blur-none "
                layout="fill"
                objectFit="cover"
            />
        </div>
    )
}

export default NotFoundPage

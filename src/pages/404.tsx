import { NextPage } from 'next'

const NotFoundPage: NextPage = () => {
    return (
        <div className="bg-indigo-900 relative overflow-hidden h-screen">
            <img
                src="/illustrations/Chubbs_5 DrawKit_Vector_Illustrations_.svg"
                className="absolute object-cover"
            />
            <div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-16">
                <div className="w-full font-mono flex flex-col items-center relative z-10">
                    <h1 className="font-extrabold text-5xl text-center text-white leading-tight mt-4">
                        You&#x27;re alone here
                    </h1>
                    <p className="font-extrabold text-8xl my-6 text-white animate-bounce">
                        404
                    </p>
                </div>
            </div>
        </div>
    )
}

export default NotFoundPage

import { FC } from 'react'
import Button from '../Button'
import StatCards from '../StatCards'
import Typography from '../Typography'

const Hero: FC = () => {
    return (
        <div className="bg-zinc-800/90">
            <div className="flex flex-col items-center ">
                <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8 mt-20">
                    <Typography
                        weight="bold"
                        variant="h1"
                        component="h1"
                        className="text-zinc-200 lg:text-6xl mb-3 lg:mb-5"
                    >
                        Boost your future.
                    </Typography>
                    <Typography
                        weight="medium"
                        variant="h3"
                        component="h3"
                        className="text-zinc-200 "
                    >
                        Start{' '}
                        <Typography
                            weight="medium"
                            variant="h3"
                            component="span"
                            className="text-zinc-200 underline underline-offset-2 decoration-yellow-500/90"
                        >
                            matchmaking
                        </Typography>{' '}
                        today.
                    </Typography>
                </div>
                <Button className="bg-yellow-400 hover:bg-yellow-400 hover:text-zinc-100 text-zinc-900 hover:ring-1">
                    Get started
                </Button>
            </div>
        </div>
    )
}

export default Hero

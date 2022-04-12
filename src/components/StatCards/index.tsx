import { FC } from 'react'
import Typography from '../Typography'

interface StatCardProps {
    statKey1: string
    statValue1: string
    statKey2: string
    statValue2: string
    statKey3: string
    statValue3: string
    children: React.ReactNode
}

const StatCards: FC<StatCardProps> = ({
    statKey1,
    statValue1,
    statKey2,
    statValue2,
    statKey3,
    statValue3,
    children,
}) => {
    return (
        <div className="bg-transparent pt-12 sm:pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">{children}</div>
            </div>
            <div className="mt-10 pb-12  sm:pb-16">
                <div className="relative">
                    <div className="absolute inset-0 h-1/2 bg-transparent" />
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <dl className="rounded-lg bg-zinc-200 shadow-2xl sm:grid sm:grid-cols-3">
                                <div className="flex flex-col border-b border-zinc-400 p-6 text-center sm:border-0 sm:border-r">
                                    <Typography
                                        className="order-2 mt-2 leading-6 text-zinc-800"
                                        variant="base"
                                        weight="medium"
                                        component="dt"
                                    >
                                        {statKey1}
                                    </Typography>
                                    <Typography
                                        className="order-1  text-yellow-400 "
                                        variant="lg"
                                        component="dd"
                                        weight="bold"
                                    >
                                        {statValue1}
                                    </Typography>
                                </div>
                                <div className="flex flex-col border-t border-b border-zinc-200 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                                    <Typography
                                        className="order-2 mt-2 leading-6 text-zinc-800"
                                        variant="base"
                                        weight="medium"
                                        component="dt"
                                    >
                                        {statKey2}
                                    </Typography>
                                    <Typography
                                        className="order-1  text-yellow-400 "
                                        variant="lg"
                                        component="dd"
                                        weight="bold"
                                    >
                                        {statValue2}
                                    </Typography>
                                </div>
                                <div className="flex flex-col border-t border-zinc-200 p-6 text-center sm:border-0 sm:border-l">
                                    <Typography
                                        className="order-2 mt-2 leading-6 text-zinc-800"
                                        variant="base"
                                        weight="medium"
                                        component="dt"
                                    >
                                        {statKey3}
                                    </Typography>
                                    <Typography
                                        className="order-1  text-yellow-400 "
                                        variant="lg"
                                        component="dd"
                                        weight="bold"
                                    >
                                        {statValue3}
                                    </Typography>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StatCards

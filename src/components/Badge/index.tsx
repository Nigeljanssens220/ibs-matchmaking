import { classNames } from '@/utils/styling'
import React from 'react'
import Typography from '../Typography'

type BadgeVariant = 'active' | 'warning' | 'error'

const VARIANT = {
    active: 'text-green-700 bg-green-200 h-8 w-16 rounded-full flex items-center justify-center',
    warning:
        'text-orange-500/80 bg-orange-200 h-8 w-16 rounded-full flex items-center justify-center',
    error: 'text-red-900 bg-red-200 h-8 w-16 rounded-full flex items-center justify-center',
}

const VARIANT_COLOR = {
    active: '',
    warning: '',
    error: '',
}

export interface BadgeProps extends React.HTMLProps<HTMLDivElement> {
    variant: BadgeVariant
    fullWidth?: boolean
    className?: string
}

const Badge: React.FC<BadgeProps> = ({
    className,
    children,
    variant,
    fullWidth,
    ...rest
}) => {
    return (
        <div
            {...rest}
            className={classNames(
                className,

                VARIANT[variant],
                fullWidth ? 'w-full' : ''
            )}
        >
            <div className="flex items-center">
                <Typography
                    weight="medium"
                    variant="xs"
                    // className={VARIANT_COLOR[variant]}
                >
                    {children}
                </Typography>
            </div>
        </div>
    )
}

export default Badge

import React, { ReactNode } from 'react'
import { classNames } from '@/utils/styling'

type ButtonVariant =
    | 'blackFilled'
    | 'blackOutlined'
    | 'whiteFilled'
    | 'whiteOutlined'

const VARIANT = {
    blackFilled:
        'bg-black text-white disabled:pointer-events-none disabled:opacity-40 hover:bg-gray-700 hover:ring-2 hover:ring-zinc-900 focus:ring-offset-2 focus:ring-2 focus:ring-zinc-900',
    blackOutlined:
        'bg-white text-black hover:bg-white/80 active:bg-white/60 focus:bg-white/40 border-2 border-black disabled:pointer-events-none disabled:opacity-40',
    whiteFilled:
        'bg-white text-black disabled:pointer-events-none disabled:opacity-40 hover:bg-gray-300 hover:ring-2 hover:ring-zinc-900 focus:ring-2 focus:ring-offset-2 focus:ring-zinc-900',
    whiteOutlined:
        'bg-black text-white hover:bg-black/80 active:bg-black/60 focus:bg-black/40 border-2 border-white disabled:pointer-events-none disabled:opacity-40',
}

export interface ButtonProps
    extends React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    variant: ButtonVariant
    startIcon?: ReactNode
    endIcon?: ReactNode
    fullWidth?: boolean
    className?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            children,
            variant = 'blackFilled',
            startIcon,
            endIcon,
            fullWidth,
            disabled,
            ...rest
        },
        ref
    ) => {
        return (
            <button
                {...rest}
                ref={ref}
                disabled={disabled}
                className={classNames(
                    className,
                    'flex font-bold items-center justify-center px-4 py-2 rounded-md  ',
                    VARIANT[variant],
                    fullWidth ? 'w-full' : ''
                )}
            >
                {startIcon && startIcon}
                {children}
                {endIcon && endIcon}
            </button>
        )
    }
)

Button.displayName = 'Button'

export default Button

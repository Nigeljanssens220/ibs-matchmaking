import { classNames } from '@/utils/styling'
import { FC } from 'react'

export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
    children?: React.ReactNode
    className?: string
}

const Button: FC<ButtonProps> = ({ children, className, onClick }) => {
    return (
        <div>
            <button
                className={classNames(
                    className,
                    'text-zinc-700 font-medium bg-white hover:bg-zinc-800 hover:text-white hover:ring-white hover:ring-2 py-2 px-4 rounded'
                )}
                onClick={onClick}
            >
                {children}
            </button>
        </div>
    )
}

export default Button

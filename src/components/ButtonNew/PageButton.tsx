import { classNames } from '@/utils/styling'
import { ButtonProps } from '.'

const PageButton: React.FC<ButtonProps> = ({
    children,
    className,
    ...rest
}) => {
    return (
        <button
            type="button"
            className={classNames(
                'relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50',
                className
            )}
            {...rest}
        >
            {children}
        </button>
    )
}

export default PageButton

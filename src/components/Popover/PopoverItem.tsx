import { classNames } from '@/utils/styling'
import NavLink from '../NavLink'
import Typography from '../Typography'

interface PopoverItemProps {
    href?: string
    className?: string
    onClick?: () => void
    children?: React.ReactNode
    startIcon?: React.ReactNode
    endIcon?: React.ReactNode
}

const PopoverItem: React.FC<PopoverItemProps> = ({
    href,
    className,
    onClick,
    children,
    startIcon,
    endIcon,
    ...rest
}) => {
    return (
        <>
            {href ? (
                <NavLink {...rest} href={href}>
                    <div className={classNames(className, 'ml-4')}>
                        {startIcon && startIcon}
                        <Typography>{children}</Typography>
                        {endIcon && endIcon}
                    </div>
                </NavLink>
            ) : (
                <div {...rest}>
                    <div
                        className={classNames(className, 'ml-4')}
                        onClick={onClick && onClick}
                    >
                        {startIcon && startIcon}
                        <Typography>{children}</Typography>
                        {endIcon && endIcon}
                    </div>
                </div>
            )}
        </>
    )
}

export default PopoverItem

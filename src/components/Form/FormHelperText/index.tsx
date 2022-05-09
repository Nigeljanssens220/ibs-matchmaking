import Typography from '@/components/Typography'
import { classNames } from '@/utils/styling'
import React, { FC } from 'react'

export interface FormHelperTextProps extends React.HTMLProps<HTMLDivElement> {
    className?: string
}

const FormHelperText: FC<FormHelperTextProps> = ({
    children,
    className = '',
    ...props
}) => {
    return (
        <Typography
            variant="xs"
            className={classNames('text-gray-600 mt-1', className)}
        >
            <div {...props}>{children}</div>
        </Typography>
    )
}

export default FormHelperText

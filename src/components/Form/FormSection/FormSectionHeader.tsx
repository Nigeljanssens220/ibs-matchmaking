import Typography from '@/components/Typography'
import React, { FC } from 'react'

export interface FormSectionHeaderProps {
    header: string
    subheader?: string
}

const FormSectionHeader: FC<FormSectionHeaderProps> = ({
    header,
    subheader,
}) => {
    return (
        <div>
            <div className="flex flex-col gap-1">
                <Typography variant="h3">{header}</Typography>
                {subheader && <Typography variant="sm">{subheader}</Typography>}
            </div>
        </div>
    )
}

export default FormSectionHeader

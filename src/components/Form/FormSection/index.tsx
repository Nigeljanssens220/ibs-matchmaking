import React, { FC, ReactElement, ReactNode } from 'react'
import FormSectionHeader, { FormSectionHeaderProps } from './FormSectionHeader'

export interface FormSectionProps {
    children?: ReactNode
    header: ReactElement<FormSectionHeaderProps>
    columns?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
    className?: string
}

type FormSection<P> = FC<P> & {
    Header: FC<FormSectionHeaderProps>
}

const FormSection: FormSection<FormSectionProps> = ({
    children,
    className,
    columns = 1,
    header,
}) => {
    return (
        <div className={className}>
            {header}
            <div className={`mt-6 grid grid-cols-${columns} gap-x-4`}>
                {children}
            </div>
        </div>
    )
}

FormSection.Header = FormSectionHeader

export default FormSection

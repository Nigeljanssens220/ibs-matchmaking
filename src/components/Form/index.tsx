import React, { FC } from 'react'
import { FormProvider } from 'react-hook-form'
import { UseFormReturn } from 'react-hook-form/dist/types'
import FormHelperText, { FormHelperTextProps } from './FormHelperText'
import FormSection, { FormSectionProps } from './FormSection'
import FormTextField, { FormTextFieldProps } from './FormTextField'

export const FORM_STYLING =
    'appearance-none outline-none rounded placeholder:text-gray-500 bg-gray-700 px-3 py-2 block w-full min-w-0 border-2 border-gray-500 focus:ring-gray-300 focus:border-gray-300'

export interface FormProps extends UseFormReturn<any> {
    // @ts-ignore TYPE NEEDS FIXING
    onSubmit(x): void
}

type Form<P> = FC<P> & {
    // Card: FC<FormCardProps>
    // Fields: FC<FormFieldsProps>
    Section: FormSection<FormSectionProps>
    // Submit: FC<FormSubmitProps>
    TextField: FC<FormTextFieldProps>
    HelperText: FC<FormHelperTextProps>
}

const Form: Form<FormProps> = ({ children, onSubmit, ...rest }) => {
    return (
        <FormProvider {...rest}>
            <form onSubmit={rest.handleSubmit(onSubmit)}>{children}</form>
        </FormProvider>
    )
}

Form.Section = FormSection
Form.TextField = FormTextField
Form.HelperText = FormHelperText

export default Form

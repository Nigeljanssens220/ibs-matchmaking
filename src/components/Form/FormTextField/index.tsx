import Typography from '@/components/Typography'
import { classNames } from '@/utils/styling'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { FORM_STYLING } from '..'
import FormHelperText from '../FormHelperText'

export interface FormTextFieldProps extends React.HTMLProps<HTMLInputElement> {
    name: string
    error?: string
    helperText?: any
    icon?: React.ReactNode
    endIcon?: React.ReactNode
    children?: React.ReactElement<HTMLInputElement>
}

const FormTextField: React.FC<FormTextFieldProps> = ({
    name,
    label,
    children,
    helperText,
    icon,
    endIcon,
    error,
    ...rest
}) => {
    const {
        register,
        unregister,
        formState: { errors },
    } = useFormContext()

    // Unregister on unmount
    useEffect(() => {
        return () => {
            unregister(name)
        }
    }, [name, unregister])

    return (
        <>
            <Typography weight="normal">{label}</Typography>
            <div
                className={classNames(
                    'mt-2 flex rounded-md shadow-sm border',
                    errors[name]
                        ? 'border-red/40 hover:border-red focus:border-red active:focus:border-red'
                        : 'border-transparent'
                )}
            >
                {icon && (
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-dark-800 sm:text-sm">
                        {icon}
                    </span>
                )}
                <input
                    {...register(name)}
                    {...rest}
                    className={classNames(
                        icon && !endIcon
                            ? 'rounded-none rounded-r-md'
                            : 'rounded',
                        endIcon && !icon
                            ? 'rounded-none rounded-l-md'
                            : 'rounded',
                        icon && endIcon ? 'rounded-none' : 'rounded',
                        FORM_STYLING,
                        errors[name] ? '!border-transparent' : '',
                        rest.className
                    )}
                    // autoComplete="off"
                    // autoCorrect="off"
                    // autoCapitalize="off"
                />
                {endIcon && (
                    <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-dark-800 sm:text-sm">
                        {endIcon}
                    </span>
                )}
            </div>
            {!!errors[name] ? (
                <FormHelperText className="!text-red-600">
                    {errors[name].message}
                </FormHelperText>
            ) : error ? (
                <FormHelperText className="!text-red-600">
                    {error}
                </FormHelperText>
            ) : typeof helperText === 'string' ? (
                <FormHelperText>{helperText}</FormHelperText>
            ) : (
                helperText
            )}
        </>
    )
}

export default FormTextField

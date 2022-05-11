import { classNames } from '@/utils/styling'
import { TextField } from '@mui/material'
import React from 'react'

interface InputTextFieldProps extends React.HTMLProps<HTMLInputElement> {
    className?: string
    value?: string
    label?: string
    placeholder?: string
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputTextField: React.FC<InputTextFieldProps> = ({
    className,
    value,
    label,
    placeholder,
    onKeyDown,
    onChange,
}) => {
    return (
        <TextField
            placeholder={placeholder}
            label={label}
            variant="filled"
            className={classNames(
                className,
                'bg-gray-700 max-w-md w-full rounded-lg'
            )}
            value={value}
            onKeyDown={onKeyDown}
            onChange={onChange}
            InputLabelProps={{
                shrink: true,
                style: { color: 'white' },
            }}
            InputProps={{
                disableUnderline: true,
                style: { color: 'white' },
            }}
        />
    )
}

export default InputTextField

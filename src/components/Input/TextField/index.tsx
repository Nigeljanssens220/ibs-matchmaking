import { classNames } from '@/utils/styling'
import React from 'react'

interface InputTextFieldProps extends React.HTMLProps<HTMLInputElement> {
    className?: string
    value?: string
    label?: string
    placeholder?: string
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputTextField: React.FC<InputTextFieldProps> = ({
    className,
    value,
    placeholder,
    onKeyDown,
    onChange,
}) => {
    return (
        <input
            type="text"
            placeholder={placeholder}
            className={classNames(
                className,
                'appearance-none outline-none rounded placeholder:text-gray-500 bg-gray-700 px-3 py-2 block w-full min-w-0 focus:border-2 focus:ring-gray-300 focus:border-gray-300'
            )}
            value={value}
            onKeyDown={onKeyDown}
            onChange={onChange}
        />
    )
}

export default InputTextField

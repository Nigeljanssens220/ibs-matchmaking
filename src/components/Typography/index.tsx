/* eslint-disable react/display-name */
import React, { FC, forwardRef } from 'react'
import { classNames } from '@/utils/styling'

export type TypographyWeight = 'thin' | 'medium' | 'bold'

enum Weights {
    thin = 'font-thin',
    medium = 'font-medium',
    bold = 'font-bold',
}

export type TypographyVariant =
    | 'hero'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'base'
    | 'lg'
    | 'md'
    | 'sm'
    | 'xs'

enum Variants {
    hero = 'text-6xl ',
    h1 = 'text-4xl',
    h2 = 'text-3xl',
    h3 = 'text-2xl',
    base = 'text-base',
    lg = 'text-lg',
    md = 'text-md',
    sm = 'text-sm',
    xs = 'text-xs',
}

export interface TypographyProps
    extends React.AllHTMLAttributes<React.ReactHTML> {
    variant?: TypographyVariant
    weight?: TypographyWeight
    component?: keyof React.ReactHTML
    className?: string
}

const Typography: FC<TypographyProps> = forwardRef(
    (
        {
            variant = 'base',
            weight = 'medium',
            component = 'div',
            className = 'currentColor',
            children = [],
            ...rest
        },
        ref
    ) => {
        return React.createElement(
            component,
            {
                className: classNames(
                    className,
                    Weights[weight],
                    Variants[variant]
                ),
                ...rest,
                ref,
            },
            children
        )
    }
)

export default Typography

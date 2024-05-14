'use client'
import classNames from 'classnames'
import React, { ElementType, ReactNode, createElement, forwardRef } from 'react'

import { mapIcons } from 'components/InputField/InputField'
import { Tooltip } from 'components/Tooltip/Tooltip'
import {
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from 'types/generalTypes'
import { Spinner } from '../Spinner/Spinner'
import {
  BUTTON_BASE_CLASSES,
  BUTTON_IMPACT_CLASSES,
  BUTTON_SHAPE_CLASSES,
  BUTTON_SIZE_CLASSES,
} from './constants'

interface Props {
  variant?: 'primary' | 'secondary' | 'text' | 'error' | 'custom' | 'green'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  focus?: 'outline' | 'shadow' | 'none'
  impact?: 'bold' | 'none' | 'light' | 'link'
  id?: string
  disabled?: boolean
  loading?: boolean
  prefixIcon?: ReactNode
  shape?: 'rounded' | 'square' | 'pill'
  suffixIcon?: ReactNode
  tooltipText?: string
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right'
  bgColor?: string
  textColor?: string
  form?: string
  hoverBgColor?: string
  hoverTextColor?: string
  children?: ReactNode
  className?: string
  onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  actAsNormalButton?: boolean
  style?: React.CSSProperties
  badge?: number
}

export type ButtonProps<C extends React.ElementType> =
  PolymorphicComponentPropsWithRef<C, Props>

type ButtonComponent = <C extends React.ElementType = 'button'>(
  props: ButtonProps<C>,
) => ReactNode

export const Button: ButtonComponent = forwardRef(
  <C extends ElementType = 'button'>(
    {
      tooltipPosition,
      tooltipText,
      className,
      variant = 'primary',
      impact = 'bold',
      loading,
      shape = 'rounded',
      size = 'md',
      prefixIcon,
      suffixIcon,
      children,
      badge,
      id = 'button',
      as,
      ...rest
    }: ButtonProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Element = as || 'button'

    return (
      <span
        id={id}
        role="button"
        aria-label="button"
        data-tooltip-content={tooltipText}
        data-tooltip-place={tooltipPosition}
        data-tooltip-id={id}
        className={classNames('relative', className)}
      >
        {createElement(
          Element,
          {
            className: classNames(
              BUTTON_BASE_CLASSES,
              BUTTON_SIZE_CLASSES[size],
              BUTTON_IMPACT_CLASSES[variant][impact],
              BUTTON_SHAPE_CLASSES[shape],
              className,
            ),
            ref,
            ...rest,
          },
          <>
            {prefixIcon && mapIcons(prefixIcon)}
            {loading && (
              <>
                <Spinner className="absolute h-4 w-4" />
                <span aria-readonly="true" className="hidden">
                  Loading...
                </span>
              </>
            )}
            <span
              className={classNames(
                'transition',
                loading ? 'opacity-0' : 'opacity-100',
              )}
            >
              {children}
            </span>
            {suffixIcon && mapIcons(suffixIcon)}
            {!!badge && (
              <span className="text-label/regular absolute right-0 top-0 flex h-[14px] w-[14px] content-center items-center justify-center rounded-full bg-primary-500 text-white">
                {badge}
              </span>
            )}
          </>,
        )}
        <Tooltip contentId={id} title={tooltipText} />
      </span>
    )
  },
)

//THIS COMPONENT REQUIRES NEXT IMAGE FOR IT TO WORK

import classNames from 'classnames'
import { Tooltip } from 'components/Tooltip/Tooltip'
import { PropsWithChildren } from 'react'

export type AvatarProps = PropsWithChildren<{
  tooltipText?: string
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
  imageUrl?: string
  imagePosition?: 'top' | 'bottom' | 'left' | 'right' | 'center'
}>

export const Avatar = ({
  tooltipPosition,
  tooltipText,
  imageUrl,
  size = 'lg',
  imagePosition = 'center',
  children,
}: AvatarProps) => {
  const s =
    size === 'xs'
      ? 'w-4 h-4 text-label/regular'
      : size === 'sm'
        ? 'w-5 h-5 text-body3/regular'
        : size === 'md'
          ? 'w-6 h-6 text-body2/regular'
          : size === 'lg'
            ? 'w-8 h-8 '
            : size === 'xl'
              ? 'w-9 h-9'
              : size === '2xl'
                ? 'w-12 h-12'
                : size === '3xl'
                  ? 'w-16 h-16'
                  : 'w-20 h-20'

  const ip =
    imagePosition === 'top'
      ? 'object-top'
      : imagePosition === 'bottom'
        ? 'object-bottom'
        : imagePosition === 'left'
          ? 'object-left'
          : 'object-right'

  return (
    <>
      <div
        data-tooltip-id="Avatar"
        data-tooltip-content={tooltipText}
        data-tooltip-place={tooltipPosition}
        className={classNames(
          s,
          'relative overflow-hidden rounded-full  border border-gray-100 ',
        )}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            className={classNames(ip, 'object-cover')}
          />
        ) : (
          <div
            role="banner"
            className="flex h-full w-full items-center justify-center bg-gray-50 text-secondary-500"
          >
            {children}
          </div>
        )}
      </div>

      <Tooltip
        contentId="
                Avatar"
        className="!text-body3/regular !rounded-md !bg-gray-900 !px-3 !py-2 !text-white"
        title={tooltipText}
      />
    </>
  )
}

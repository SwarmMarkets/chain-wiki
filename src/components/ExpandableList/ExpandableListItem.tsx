import clsx from 'clsx'
import React, { ReactNode } from 'react'
import { IconName } from 'src/shared/types/iconNames'
import Icon from '../ui-kit/Icon/Icon'
import Link from 'next/link'

export interface ExpandableListItem {
  id: string
  active?: boolean
  label: ReactNode
  icon?: IconName
  iconImageUrl?: string
  to?: string
}

export interface ExpandableListItemProps {
  item: ExpandableListItem
  onClickItem?: (item: ExpandableListItem) => void
  lighter?: boolean
}

const ExpandableListItem: React.FC<ExpandableListItemProps> = ({
  item,
  onClickItem,
  lighter = false,
}) => {
  const expandableItem = (
    <div
      className={clsx(
        'group flex items-center px-1.5 py-1 gap-2 typo-body2 rounded cursor-pointer transition-colors',
        item.active && (lighter ? 'bg-gray-100' : 'bg-gray-200'),
        item.active ? 'text-gray-900' : 'text-gray-700',
        lighter ? 'hover:bg-gray-100' : 'hover:bg-gray-200'
      )}
      onClick={() => onClickItem?.(item)}
    >
      {item.iconImageUrl ? (
        <img src={item.iconImageUrl} className='max-w-3.5 max-h-3.5' />
      ) : (
        item.icon && (
          <Icon
            name={item.icon}
            size={16}
            className='transition-colors group-hover:text-gray-900 flex-shrink-0'
          />
        )
      )}
      <div className='w-full group-hover:text-gray-900'>{item.label}</div>
    </div>
  )

  if (item.to) {
    return <Link href={item.to}>{expandableItem}</Link>
  }

  return expandableItem
}

export default ExpandableListItem

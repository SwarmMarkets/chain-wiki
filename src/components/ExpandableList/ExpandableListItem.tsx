import clsx from 'clsx'
import React, { ReactNode } from 'react'
import { IconName } from 'src/shared/types/iconNames'
import Icon from '../ui-kit/Icon/Icon'
import { Link } from 'react-router-dom'

export interface ExpandableListItem {
  id: string
  active?: boolean
  label: ReactNode
  icon?: IconName
  to?: string
}

export interface ExpandableListItemProps {
  item: ExpandableListItem
  onClickItem?: (item: ExpandableListItem) => void
}

const ExpandableListItem: React.FC<ExpandableListItemProps> = ({
  item,
  onClickItem,
}) => {
  const expandableItem = (
    <div
      className={clsx(
        'group flex items-center p-3 gap-3 text-base rounded cursor-pointer transition-colors hover:bg-gray-200',
        item.active && 'bg-gray-200'
      )}
      onClick={() => onClickItem?.(item)}
    >
      {item.icon && (
        <Icon
          name={item.icon}
          size={16}
          className='text-main transition-colors group-hover:text-main-accent'
        />
      )}
      <div className='typo-body2'>{item.label}</div>
    </div>
  )

  if (item.to) {
    return <Link to={item.to}>{expandableItem}</Link>
  }

  return expandableItem
}

export default ExpandableListItem

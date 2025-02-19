import React, { useState } from 'react'
import Icon from 'src/components/ui-kit/Icon/Icon'

interface ExpandableListItem {
  id: number
  value: string
  isActive?: boolean
}

interface ExpandableListProps {
  title: string
  items?: ExpandableListItem[]
  initialExpanded?: boolean
  onClickTitle?: () => void
  onClickItem?: (item: ExpandableListItem) => void
  isActive?: boolean
}

const ExpandableList: React.FC<ExpandableListProps> = ({
  title,
  items = [],
  initialExpanded = false,
  onClickTitle,
  onClickItem,
  isActive,
}) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded)

  const handleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const handleClickItem = (item: ExpandableListItem) => {
    onClickItem?.(item)
  }

  return (
    <div className='relative pl-4'>
      <div
        className={`flex items-center gap-2 px-4 py-2 cursor-pointer transition-colors ${
          isActive ? 'text-blue-600' : 'text-main'
        } hover:text-blue-500`}
        onClick={onClickTitle || handleExpand}
      >
        {items.length > 0 && (
          <Icon
            className={`w-3 h-3 transition-transform ${
              isExpanded ? 'rotate-90' : ''
            }`}
            name='chevronRight'
            onClick={handleExpand}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M9 5l7 7-7 7'
            ></path>
          </Icon>
        )}
        <span>{title}</span>
      </div>
      {isExpanded && (
        <ul className='ml-6 border-l-2 border-gray-300 pl-4'>
          {items.map(item => (
            <li
              key={item.id}
              className={`relative px-4 py-2 cursor-pointer transition-colors ${
                item.isActive ? 'text-blue-600' : 'text-black'
              } hover:text-blue-500`}
              onClick={() => handleClickItem(item)}
            >
              {item.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ExpandableList

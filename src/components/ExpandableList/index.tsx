import clsx from 'clsx'
import { AnimatePresence } from 'framer-motion'
import { ReactNode, useState } from 'react'
import Icon from 'src/components/ui-kit/Icon/Icon'
import Collapse from '../ui-kit/Animations/Collapse'
import { ExpandableListItem as IExpandableListItem } from './ExpandableListItem'
import SelectableList from './SelectableList'

interface ExpandableListProps {
  title: ReactNode
  items?: IExpandableListItem[]
  noMarginLeft?: boolean
  onClickItem?: (item: IExpandableListItem) => void
}

const ExpandableList: React.FC<ExpandableListProps> = ({
  title,
  items = [],
  noMarginLeft,
  onClickItem,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='flex flex-col'>
      <div
        className={clsx(
          'group flex items-center px-1.5 py-0.5 gap-2 text-lg mb-1 rounded cursor-pointer transition-colors hover:bg-gray-200'
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon
          name='chevronRight'
          size={10}
          className={clsx(
            'text-main transition-transform group-hover:text-main-accent',
            isOpen ? 'rotate-90' : 'rotate-0'
          )}
        />
        <div className='typo-body2 w-full'>{title}</div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <Collapse>
            <SelectableList
              items={items}
              onClickItem={onClickItem}
              noMarginLeft={noMarginLeft}
            />
          </Collapse>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ExpandableList

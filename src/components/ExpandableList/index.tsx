import clsx from 'clsx'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Icon from 'src/components/ui-kit/Icon/Icon'
import Collapse from '../ui-kit/Animations/Collapse'
import ExpandableListItem, {
  ExpandableListItem as IExpandableListItem,
} from './ExpandableListItem'

interface ExpandableListProps {
  title: string
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
          'group flex items-center p-3 gap-3 text-lg mb-1 rounded cursor-pointer transition-colors hover:bg-gray-200'
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon
          name='chevronRight'
          size={12}
          className={clsx(
            'text-main transition-transform group-hover:text-main-accent',
            isOpen ? 'rotate-90' : 'rotate-0'
          )}
        />
        <div className='typo-body2'>{title}</div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <Collapse>
            <div
              className={clsx(
                'flex flex-col space-y-1',
                !noMarginLeft && 'ml-6'
              )}
            >
              {items.length > 0 ? (
                items.map((item, index) => (
                  <ExpandableListItem
                    key={index}
                    item={item}
                    onClickItem={onClickItem}
                  />
                ))
              ) : (
                <div className='text-sm text-gray-500 p-3'>No elements</div>
              )}
            </div>
          </Collapse>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ExpandableList

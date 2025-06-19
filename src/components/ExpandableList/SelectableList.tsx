import clsx from 'clsx'
import ExpandableListItem, {
  ExpandableListItem as IExpandableListItem,
} from './ExpandableListItem'

interface SelectableListProps {
  items: IExpandableListItem[]
  onClickItem?: (item: IExpandableListItem) => void
  noMarginLeft?: boolean
  lighter?: boolean
}

const SelectableList: React.FC<SelectableListProps> = ({
  items,
  onClickItem,
  noMarginLeft,
  lighter,
}) => {
  return (
    <div className={clsx('flex flex-col space-y-1', !noMarginLeft && 'ml-6')}>
      {items.length > 0 ? (
        items.map((item, index) => (
          <ExpandableListItem
            key={index}
            item={item}
            onClickItem={onClickItem}
            lighter={lighter}
          />
        ))
      ) : (
        <div className='p-3'>No elements</div>
      )}
    </div>
  )
}

export default SelectableList

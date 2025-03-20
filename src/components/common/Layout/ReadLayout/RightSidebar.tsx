import clsx from 'clsx'
import Content from 'src/components/common/Layout/ReadLayout/Content'

interface RightSidebarProps {
  contentElem: HTMLDivElement | null
  preview?: boolean
}

const RightSidebar: React.FC<RightSidebarProps> = ({
  contentElem,
  preview,
}) => {
  return (
    <aside
      className={clsx(
        'w-1/6 overflow-y-auto sticky top-24',
        !preview && 'h-screen'
      )}
    >
      <Content contentElem={contentElem} />
    </aside>
  )
}

export default RightSidebar

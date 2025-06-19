import React from 'react'
import SidebarTreeNode, { ISidebarTreeNode } from './SidebarTreeNode'

interface SidebarTreeProps {
  data: ISidebarTreeNode[]
  selectedId: string
  onSelect?: (node: ISidebarTreeNode) => void
}

const SidebarTree: React.FC<SidebarTreeProps> = ({
  data,
  selectedId,
  onSelect,
}) => {
  return (
    <ul>
      {data.map(node => (
        <SidebarTreeNode
          key={node.tokenId}
          node={node}
          selectedId={selectedId}
          onSelect={onSelect}
        />
      ))}
    </ul>
  )
}

export default SidebarTree

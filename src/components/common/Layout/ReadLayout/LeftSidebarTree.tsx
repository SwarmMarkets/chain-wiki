import React, { useState } from 'react'
import LeftSidebarTreeNode, {
  ILeftSidebarTreeNode,
} from './LeftSidebarTreeNode'

interface LeftSidebarTreeProps {
  data: ILeftSidebarTreeNode[]
}

const LeftSidebarTree: React.FC<LeftSidebarTreeProps> = ({ data }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  return (
    <ul>
      {data.map(node => (
        <LeftSidebarTreeNode
          key={node.tokenId}
          node={node}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      ))}
    </ul>
  )
}

export default LeftSidebarTree

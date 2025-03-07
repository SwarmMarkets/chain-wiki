import React, { useState } from 'react'
import SidebarTreeNode, { ISidebarTreeNode } from './SidebarTreeNode'

interface SidebarTreeProps {
  data: ISidebarTreeNode[]
}

const SidebarTree: React.FC<SidebarTreeProps> = ({ data }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  return (
    <ul>
      {data.map(node => (
        <SidebarTreeNode
          key={node.tokenId}
          node={node}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      ))}
    </ul>
  )
}

export default SidebarTree

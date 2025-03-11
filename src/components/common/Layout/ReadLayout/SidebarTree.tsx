import React, { useState } from 'react'
import SidebarTreeNode, { ISidebarTreeNode } from './SidebarTreeNode'

interface SidebarTreeProps {
  data: ISidebarTreeNode[]
  onSelect?: (id: string) => void
}

const SidebarTree: React.FC<SidebarTreeProps> = ({ data, onSelect }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  return (
    <ul>
      {data.map(node => (
        <SidebarTreeNode
          key={node.tokenId}
          node={node}
          selectedId={selectedId}
          onSelect={id => {
            setSelectedId(id)
            onSelect?.(id)
          }}
        />
      ))}
    </ul>
  )
}

export default SidebarTree

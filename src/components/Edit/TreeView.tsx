import { MoveHandler, NodeRendererProps, Tree } from 'react-arborist'
import useTreeBackend from './useTreeBackend'

export const data = [
  {
    id: '111',
    name: 'Group1',
    children: [
      { id: '1', name: 'Unread' },
      { id: '2', name: 'Threads' },
      {
        id: '3',
        name: 'Chat Rooms',
        children: [
          { id: 'c1', name: 'General' },
          { id: 'c2', name: 'Random' },
          { id: 'c3', name: 'Open Source Projects' },
        ],
      },
      {
        id: '4',
        name: 'Direct Messages',
        children: [
          { id: 'd1', name: 'Alice' },
          { id: 'd2', name: 'Bob' },
          { id: 'd3', name: 'Charlie' },
        ],
      },
    ],
  },
]

function Node({ node, style, dragHandle, preview }: NodeRendererProps<any>) {
  /* This node instance can do many things. See the API reference. */
  if (node.data.id === '111') {
    return (
      <div style={style} ref={dragHandle}>
        {node.data.name}
      </div>
    )
  }

  return (
    <div
      style={{ ...style, paddingLeft: node.level > 1 ? 24 : 0 }}
      ref={dragHandle}
      onClick={() => node.toggle()}
    >
      {node.isLeaf ? '🍁' : '🗀'} {node.data.name}
    </div>
  )
}

/* Customize Appearance */
export default function App() {
  return (
    <Tree
      initialData={data}
      openByDefault={true}
      width={600}
      height={1000}
      indent={24}
      rowHeight={36}
      paddingTop={30}
      paddingBottom={10}
      padding={25 /* sets both */}
      disableEdit={some => some.id === '111'}
      disableDrop={some =>
        some.parentNode.id === '__REACT_ARBORIST_INTERNAL_ROOT__'
      }
    >
      {Node}
    </Tree>
  )
}

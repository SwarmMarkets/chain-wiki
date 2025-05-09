import { DropOptions, Tree } from '@minoru/react-dnd-treeview'
import clsx from 'clsx'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { isHiddenList } from '../utils'
import Node from './Node'
import Placeholder from './Placeholder'
import styles from './styles.module.css'
import { EditNodeModel, EditNodeModelData } from './types'

interface EditIndexPagesTreeProps {
  onClick?: (id: string) => void
  readonly?: boolean
  activeId?: string
  to?: (node: EditNodeModel) => string
  treeData: EditNodeModel[]
  onDrop?: (newTree: EditNodeModel[], e: DropOptions<EditNodeModelData>) => void
  onUpdateName?: (id: string, name: string) => void
}

const EditIndexPagesTree: React.FC<EditIndexPagesTreeProps> = ({
  treeData,
  readonly = false,
  to,
  activeId,
  onClick,
  onDrop,
  onUpdateName,
}) => {
  const { t } = useTranslation('nft')
  const noTokens = treeData?.length === 0

  if (noTokens) {
    return <p className='text-center'>{t('indexPages.noTokens')}</p>
  }

  const handleDrop = (
    newTree: EditNodeModel[],
    e: DropOptions<EditNodeModelData>
  ) => {
    if (e.dropTargetId === e.dragSourceId) return
    if (
      e.dragSource?.data?.type === 'group' &&
      e.dropTargetId !== 0 &&
      !isHiddenList(e.dropTargetId.toString())
    )
      return
    onDrop?.(newTree, e)
  }

  if (!treeData.length) {
    return null
  }

  return (
    <div className={styles.wrapper}>
      <Tree
        classes={{
          root: clsx(styles.treeRoot),
          placeholder: styles.placeholder,
          dropTarget: styles.dropTarget,
          listItem: styles.listItem,
        }}
        tree={treeData}
        sort={false}
        rootId={0}
        insertDroppableFirst={false}
        enableAnimateExpand={true}
        onDrop={handleDrop}
        canDrop={() => true}
        {...(readonly && { canDrag: () => false, canDrop: () => false })}
        dropTargetOffset={5}
        placeholderRender={(node, { depth }) => (
          <Placeholder
            depth={depth}
            parent={treeData.find(t => t.id === node.parent)}
          />
        )}
        initialOpen
        render={(node, { depth, isOpen, hasChild, onToggle }) => {
          return (
            <Node
              parent={treeData.find(t => t.id === node.parent)}
              onToggle={onToggle}
              editable={!isHiddenList(node.id.toString())}
              to={to?.(node)}
              active={activeId === node.id}
              onEdit={name => onUpdateName?.(node.id.toString(), name)}
              hasChild={hasChild}
              node={node}
              depth={depth}
              isOpen={isOpen}
              isGroup={node.data?.type === 'group'}
              readonly={readonly}
              onClick={() => onClick?.(node.id.toString())}
              treeData={treeData}
            />
          )
        }}
      />
    </div>
  )
}

export default EditIndexPagesTree

import { useEditingStore } from 'src/shared/store/editing-store'
import EditIndexPagesItem from './EditIndexPageItem'
import useEdit from './useEdit'
import { NodeRendererProps, Tree } from 'react-arborist'
import { IpfsIndexPage } from 'src/shared/utils'
import Button from '../ui/Button/Button'

function Node({
  node,
  style,
  dragHandle,
  preview,
}: NodeRendererProps<IpfsIndexPage>) {
  const { fullTokens, updateTokenName } = useEdit()
  const { currEditableToken, updateCurrEditableToken } = useEditingStore()

  return (
    <div
      style={{ ...style, paddingLeft: node.level > 1 ? 24 : 0 }}
      ref={dragHandle}
      onClick={() => node.toggle()}
    >
      <EditIndexPagesItem
        name={node.data.title}
        active={currEditableToken?.id === node.data.tokenId}
        key={node.data.tokenId}
        onClick={() =>
          updateCurrEditableToken(
            fullTokens?.find(t => t.id === node.data.tokenId) || null
          )
        }
        onEdit={name => updateTokenName(node.data.tokenId, name)}
      />
    </div>
  )
}

const EditIndexPageList = () => {
  const { editedIndexPages, updateIndexPage } = useEditingStore()

  console.log(editedIndexPages)

  if (editedIndexPages.items.length === 0) return null

  return (
    <>
      <Tree
        data={editedIndexPages.items.map(p => ({ ...p, id: p.tokenId }))}
        openByDefault={true}
        width={200}
        height={300}
        indent={24}
        rowHeight={36}
        paddingTop={30}
        paddingBottom={10}
        padding={25 /* sets both */}
        // disableEdit={some => some.id === '111'}
      >
        {Node}
      </Tree>
      <Button
        onClick={() =>
          updateIndexPage({
            tokenId: editedIndexPages?.items?.[0]?.tokenId,
            title: 'title',
          })
        }
      >
        Add
      </Button>
    </>
  )
}

export default EditIndexPageList

{
  /* {editedIndexPages.items.length > 0 &&
        editedIndexPages.items.map(indexPage => (
          <EditIndexPagesItem
            name={indexPage?.title || ''}
            active={currEditableToken?.id === indexPage.tokenId}
            key={indexPage.tokenId}
            onClick={() =>
              updateCurrEditableToken(
                fullTokens?.find(t => t.id === indexPage.tokenId) || null
              )
            }
            onEdit={name => updateTokenName(indexPage.tokenId, name)}
          />
        ))} */
}

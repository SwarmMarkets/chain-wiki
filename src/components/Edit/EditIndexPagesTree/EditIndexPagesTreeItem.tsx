import EditIndexPagesItem from '../EditIndexPageItem'

const EditIndexPagesTreeItem = (props: any, props2) => {
  const { fullTokens, updateTokenName } = useEdit()
  const { currEditableToken, updateCurrEditableToken } = useEditingStore()

  return (
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
  )
}

export default EditIndexPagesTreeItem

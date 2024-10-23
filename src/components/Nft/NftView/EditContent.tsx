import Editor from '@src/components/Editor'
import useNFT from '@src/hooks/subgraph/useNFT'

interface EditContentProps {
  nftAddress: string
}

const EditContent: React.FC<EditContentProps> = ({ nftAddress }) => {
  const { nft } = useNFT(nftAddress, {
    disableRefetch: true,
    fetchFullData: true,
  })
  const initialContent = nft?.ipfsContent?.htmlContent || ''

  return <Editor nftAddress={nftAddress} initialContent={initialContent} />
}

export default EditContent

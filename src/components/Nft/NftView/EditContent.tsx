import Editor from '@src/components/Editor'
import { useTranslation } from 'react-i18next'
import { SettingsLayout } from './SettingsLayout'
import useNFT from '@src/hooks/subgraph/useNFT'

interface EditContentProps {
  nftAddress: string
}

const EditContent: React.FC<EditContentProps> = ({ nftAddress }) => {
  const { t } = useTranslation('nft')

  const { nft } = useNFT(nftAddress, {
    disableRefetch: true,
    fetchFullData: true,
  })
  const initialContent = nft?.ipfsContent?.htmlContent || ''

  return (
    <SettingsLayout
      title={t('roleManager.contentEditor.title')}
      description={t('roleManager.contentEditor.description')}
    >
      <Editor nftAddress={nftAddress} initialContent={initialContent} />
    </SettingsLayout>
  )
}

export default EditContent

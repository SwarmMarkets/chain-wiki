import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import HtmlRender from 'src/components/HtmlRender'
import useNFT from 'src/hooks/subgraph/useNFT'
import useToken from 'src/hooks/subgraph/useToken'

const NftReadPage = () => {
  const { t } = useTranslation('nft')
  const { nftId = '', tokenId = '' } = useParams()

  const { nft } = useNFT(nftId, { fetchFullData: true })
  const { token } = useToken(tokenId)

  const html =
    (tokenId
      ? token?.ipfsContent?.htmlContent
      : nft.ipfsContent?.htmlContent) || ''

  const title = tokenId ? token?.name : nft.name

  if (!html) {
    return <p className='text-center'>{t('messages.noContent')}</p>
  }
  return (
    <div>
      <div className='typo-heading2 text-main-accent mb-3 font-bold'>
        {title}
      </div>
      <HtmlRender html={html} />
    </div>
  )
}
export default NftReadPage

import { getNftBySlugOrAddress } from 'src/services/apollo/getNftBySlugOrAddress'
import { getTokenBySlug } from 'src/services/apollo/getTokenBySlug'
import { ReadParams } from 'src/shared/consts/routes'
import { findFirstNonGroupVisibleNode } from 'src/shared/utils/treeHelpers'
import ClientTokenViewer from '../Token/ClientTokenViewer'
import initTranslations from 'src/config/i18n/i18n'

const NftReadPage: React.FC<{
  params?: Promise<ReadParams['token']>
}> = async ({ params: paramsProp }) => {
  const params = await paramsProp
  const nftIdOrSlug = params?.nftIdOrSlug || ''
  const tokenIdOrSlug = params?.tokenIdOrSlug || ''

  const { t } = await initTranslations('en', ['token'])

  const { nft } = await getNftBySlugOrAddress(nftIdOrSlug)

  const firstToken = findFirstNonGroupVisibleNode(
    nft?.indexPagesContent?.indexPages
  )

  const { token } = await getTokenBySlug(
    nft?.id || '',
    tokenIdOrSlug || firstToken?.slug
  )

  if (!nft || !token) {
    return <p className='text-center'>{t('messages.noContent')}</p>
  }

  return <ClientTokenViewer nft={nft} token={token} />
}
export default NftReadPage

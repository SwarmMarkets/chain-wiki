import { redirect } from 'next/navigation'
import ReadLayout from 'src/components/common/Layout/ReadLayout'
import { getNftBySlugOnChains } from 'src/services/apollo/getNftBySlugOnChain'
import Routes, {
  ChainParam,
  chainParamResolver,
  ReadParams,
} from 'src/shared/consts/routes'
import { getChainByName } from 'src/shared/utils'

interface LayoutProps {
  children: React.ReactNode
  params: Promise<ReadParams['token']>
}

const Layout: React.FC<LayoutProps> = async ({ children, params: _params }) => {
  const params = await _params
  const nftIdOrSlugParam = params?.nftIdOrSlug
  const chainParam = params?.chain
  const chainId = getChainByName(chainParamResolver[chainParam])?.id

  // To support cases when chain param is omitted
  if (!chainId) {
    const nftIdOrSlug = chainParam
    const tokenIdOrSlug = nftIdOrSlugParam

    const { baseNft, polygonNft } = await getNftBySlugOnChains(chainParam)

    if (baseNft) {
      if (tokenIdOrSlug) {
        redirect(Routes.read.token(nftIdOrSlug, tokenIdOrSlug, ChainParam.Base))
      }
      redirect(Routes.read.nft(nftIdOrSlug, ChainParam.Base))
    } else if (polygonNft) {
      if (tokenIdOrSlug) {
        redirect(
          Routes.read.token(nftIdOrSlug, tokenIdOrSlug, ChainParam.Polygon)
        )
      }
      redirect(Routes.read.nft(nftIdOrSlug, ChainParam.Polygon))
    } else {
      redirect(Routes.manager.home)
    }
  }

  return <ReadLayout params={params}>{children}</ReadLayout>
}

export default Layout

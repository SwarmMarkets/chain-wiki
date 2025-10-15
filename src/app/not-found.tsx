import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { getNftBySlugOnChains } from 'src/services/apollo/getNftBySlugOnChain'
import Routes, { ChainParam } from 'src/shared/consts/routes'

export default async function NotFoundPage() {
  const h = await headers()
  const pathname = h.get('x-pathname') || ''
  const parts = pathname.split('/').filter(Boolean) // убираем пустые строки
  const nftIdOrSlug = parts.at(-1) // берём последний сегмент

  if (!nftIdOrSlug) {
    redirect(Routes.manager.home)
  }

  const { baseNft, polygonNft } = await getNftBySlugOnChains(nftIdOrSlug)

  if (baseNft) {
    redirect(Routes.read.nft(nftIdOrSlug, ChainParam.Base))
  } else if (polygonNft) {
    redirect(Routes.read.nft(nftIdOrSlug, ChainParam.Polygon))
  } else {
    redirect(Routes.manager.home)
  }
}

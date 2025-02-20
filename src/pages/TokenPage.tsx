import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import TokenContentSkeleton from 'src/components/Token/TokenContentSkeleton'
import TokenView from 'src/components/Token/TokenView'
import { TokenContextProvider } from 'src/components/providers/TokenContext'
import Text from 'src/components/ui/Text'
import useNftPermissions from 'src/hooks/permissions/useNftPermissions'
import useNFT from 'src/hooks/subgraph/useNFT'
import useToken from 'src/hooks/subgraph/useToken'
import useTokens from 'src/hooks/subgraph/useTokens'
import useTabs from 'src/hooks/useTabs'
import { TokenTabs } from 'src/shared/enums/tabs'
import { unifyAddressToId } from 'src/shared/utils'

const TokenPage = () => {
  const { tokenId = '', nftId = '' } = useParams()
  const { t } = useTranslation('token')
  const { permissions } = useNftPermissions(nftId)

  const { activeTab, changeTab, resetTab } = useTabs<TokenTabs>({
    defaultTab: TokenTabs.READ,
  })

  const [contentElem, setContentElem] = useState<HTMLDivElement | null>(null)

  const { token, loadingToken, refetchingToken } = useToken(tokenId)
  const { nft } = useNFT(nftId, { fetchFullData: true })
  const { fullTokens } = useTokens(
    {
      variables: { filter: { nft: unifyAddressToId(nftId) } },
    },
    { fetchFullData: true }
  )

  const showSkeleton = loadingToken && !refetchingToken
  const allLoaded = token && nft && fullTokens

  const handleEditSite = () => {
    changeTab(TokenTabs.EDIT)
  }

  const onMount = (element: HTMLDivElement) => {
    setContentElem(element)
  }

  return (
    <TokenContextProvider value={token}>
      {/* {isReadTab && <IndexPages tokens={fullTokens} nft={nft} />} */}
      {showSkeleton ? (
        <div className='flex justify-center gap-5 w-full'>
          <div className='w-full'>
            <TokenContentSkeleton />
          </div>
        </div>
      ) : (
        <div className='w-full flex flex-col gap-4'>
          <h1 className='typo-heading1 text-main-accent'>{token?.name}</h1>

          <TokenView
            onClickEditSite={handleEditSite}
            token={token}
            onMount={onMount}
          />
        </div>
      )}

      {/* {isReadTab && <TokenStyledContent contentElem={contentElem} />} */}
    </TokenContextProvider>
  )
}

export default TokenPage

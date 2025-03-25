import { useParams } from 'react-router-dom'
import TokenContentSkeleton from 'src/components/Token/TokenContentSkeleton'
import TokenView from 'src/components/Token/TokenView'
import { TokenContextProvider } from 'src/components/providers/TokenContext'
import useToken from 'src/hooks/subgraph/useToken'
import useTabs from 'src/hooks/useTabs'
import { TokenTabs } from 'src/shared/enums/tabs'

const TokenPage = () => {
  const { tokenId = '' } = useParams()

  const { changeTab } = useTabs<TokenTabs>({
    defaultTab: TokenTabs.READ,
  })

  const { token, loadingToken, refetchingToken } = useToken(tokenId)

  const showSkeleton = loadingToken && !refetchingToken

  const handleEditSite = () => {
    changeTab(TokenTabs.EDIT)
  }

  return (
    <TokenContextProvider value={token}>
      {showSkeleton ? (
        <div className='flex justify-center gap-5 w-full'>
          <div className='w-full'>
            <TokenContentSkeleton />
          </div>
        </div>
      ) : (
        <div className='w-full flex flex-col gap-4'>
          <h1 className='typo-heading1 text-main-accent'>{token?.name}</h1>

          <TokenView onClickEditSite={handleEditSite} token={token} />
        </div>
      )}
    </TokenContextProvider>
  )
}

export default TokenPage

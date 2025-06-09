import { useTranslation } from 'react-i18next'
import yup from 'src/shared/validations/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import useYupValidationResolver from 'src/hooks/useYupValidationResolver'
import { Transaction, useAddress, useStorageUpload } from '@thirdweb-dev/react'
import { parseSummaryToFlatTree } from './utils'
import { useParams } from 'react-router-dom'
import {
  generateIpfsIndexPagesContent,
  IpfsIndexPage,
  resolveAllThirdwebTransactions,
  unifyAddressToId,
} from 'src/shared/utils'
import { fetchRepoFiles, fetchRepoTree } from 'src/services/github'
import useTokens from 'src/hooks/subgraph/useTokens'
import { useState } from 'react'
import useTokenUpdate from 'src/hooks/useTokenUpdate'
import { useSX1155NFT } from 'src/hooks/contracts/useSX1155NFT'
import useSmartAccount from 'src/services/safe-protocol-kit/useSmartAccount'
import { SafeClientTxStatus } from '@safe-global/sdk-starter-kit/dist/src/constants'
import useNFT from 'src/hooks/subgraph/useNFT'
import { useToastManager } from 'src/hooks/useToastManager'
import useNFTIdParam from 'src/hooks/useNftIdParam'

export interface IntegrationToken {
  id: string
  name: string
  slug: string
  content: string
}

export interface IntegrationFormInputs {
  username: string
  repoName: string
  branchName: string
}

const useIntegrationForm = () => {
  const { nftId } = useNFTIdParam()

  const { t } = useTranslation('nft', { keyPrefix: 'settings.import' })
  const [submitLoading, setSubmitLoading] = useState(false)

  const { nft, loadingNft, refetchingNft } = useNFT(nftId)

  const {
    fullTokens,
    loading: fullTokensLoading,
    refetching: refetchingFullTokens,
  } = useTokens(
    {
      variables: { filter: { nft: unifyAddressToId(nftId) }, limit: 100 },
    },
    { fetchFullData: true }
  )
  const { mutateAsync: upload } = useStorageUpload()
  const { uploadContent } = useTokenUpdate(nftId)
  const { contract } = useSX1155NFT(nftId)

  const account = useAddress()
  const { smartAccount, isLoading: smartAccountLoading } = useSmartAccount()

  const { addToast } = useToastManager()

  const resolver = useYupValidationResolver(
    yup.object({
      username: yup.string().required(t('formErrors.username.required')),
      repoName: yup.string().required(t('formErrors.repoName.required')),
      branchName: yup.string().required(t('formErrors.branchName.required')),
    })
  )

  const form = useForm<IntegrationFormInputs>({ resolver })

  const onSubmit: SubmitHandler<IntegrationFormInputs> = async (data, e) => {
    e?.preventDefault()
    if (!account || !fullTokens) return

    const { username, repoName, branchName } = data

    setSubmitLoading(true)

    try {
      const tree = await fetchRepoTree(username, repoName, branchName)
      const files = await fetchRepoFiles(tree)

      const summaryContent = files['SUMMARY.md']
      if (!summaryContent)
        throw new Error('SUMMARY.md not found in the repository.')

      const indexPagesWithContent = parseSummaryToFlatTree(
        summaryContent,
        nftId,
        fullTokens,
        files
      )
      console.log(indexPagesWithContent, 'indexPagesWithContent')

      const currentSlugs = new Set(fullTokens.map(t => t.slug))

      const toMint = indexPagesWithContent.filter(
        p => !currentSlugs.has(p.slug) && p.type !== 'group'
      )
      const toEdit = indexPagesWithContent.filter(
        p => currentSlugs.has(p.slug) && p.type !== 'group'
      )

      console.log('%c[Integration] Tokens to create:', 'color: green', toMint)
      console.log('%c[Integration] Tokens to edit:', 'color: orange', toEdit)

      const txs: Transaction[] = []

      const editedCurrentIndexPages =
        nft?.indexPagesContent?.indexPages.map(ip => ({
          ...ip,
          title: toEdit.find(t => t.slug === ip.slug)?.title || ip.title,
        })) || []

      const newIndexPages: IpfsIndexPage[] = indexPagesWithContent.map(
        ({ content, ...ip }) => ip
      )

      const indexPagesToUpdate: IpfsIndexPage[] = [
        ...editedCurrentIndexPages,
        ...newIndexPages,
      ]

      const indexPagesIpfsContent = generateIpfsIndexPagesContent({
        indexPages: indexPagesToUpdate,
        address: nftId,
      })
      const filesToUpload = [indexPagesIpfsContent]
      const uris = await upload({ data: filesToUpload })
      const firstUri = uris[0]
      console.log(firstUri)
      if (firstUri) {
        const updateIndexPagesTx = contract.prepare('setContractKya', [
          JSON.stringify({ indexPagesUri: firstUri }),
        ])
        txs.push(updateIndexPagesTx)
      }

      for (const tokenToEdit of toEdit) {
        const tokenId = +tokenToEdit.tokenId.split('-')[1]
        const firstUri = await uploadContent(tokenId, {
          htmlContent: tokenToEdit.content,
          address: nftId,
          tokenId,
        })
        if (firstUri) {
          const tokenContentUpdateTx = contract.prepare('setTokenKya', [
            tokenId,
            JSON.stringify({ uri: firstUri, name: tokenToEdit.title }),
          ])
          txs.push(tokenContentUpdateTx)
        }
      }
      for (const tokenToMint of toMint) {
        const tokenId = +tokenToMint.tokenId.split('-')[1]
        const firstUri = await uploadContent(tokenId, {
          htmlContent: tokenToMint.content,
          address: nftId,
          tokenId,
        })
        if (firstUri && account) {
          const tokenContentMintTx = contract.prepare('mint', [
            account,
            1,
            JSON.stringify({ uri: firstUri, name: tokenToMint.title }),
            tokenToMint.slug,
          ])
          txs.push(tokenContentMintTx)
        }
      }

      const safeTxs = await resolveAllThirdwebTransactions(txs)

      console.log(safeTxs)

      const receipt = await smartAccount?.send({ transactions: safeTxs })

      if (
        receipt?.status === SafeClientTxStatus.DEPLOYED_AND_EXECUTED ||
        receipt?.status === SafeClientTxStatus.EXECUTED
      ) {
        addToast(t('toasts.pagesImported'), { type: 'success' })
      } else {
        throw new Error('Transaction failed')
      }
    } catch (error) {
      console.error('[Integration] Error during submission:', error)
      addToast(error.message || t('toasts.pagesImportFailed'), {
        type: 'error',
      })
    } finally {
      setSubmitLoading(false)
    }
  }

  const loading =
    (fullTokensLoading && !refetchingFullTokens) ||
    (loadingNft && !refetchingNft) ||
    submitLoading ||
    smartAccountLoading

  return { ...form, loading, onSubmit }
}

export default useIntegrationForm

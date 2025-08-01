import { useTranslation } from 'react-i18next'
import yup from 'src/shared/validations/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import useYupValidationResolver from 'src/hooks/useYupValidationResolver'
import { useActiveAccount } from 'thirdweb/react'
import { parseSummaryToFlatTree } from './utils'
import {
  generateIpfsIndexPagesContent,
  IpfsIndexPage,
  unifyAddressToId,
} from 'src/shared/utils'
import { fetchRepoFiles, fetchRepoTree } from 'src/services/github'
import useTokens from 'src/hooks/subgraph/useTokens'
import { useState } from 'react'
import useTokenUpdate from 'src/hooks/useTokenUpdate'
import useSmartAccount from 'src/services/safe-protocol-kit/useSmartAccount'
import { SafeClientTxStatus } from '@safe-global/sdk-starter-kit/dist/src/constants'
import useNFT from 'src/hooks/subgraph/useNFT'
import { useToastManager } from 'src/hooks/useToastManager'
import useNFTIdParam from 'src/hooks/useNftIdParam'
import { useIpfsUpload } from 'src/hooks/web3/useIpfsUpload'
import { PreparedTransaction } from 'thirdweb'
import useSX1155NFT from 'src/hooks/contracts/nft/useSX1155NFT'
import useSendBatchTxs from 'src/hooks/web3/useSendBatchTxs'

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
      skip: !nftId,
    },
    { fetchFullData: true }
  )
  const { mutateAsync: upload } = useIpfsUpload()
  const { uploadContent } = useTokenUpdate(nftId)
  const { prepareMintTx, prepareSetTokenKyaTx, prepareSetContractKyaTx } =
    useSX1155NFT(nftId)
  const { sendBatchTxs } = useSendBatchTxs()

  const account = useActiveAccount()
  const { isLoading: smartAccountLoading } = useSmartAccount()

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

      const seen = new Map<string, number>()
      for (const page of indexPagesWithContent) {
        if (page.type === 'group') continue

        const baseSlug = page.slug
        let uniqueSlug = baseSlug
        let counter = seen.get(baseSlug) ?? 0

        while (
          seen.has(uniqueSlug) ||
          fullTokens.some(token => token.slug === uniqueSlug)
        ) {
          counter += 1
          uniqueSlug = `${baseSlug}-${counter}`
        }

        seen.set(uniqueSlug, counter)
        page.slug = uniqueSlug
      }

      const currentSlugs = new Set(fullTokens.map(t => t.slug))

      const toMint = indexPagesWithContent.filter(
        p => !currentSlugs.has(p.slug) && p.type !== 'group'
      )
      const toEdit = indexPagesWithContent.filter(
        p => currentSlugs.has(p.slug) && p.type !== 'group'
      )

      console.log('%c[Integration] Tokens to create:', 'color: green', toMint)
      console.log('%c[Integration] Tokens to edit:', 'color: orange', toEdit)

      const txs: PreparedTransaction[] = []

      const editedCurrentIndexPages =
        nft?.indexPagesContent?.indexPages.map(ip => ({
          ...ip,
          title: toEdit.find(t => t.slug === ip.slug)?.title || ip.title,
        })) || []

      const newIndexPages: IpfsIndexPage[] = indexPagesWithContent.map(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      const uri = (await upload(filesToUpload)) as string
      if (uri) {
        const updateIndexPagesTx = prepareSetContractKyaTx({
          Kya: JSON.stringify({ indexPagesUri: uri }),
        })
        if (updateIndexPagesTx) {
          txs.push(updateIndexPagesTx)
        }
      }

      for (const tokenToEdit of toEdit) {
        const tokenId = +tokenToEdit.tokenId.split('-')[1]
        const firstUri = await uploadContent(tokenId, {
          htmlContent: tokenToEdit.content,
          address: nftId,
          tokenId,
        })
        if (firstUri) {
          const tokenContentUpdateTx = prepareSetTokenKyaTx({
            tokenId: BigInt(tokenId),
            Kya: JSON.stringify({ uri: firstUri, name: tokenToEdit.title }),
          })
          if (tokenContentUpdateTx) {
            txs.push(tokenContentUpdateTx)
          }
        }
      }
      for (const tokenToMint of toMint) {
        const tokenId = +tokenToMint.tokenId.split('-')[1]
        const firstUri = await uploadContent(tokenId, {
          htmlContent: tokenToMint.content,
          address: nftId,
          tokenId,
        })
        if (firstUri && account?.address) {
          const tokenContentMintTx = prepareMintTx({
            to: account.address,
            quantity: 1n,
            tokenURI: JSON.stringify({
              uri: firstUri,
              name: tokenToMint.title,
            }),
            slug: tokenToMint.slug,
          })
          if (tokenContentMintTx) {
            txs.push(tokenContentMintTx)
          }
        }
      }

      const receipt = await sendBatchTxs(txs)

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

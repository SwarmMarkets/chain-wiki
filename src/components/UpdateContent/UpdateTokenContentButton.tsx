import { useSX1155NFT } from '@src/hooks/contracts/useSX1155NFT'
import useModalState from '@src/hooks/useModalState'
import {
  IpfsTokenContent,
  IpfsVoteProposal,
} from '@src/shared/utils/ipfs/types'
import { generateIpfsTokenContent } from '@src/shared/utils/ipfs'
import { useStorageUpload } from '@thirdweb-dev/react'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button, { ButtonProps } from '../ui/Button/Button'
import UpdateContentModal, { Steps } from './UpdateContentModal'
import { ChildrenProp } from '@src/shared/types/common-props'
import useToken from '@src/hooks/subgraph/useToken'
import { getUniqueId } from '@src/shared/utils'

export interface TokenContentToUpdate {
  name?: string | null
  voteProposal?: IpfsVoteProposal
  ipfsContent?: Partial<IpfsTokenContent>
}

interface UpdateTokenContentButtonProps extends ButtonProps, ChildrenProp {
  tokenAddress: string
  nftAddress: string
  tokenContentToUpdate: TokenContentToUpdate
  onSuccess?(): void
}

const UpdateTokenContentButton: React.FC<UpdateTokenContentButtonProps> = ({
  tokenAddress,
  nftAddress,
  tokenContentToUpdate,
  onSuccess,
  children,
  ...buttonProps
}) => {
  const [ipfsUri, setIpfsUri] = useState('')
  const [voteProposalUri, setVoteProposalUri] = useState('')
  const { t } = useTranslation('buttons')
  const { isOpen, open, close } = useModalState(false)

  const {
    call,
    txLoading,
    result,
    isTxError,
    reset: resetCallState,
  } = useSX1155NFT(nftAddress)
  const {
    mutateAsync: upload,
    isLoading,
    isSuccess,
    reset: resetStorageState,
  } = useStorageUpload()
  const { token } = useToken(tokenAddress)
  const tokenId = Number(token?.id.split('-')[1])

  const uploadContent = async () => {
    if (!token || (token.uri && !token?.ipfsContent)) return

    const content = {
      address: '',
      tokenId: 0,
      htmlContent: '',
      ...token?.ipfsContent,
      ...tokenContentToUpdate,
    }

    // set data-id attributes
    if (tokenContentToUpdate.ipfsContent?.htmlContent) {
      const contentElem = document.createElement('div')
      contentElem.innerHTML = tokenContentToUpdate.ipfsContent.htmlContent
      const children = Array.from(contentElem.children)

      for (let i = 0; i < children.length; i++) {
        const item = children[i]
        if (!item.hasAttribute('id')) {
          item.setAttribute('id', getUniqueId())
        }
      }
      content.htmlContent = contentElem.innerHTML
    }

    const ipfsContent = generateIpfsTokenContent(content)
    const filesToUpload = [ipfsContent]
    const uris = await upload({ data: filesToUpload })
    const firstUri = uris[0]
    return firstUri
  }
  const uploadVoteProposal = async () => {
    const filesToUpload = [JSON.stringify(tokenContentToUpdate.voteProposal)]
    const uris = await upload({ data: filesToUpload })
    const firstUri = uris[0]
    return firstUri
  }

  const signTransaction = useCallback(
    (uri?: string, voteProposalUri?: string) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { name } = tokenContentToUpdate
      const tokenUpdate = {
        name,
        uri,
        voteProposalUri,
      }

      const tokenUpdateJson = JSON.stringify(tokenUpdate)

      return call('setTokenUri', [tokenId, tokenUpdateJson])
    },
    [call, tokenContentToUpdate, tokenId]
  )

  const startContentUpdate = async () => {
    open()
    let uri
    if (tokenContentToUpdate.ipfsContent?.htmlContent) {
      uri = await uploadContent()
      if (!uri) return

      setIpfsUri(uri)
    }
    let voteProposalUri
    if (tokenContentToUpdate.voteProposal) {
      voteProposalUri = await uploadVoteProposal()
      if (!voteProposalUri) return

      setVoteProposalUri(voteProposalUri)
    }
    const res = await signTransaction(uri, voteProposalUri)

    if (res) {
      onSuccess?.()
      close()
      resetCallState()
      resetStorageState()
    }
  }

  const steps = useMemo(() => {
    return {
      [Steps.PrepareContent]: { success: true, loading: false },
      [Steps.UploadToIPFS]: { success: isSuccess, loading: isLoading },
      [Steps.SignTransaction]: {
        success: !!result,
        loading: txLoading,
        error: isTxError,
        retry: () => signTransaction(ipfsUri, voteProposalUri),
      },
    }
  }, [
    ipfsUri,
    isLoading,
    isSuccess,
    isTxError,
    result,
    signTransaction,
    txLoading,
    voteProposalUri,
  ])

  const caption = children || t('updateContent')

  return (
    <>
      <UpdateContentModal
        contentType='token'
        steps={steps}
        isOpen={isOpen}
        onClose={close}
      />
      <Button onClick={startContentUpdate} {...buttonProps}>
        {caption}
      </Button>
    </>
  )
}

export default UpdateTokenContentButton
